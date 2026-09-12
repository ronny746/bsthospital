import { NextResponse } from 'next/server';
import { reserveBedForRequest } from '@/lib/icu-store';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bedId } = await params;
    const body = (await request.json()) as {
      requestId?: string;
      durationMinutes?: number;
      performedBy?: string;
    };
    const { requestId, durationMinutes, performedBy } = body || {};

    if (!requestId) {
      return NextResponse.json({ error: 'Request ID is required to reserve a bed' }, { status: 400 });
    }

    const result = reserveBedForRequest(
      requestId,
      bedId,
      durationMinutes || 120,
      performedBy || 'ICU Admin'
    );

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: result.message, request: result.request });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || 'Failed to reserve bed' }, { status: 500 });
  }
}
