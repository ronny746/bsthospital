import { NextResponse } from 'next/server';
import { getAllBeds, icuStore } from '@/lib/icu-store';
import { IcuBed, IcuType } from '@/lib/icu-types';

export async function GET() {
  try {
    const beds = getAllBeds();
    return NextResponse.json({ success: true, count: beds.length, beds });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || 'Failed to fetch beds' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      bedNumber?: string;
      icuType?: IcuType;
      unitName?: string;
      floor?: string;
      hasVentilator?: boolean;
      hasOxygen?: boolean;
    };
    const { bedNumber, icuType, unitName, floor, hasVentilator, hasOxygen } = body || {};

    if (!bedNumber || !icuType || !unitName) {
      return NextResponse.json({ error: 'Bed number, ICU type and unit name are required' }, { status: 400 });
    }

    const newBed: IcuBed = {
      id: `bed-${Date.now()}`,
      bedNumber,
      icuType,
      unitName,
      floor: floor || '3rd Floor',
      status: 'available',
      hasVentilator: hasVentilator ?? true,
      hasOxygen: hasOxygen ?? true,
      updatedAt: new Date().toISOString(),
    };

    icuStore.beds.push(newBed);
    return NextResponse.json({ success: true, message: `Bed ${bedNumber} added successfully`, bed: newBed });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || 'Failed to add bed' }, { status: 500 });
  }
}
