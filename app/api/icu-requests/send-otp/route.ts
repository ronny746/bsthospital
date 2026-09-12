import { NextResponse } from 'next/server';
import { icuStore } from '@/lib/icu-store';

export async function POST(request: Request) {
  try {
    const { mobile } = await request.json();
    if (!mobile || mobile.length < 10) {
      return NextResponse.json({ error: 'Valid 10-digit mobile number is required' }, { status: 400 });
    }

    // Generate simulated 6-digit OTP
    const generatedOtp = '123456';
    icuStore.otps[mobile] = generatedOtp;

    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to +91 ${mobile}`,
      debugOtp: generatedOtp, // For demonstration & easy testing
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
