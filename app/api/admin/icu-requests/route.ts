import { NextResponse } from 'next/server';
import { getAllRequests } from '@/lib/icu-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const icuType = searchParams.get('icuType');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    let requests = getAllRequests();

    if (status && status !== 'all') {
      requests = requests.filter((r) => r.status === status);
    }
    if (icuType && icuType !== 'all') {
      requests = requests.filter((r) => r.medical.requiredIcuType === icuType);
    }
    if (priority && priority !== 'all') {
      requests = requests.filter((r) => r.priority === priority);
    }
    if (search) {
      const q = search.toLowerCase();
      requests = requests.filter(
        (r) =>
          r.requestId.toLowerCase().includes(q) ||
          r.patient.fullName.toLowerCase().includes(q) ||
          r.patient.mobile.includes(q) ||
          r.medical.diagnosis.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, count: requests.length, requests });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch admin ICU requests' }, { status: 500 });
  }
}
