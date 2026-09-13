import { NextResponse } from 'next/server';
import { icuStore, updateRequestStatus } from '@/lib/icu-store';

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
    updateRequestStatus(
      req.id,
      'under_review',
      req.patient.fullName,
      `Patient submitted updated medical details: "${patientNotes || 'Documents uploaded'}"`
    );

    return NextResponse.json({
      success: true,
      message: 'Additional information submitted successfully. Medical team notified.',
      request: req,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}
