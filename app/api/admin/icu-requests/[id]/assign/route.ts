import { NextResponse } from 'next/server';
import { assignReviewer } from '@/lib/icu-store';
import { connectToDatabase } from '@/lib/db/connect';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: any = await request.json();
    const { reviewer, performedBy } = body;

    if (!reviewer || !reviewer.name) {
      return NextResponse.json({ error: 'Reviewer object is required' }, { status: 400 });
    }

    const updated = assignReviewer(id, reviewer, performedBy || 'ICU Admin');
    if (!updated) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Persist to MongoDB Cloud Atlas
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const { IcuRequestModel } = await import('@/lib/db/models/IcuRequest');
        await IcuRequestModel.findOneAndUpdate(
          { $or: [{ id }, { requestId: id }] },
          { $set: { assignedTo: updated.assignedTo, auditLogs: updated.auditLogs, updatedAt: updated.updatedAt } }
        );
      }
    } catch (dbErr) {
      console.warn('MongoDB assign warning:', dbErr);
    }

    return NextResponse.json({ success: true, message: `Reviewer assigned successfully`, request: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to assign reviewer' }, { status: 500 });
  }
}

