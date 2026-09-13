import { NextResponse } from 'next/server';
import { uploadToS3 } from '@/lib/s3';

export async function POST(req: Request) {
  try {
    const contentTypeHeader = req.headers.get('content-type') || '';

    let fileBuffer: Buffer | string;
    let fileName = 'document.pdf';
    let folder = 'bsthospital/icu-documents';
    let mimeType: string | undefined;

    if (contentTypeHeader.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const customFolder = formData.get('folder') as string | null;

      if (!file) {
        return NextResponse.json({ success: false, error: 'No file provided in request' }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
      fileName = file.name || 'document';
      mimeType = file.type;

      if (customFolder) {
        folder = customFolder;
      }
    } else {
      const body = await req.json();
      const { file, fileName: name, folder: customFolder, contentType } = body;

      if (!file) {
        return NextResponse.json({ success: false, error: 'No file content provided' }, { status: 400 });
      }

      fileBuffer = file;
      if (name) fileName = name;
      if (customFolder) folder = customFolder;
      if (contentType) mimeType = contentType;
    }

    const s3Url = await uploadToS3(fileBuffer, fileName, folder, mimeType);

    return NextResponse.json({
      success: true,
      url: s3Url,
      bucket: process.env.AWS_S3_BUCKET || 'lms-media-storage-2026',
    });
  } catch (error: any) {
    console.error('Error uploading file to AWS S3:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload document to AWS S3' },
      { status: 500 }
    );
  }
}
