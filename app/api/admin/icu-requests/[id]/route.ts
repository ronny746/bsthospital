import { NextResponse } from 'next/server';
import { icuStore } from '@/lib/icu-store';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const req = icuStore.requests.find((r) => r.id === id || r.requestId === id);
    if (!req) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, request: req });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch request detail' }, { status: 500 });
  }
}
