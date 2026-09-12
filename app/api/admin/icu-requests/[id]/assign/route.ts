import { NextResponse } from 'next/server';
import { assignReviewer } from '@/lib/icu-store';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { reviewer, performedBy } = await request.json();

    if (!reviewer || !reviewer.name) {
      return NextResponse.json({ error: 'Reviewer object is required' }, { status: 400 });
    }

    const updated = assignReviewer(id, reviewer, performedBy || 'ICU Admin');
    if (!updated) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Reviewer assigned successfully`, request: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to assign reviewer' }, { status: 500 });
  }
}
