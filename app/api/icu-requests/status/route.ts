import { NextResponse } from 'next/server';
import { getRequestByRequestId } from '@/lib/icu-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');
    const mobile = searchParams.get('mobile') || undefined;

    if (!requestId) {
      return NextResponse.json({ error: 'Request ID parameter is required' }, { status: 400 });
    }

    const req = getRequestByRequestId(requestId, mobile);
    if (!req) {
      return NextResponse.json({ error: 'No matching ICU bed request found for given Request ID and Mobile number.' }, { status: 404 });
    }

    // Filter sensitive admin notes for patient security rule
    const publicRequest = {
      ...req,
      adminNotes: undefined, // Hide private admin notes from patient view
    };

    return NextResponse.json({ success: true, request: publicRequest });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch request status' }, { status: 500 });
  }
}
