import { NextResponse } from 'next/server';
import { getDashboardMetrics } from '@/lib/icu-store';

export async function GET() {
  try {
    const metrics = getDashboardMetrics();
    return NextResponse.json({ success: true, metrics });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch dashboard metrics' }, { status: 500 });
  }
}
