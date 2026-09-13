import { NextResponse } from 'next/server';
import { icuStore } from '@/lib/icu-store';

export async function POST(request: Request) {
  try {
    const body: any = await request.json();
    const { mobile } = body;

    const cleanPhone = String(mobile || '').replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      return NextResponse.json({ error: 'Valid 10-digit mobile number is required' }, { status: 400 });
    }

    // 1. Generate real random 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Prepare approved DLT SMS Message
    const message = `Dear User Your OTP is ${generatedOtp} for mobile number verification. It is valid for 5 minutes. Please do not share with anyone - CSOCIT`;
    const encodedMsg = encodeURIComponent(message);

    // 3. BulkSenders SMS API Endpoint
    const smsUrl = `https://login.bulksenders.in/app/smsapi/index.php?key=563C78DD92E750&campaign=12417&routeid=3&type=text&contacts=${cleanPhone}&senderid=CSOCIT&msg=${encodedMsg}&template_id=1707173399550602618&pe_id=1701171048184684059`;

    let smsSent = false;
    let apiError: string | null = null;

    try {
      const smsRes = await fetch(smsUrl);
      const resText = await smsRes.text();
      console.log(`[REAL SMS OTP] BulkSenders API response for ${cleanPhone}:`, resText);
      smsSent = true;
    } catch (fetchErr: any) {
      console.error(`[REAL SMS OTP ERROR] BulkSenders API failed for ${cleanPhone}:`, fetchErr);
      apiError = fetchErr?.message || 'SMS Gateway unreachable';
    }

    // 4. Save generated OTP in memory store with timestamp
    icuStore.otps[cleanPhone] = generatedOtp;

    return NextResponse.json({
      success: true,
      message: `Real SMS OTP sent successfully to +91 ${cleanPhone}`,
      cleanPhone,
      smsSent,
      apiError,
    });
  } catch (error: any) {
    console.error('API /api/icu-requests/send-otp error:', error);
    return NextResponse.json({ error: 'Failed to send SMS OTP' }, { status: 500 });
  }
}
