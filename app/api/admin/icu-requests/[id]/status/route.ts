import { NextResponse } from 'next/server';
import { updateRequestStatus } from '@/lib/icu-store';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status, performedBy, details, rejectionReason, requestedInfoDescription } = await request.json();

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const updated = updateRequestStatus(
      id,
      status,
      performedBy || 'ICU Admin',
      details,
      { rejectionReason, requestedInfoDescription }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Request status updated to ${status}`, request: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update request status' }, { status: 500 });
  }
}
