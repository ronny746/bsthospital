import { NextResponse } from 'next/server';
import { updateRequestStatus } from '@/lib/icu-store';
import { connectToDatabase } from '@/lib/db/connect';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: any = await request.json();
    const { status, performedBy, details, rejectionReason, requestedInfoDescription } = body;

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

    // Persist status update to MongoDB Cloud Atlas
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const { IcuRequestModel } = await import('@/lib/db/models/IcuRequest');
        await IcuRequestModel.findOneAndUpdate(
          { $or: [{ id }, { requestId: id }] },
          {
            $set: {
              status: updated.status,
              rejectionReason: updated.rejectionReason,
              requestedInfoDescription: updated.requestedInfoDescription,
              auditLogs: updated.auditLogs,
              updatedAt: updated.updatedAt,
            },
          }
        );
      }
    } catch (dbErr) {
      console.warn('MongoDB status update note:', dbErr);
    }

    return NextResponse.json({ success: true, message: `Request status updated to ${status}`, request: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update request status' }, { status: 500 });
  }
}

