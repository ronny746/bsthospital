import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { getRequestByRequestId } from '@/lib/icu-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');
    const mobile = searchParams.get('mobile') || undefined;

    if (!requestId) {
      return NextResponse.json({ error: 'Request ID parameter is required' }, { status: 400 });
    }

    const cleanId = requestId.trim();
    let foundReq: any = null;

    // 1. Query MongoDB Cloud Atlas Database by requestId
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const { IcuRequestModel } = await import('@/lib/db/models/IcuRequest');
        const dbDoc = await IcuRequestModel.findOne({
          requestId: { $regex: new RegExp(`^${cleanId}$`, 'i') },
        }).lean();
        if (dbDoc) {
          foundReq = dbDoc;
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB status query error:', dbErr);
    }

    // 2. Fallback to in-memory store if not found in DB
    if (!foundReq) {
      foundReq = getRequestByRequestId(cleanId, mobile);
    }

    if (!foundReq) {
      return NextResponse.json(
        { error: `No matching ICU bed request found for Request ID '${cleanId}'.` },
        { status: 404 }
      );
    }

    if (mobile) {
      const cleanMobile = mobile.trim();
      if (foundReq.patient?.mobile !== cleanMobile && foundReq.attendant?.mobile !== cleanMobile) {
        return NextResponse.json(
          { error: 'Mobile number does not match booking record.' },
          { status: 403 }
        );
      }
    }

    // Filter sensitive admin notes for patient view
    const publicRequest = {
      ...foundReq,
      adminNotes: undefined,
    };

    return NextResponse.json({ success: true, request: publicRequest });
  } catch (error: any) {
    console.error('Error fetching request status:', error);
    return NextResponse.json({ error: 'Failed to fetch request status' }, { status: 500 });
  }
}
