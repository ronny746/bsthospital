const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://geniusattechie:tF2Oe1CBjJVdL9xZ@cluster0.oxahl6y.mongodb.net/bsthospital?retryWrites=true&w=majority&appName=Cluster0';

interface MongooseCache {
  conn: any | null;
  promise: Promise<any> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = globalThis.mongooseCache || { conn: null, promise: null };

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = (async () => {
      try {
        const mongooseModule = await import('mongoose');
        const mongoose = mongooseModule.default || mongooseModule;
        const conn = await mongoose.connect(MONGO_URI, { bufferCommands: false });
        console.log('Connected to MongoDB cluster0 (bsthospital)');
        return conn;
      } catch (err: any) {
        console.warn('MongoDB connection note (Vite/Worker environment):', err?.message || err);
        return null;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}
