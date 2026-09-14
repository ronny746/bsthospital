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
    const dateFilter = searchParams.get('dateFilter') || 'all'; // 'all', 'today', 'yesterday', 'this_week', 'this_month', 'custom'
    const specificDate = searchParams.get('specificDate'); // e.g. '2026-09-14'

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

    // Status Filter
    if (status && status !== 'all') {
      requests = requests.filter((r) => r.status === status);
    }

    // ICU Category Filter
    if (icuType && icuType !== 'all') {
      requests = requests.filter((r) => r.medical?.requiredIcuType === icuType);
    }

    // Priority Filter
    if (priority && priority !== 'all') {
      requests = requests.filter((r) => r.priority === priority);
    }

    // Text Search Filter
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

    // Date Filter Logic
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (dateFilter === 'today') {
      requests = requests.filter((r) => r.createdAt && r.createdAt.slice(0, 10) === todayStr);
    } else if (dateFilter === 'yesterday') {
      requests = requests.filter((r) => r.createdAt && r.createdAt.slice(0, 10) === yesterdayStr);
    } else if (dateFilter === 'this_week') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      requests = requests.filter((r) => r.createdAt && new Date(r.createdAt) >= sevenDaysAgo);
    } else if (dateFilter === 'this_month') {
      const monthPrefix = todayStr.slice(0, 7); // 'YYYY-MM'
      requests = requests.filter((r) => r.createdAt && r.createdAt.slice(0, 7) === monthPrefix);
    } else if (dateFilter === 'custom' && specificDate) {
      requests = requests.filter((r) => r.createdAt && r.createdAt.slice(0, 10) === specificDate);
    } else if (specificDate && dateFilter !== 'all') {
      requests = requests.filter((r) => r.createdAt && r.createdAt.slice(0, 10) === specificDate);
    }

    return NextResponse.json({ success: true, count: requests.length, requests });
  } catch (error: any) {
    console.error('Failed to fetch admin ICU requests:', error);
    return NextResponse.json({ error: 'Failed to fetch admin ICU requests' }, { status: 500 });
  }
}
