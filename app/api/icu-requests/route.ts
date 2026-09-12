import { NextResponse } from 'next/server';
import { createIcuRequest } from '@/lib/icu-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.patient || !body.patient.fullName || !body.patient.mobile) {
      return NextResponse.json({ error: 'Patient full name and mobile number are required' }, { status: 400 });
    }

    const newRequest = createIcuRequest({
      submittedBy: body.submittedBy || 'patient',
      patient: body.patient,
      attendant: body.attendant,
      medical: body.medical,
      documents: body.documents || [],
      status: 'submitted',
      priority: body.medical?.ventilatorRequired || body.medical?.symptomsCriticality?.toLowerCase().includes('critical') ? 'critical' : 'high',
      consentAccepted: body.consentAccepted ?? true,
    });

    return NextResponse.json({
      success: true,
      message: 'ICU Bed booking request submitted successfully',
      requestId: newRequest.requestId,
      request: newRequest,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to submit request' }, { status: 500 });
  }
}
