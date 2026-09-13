import { NextResponse } from 'next/server';
import { addAdminNote } from '@/lib/icu-store';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: any = await request.json();
    const { adminId, adminName, note } = body;

    if (!note) {
      return NextResponse.json({ error: 'Note text is required' }, { status: 400 });
    }

    const updated = addAdminNote(id, adminId || 'usr-1', adminName || 'Admin', note);
    if (!updated) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Admin note added successfully', request: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to add admin note' }, { status: 500 });
  }
}
