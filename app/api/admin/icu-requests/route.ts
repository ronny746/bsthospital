import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { getAllRequests } from '@/lib/icu-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const icuType = searchParams.get('icuType');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    let requests: any[] = [];

    // 1. Fetch from MongoDB Cloud Atlas Database
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const { IcuRequestModel } = await import('@/lib/db/models/IcuRequest');
        const dbDocs = await IcuRequestModel.find({}).sort({ createdAt: -1 }).lean();
        if (dbDocs && dbDocs.length > 0) {
          requests = dbDocs;
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB admin fetch error:', dbErr);
    }

    // 2. Fallback / Merge with in-memory store if DB has fewer records
    const storeRequests = getAllRequests();
    for (const req of storeRequests) {
      if (!requests.some((r) => r.requestId === req.requestId)) {
        requests.push(req);
      }
    }

    if (status && status !== 'all') {
      requests = requests.filter((r) => r.status === status);
    }
    if (icuType && icuType !== 'all') {
      requests = requests.filter((r) => r.medical?.requiredIcuType === icuType);
    }
    if (priority && priority !== 'all') {
      requests = requests.filter((r) => r.priority === priority);
    }
    if (search) {
      const q = search.toLowerCase();
      requests = requests.filter(
        (r) =>
          r.requestId?.toLowerCase().includes(q) ||
          r.patient?.fullName?.toLowerCase().includes(q) ||
          r.patient?.mobile?.includes(q) ||
          r.medical?.diagnosis?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, count: requests.length, requests });
  } catch (error: any) {
    console.error('Failed to fetch admin ICU requests:', error);
    return NextResponse.json({ error: 'Failed to fetch admin ICU requests' }, { status: 500 });
  }
}
