import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { icuStore, getDashboardMetrics } from '@/lib/icu-store';

export async function GET() {
  try {
    // 1. Sync live requests from MongoDB Cloud Atlas Database
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const { IcuRequestModel } = await import('@/lib/db/models/IcuRequest');
        const dbDocs = await IcuRequestModel.find({}).lean();
        if (dbDocs && dbDocs.length > 0) {
          for (const doc of dbDocs) {
            const existingIdx = icuStore.requests.findIndex(
              (r) => r.requestId === doc.requestId || r.id === doc.id
            );
            if (existingIdx >= 0) {
              icuStore.requests[existingIdx] = doc as any;
            } else {
              icuStore.requests.push(doc as any);
            }
          }
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB dashboard fetch error:', dbErr);
    }

    const metrics = getDashboardMetrics();
    return NextResponse.json({ success: true, metrics });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch dashboard metrics' }, { status: 500 });
  }
}

