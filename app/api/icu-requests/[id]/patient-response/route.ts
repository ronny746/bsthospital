import { NextResponse } from 'next/server';
import { icuStore, updateRequestStatus } from '@/lib/icu-store';
import { connectToDatabase } from '@/lib/db/connect';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: any = await request.json();
    const { patientNotes, documents } = body;

    const req = icuStore.requests.find((r) => r.id === id || r.requestId === id);
    if (!req) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (patientNotes) req.patientResponseNotes = patientNotes;
    if (documents && Array.isArray(documents)) {
      req.documents = [...req.documents, ...documents];
    }

    // Re-trigger review state after patient provides info
    const updated = updateRequestStatus(
      req.id,
      'under_review',
      req.patient.fullName,
      `Patient submitted updated medical details: "${patientNotes || 'Documents uploaded'}"`
    );

    // Persist to MongoDB Cloud Atlas
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const { IcuRequestModel } = await import('@/lib/db/models/IcuRequest');
        await IcuRequestModel.findOneAndUpdate(
          { $or: [{ id }, { requestId: id }] },
          {
            $set: {
              patientResponseNotes: req.patientResponseNotes,
              documents: req.documents,
              status: req.status,
              auditLogs: req.auditLogs,
              updatedAt: req.updatedAt,
            },
          }
        );
      }
    } catch (dbErr) {
      console.warn('MongoDB patient response warning:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Additional information submitted successfully. Medical team notified.',
      request: updated || req,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}

