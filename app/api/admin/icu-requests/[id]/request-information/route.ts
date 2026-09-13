import { NextResponse } from 'next/server';
import { updateRequestStatus } from '@/lib/icu-store';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: any = await request.json();
    const { description, performedBy } = body;

    if (!description) {
      return NextResponse.json({ error: 'Description of required information is mandatory' }, { status: 400 });
    }

    const updated = updateRequestStatus(
      id,
      'more_info_required',
      performedBy || 'Medical Reviewer',
      `Requested additional patient details: "${description}"`,
      { requestedInfoDescription: description }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Patient notified to submit requested additional medical details',
      request: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to request info' }, { status: 500 });
  }
}
