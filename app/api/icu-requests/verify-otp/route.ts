import { NextResponse } from 'next/server';
import { icuStore } from '@/lib/icu-store';

export async function POST(request: Request) {
  try {
    const { mobile, otp } = await request.json();
    if (!mobile || !otp) {
      return NextResponse.json({ error: 'Mobile number and OTP are required' }, { status: 400 });
    }

    const storedOtp = icuStore.otps[mobile] || '123456';
    if (otp === storedOtp || otp === '123456') {
      return NextResponse.json({
        success: true,
        message: 'OTP verified successfully',
      });
    }

    return NextResponse.json({ error: 'Invalid OTP code. Please try again (Demo OTP: 123456)' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
