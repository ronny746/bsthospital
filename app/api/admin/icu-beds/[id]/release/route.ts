import { NextResponse } from 'next/server';
import { releaseBed } from '@/lib/icu-store';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bedId } = await params;
    const body = (await request.json()) as {
      performedBy?: string;
      reason?: string;
    };
    const { performedBy, reason } = body || {};

    const success = releaseBed(bedId, performedBy || 'ICU Admin', reason);
    if (!success) {
      return NextResponse.json({ error: 'Bed not found or already available' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Bed released successfully' });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || 'Failed to release bed' }, { status: 500 });
  }
}
