import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION || 'ap-south-1';
const bucketName = process.env.AWS_S3_BUCKET || 'lms-media-storage-2026';

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

/**
 * Upload a file (Base64 or Buffer) to AWS S3 under a specific folder path.
 * @param fileBuffer - Buffer or Base64 string of the file
 * @param fileName - Original filename or standard name (e.g. 'discharge_summary.pdf')
 * @param folder - Folder path on S3 (e.g. 'bsthospital/icu-requests/REQ-1234')
 * @param contentType - MIME type (e.g. 'image/png', 'application/pdf')
 * @returns Public S3 URL of the uploaded object
 */
export async function uploadToS3(
  fileInput: Buffer | string,
  fileName: string,
  folder: string = 'bsthospital/icu-documents',
  contentType?: string
): Promise<string> {
  let buffer: Buffer;
  let mimeType = contentType || 'application/octet-stream';

  if (typeof fileInput === 'string') {
    if (fileInput.startsWith('data:')) {
      const parts = fileInput.split(',');
      const match = parts[0].match(/:(.*?);/);
      if (match) {
        mimeType = match[1];
      }
      buffer = Buffer.from(parts[1], 'base64');
    } else {
      buffer = Buffer.from(fileInput, 'base64');
    }
  } else {
    buffer = fileInput;
  }

  // Clean filename & generate unique S3 Key
  const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const timestamp = Date.now();
  const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
  const s3Key = `${cleanFolder}/${timestamp}_${cleanFileName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    Body: buffer,
    ContentType: mimeType,
  });

  await s3Client.send(command);

  // Return S3 Object URL
  return `https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}`;
}
