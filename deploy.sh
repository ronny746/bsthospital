#!/bin/bash
set -e

# ==========================================
# Nims Tatkaal Seva / BST Hospital Deployment
# ==========================================

APP_NAME="bsthospital"
PORT=2033
HOST="0.0.0.0"
DOMAIN="bsthospital.com"
EMAIL="admin@bsthospital.com"

echo "========================================="
echo "🚀 Deploying $APP_NAME"
echo "🌍 Domain : $DOMAIN"
echo "📦 Port   : $PORT"
echo "========================================="

# =====================================================
# 1. Environment File Check
# =====================================================
echo "📄 Checking .env configuration..."

if [ ! -f .env.local ] && [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo "✅ Created .env.local from .env.example"
    else
        echo "⚠️ .env.local not found. Creating default configuration..."
        cat <<EOF > .env.local
MONGO_URI=mongodb+srv://geniusattechie:tF2Oe1CBjJVdL9xZ@cluster0.oxahl6y.mongodb.net/bsthospital?retryWrites=true&w=majority&appName=Cluster0
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_TZAWZi6xItEYWa
RAZORPAY_KEY_ID=rzp_test_TZAWZi6xItEYWa
RAZORPAY_KEY_SECRET=zaCUtNZsCgq1jLERhZ7FidtX
AWS_REGION=ap-south-1
AWS_S3_BUCKET=lms-media-storage-2026
PORT=$PORT
EOF
        echo "✅ Default .env.local created successfully."
    fi
else
    echo "✅ Environment file exists"
fi

# =====================================================
# 2. Firewall Configuration (UFW)
# =====================================================
echo "🛡 Configuring Firewall for HTTP (80), HTTPS (443), and App Port ($PORT)..."

if command -v ufw >/dev/null 2>&1; then
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw allow ${PORT}/tcp
    sudo ufw reload || true
fi

# =====================================================
# 3. Install Dependencies
# =====================================================
echo "📦 Installing npm dependencies..."
npm install

# =====================================================
# 4. Build Application
# =====================================================
echo "🏗 Building application for production..."
npm run build

# =====================================================
# 5. Install PM2
# =====================================================
if ! command -v pm2 >/dev/null 2>&1; then
    echo "⚙️ Installing PM2 Process Manager..."
    sudo npm install -g pm2
fi

# =====================================================
# 6. Start / Restart App in PM2 on Port 2033
# =====================================================
echo "🚀 Starting $APP_NAME on Port $PORT..."

if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    pm2 delete "$APP_NAME"
fi

pm2 start ./node_modules/.bin/vinext --name "$APP_NAME" -- start -p $PORT -H 0.0.0.0

pm2 save

pm2 startup | tail -1 | sudo bash || true


# =====================================================
# 7. Install Nginx
# =====================================================
if ! command -v nginx >/dev/null 2>&1; then
    echo "🌐 Installing Nginx Web Server..."
    sudo apt update
    sudo apt install nginx -y
fi

# =====================================================
# 8. Configure Nginx Reverse Proxy
# =====================================================

NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"

echo "⚙️ Creating Nginx configuration for $DOMAIN on Port $PORT..."

sudo tee "$NGINX_CONF" >/dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    client_max_body_size 50m;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;

        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

echo "🔍 Testing Nginx configuration syntax..."
sudo nginx -t

echo "🔄 Restarting Nginx service..."
sudo systemctl restart nginx
sudo systemctl enable nginx

# =====================================================
# 9. Install Certbot & Generate SSL Certificate
# =====================================================
if ! command -v certbot >/dev/null 2>&1; then
    echo "🔒 Installing Certbot for automatic SSL..."
    sudo apt update
    sudo apt install certbot python3-certbot-nginx -y
fi

echo "🔑 Generating SSL Certificate for $DOMAIN..."

sudo certbot \
    --nginx \
    -d "$DOMAIN" \
    -d "www.$DOMAIN" \
    --agree-tos \
    --redirect \
    --non-interactive \
    -m "$EMAIL" || echo "⚠️ SSL generation skipped (Make sure DNS A records point to this VPS IP)."

# =====================================================
# 10. Final Status Report
# =====================================================

echo ""
echo "=============================================="
echo "✅ Deployment Completed Successfully!"
echo "=============================================="
echo ""
echo "Application Name : $APP_NAME"
echo "Node Port        : $PORT"
echo "Domain           : http://$DOMAIN"
echo "HTTPS Domain     : https://$DOMAIN"
echo ""

echo "📊 PM2 Status:"
pm2 status

echo ""
echo "🔌 Listening Ports:"
sudo ss -tulpn | grep ":$PORT" || true

echo ""
echo "🌐 Nginx Status:"
sudo systemctl status nginx --no-pager
