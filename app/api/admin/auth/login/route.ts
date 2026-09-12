import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if ((username === 'admin' || username === 'admin@nims.edu.in') && password === 'admin123') {
      return NextResponse.json({
        success: true,
        user: {
          id: 'usr-1',
          name: 'Super Admin',
          email: 'admin@nims.edu.in',
          role: 'super_admin',
        },
        token: 'demo-jwt-token-superadmin',
      });
    }

    if (username === 'doctor' && password === 'doctor123') {
      return NextResponse.json({
        success: true,
        user: {
          id: 'usr-2',
          name: 'Dr. Sunita Verma',
          email: 'dr.sunita@nims.edu.in',
          role: 'doctor_reviewer',
        },
        token: 'demo-jwt-token-doctor',
      });
    }

    if (username === 'bedmanager' && password === 'bed123') {
      return NextResponse.json({
        success: true,
        user: {
          id: 'usr-3',
          name: 'Rahul Meena (Bed Manager)',
          email: 'rahul.beds@nims.edu.in',
          role: 'bed_manager',
        },
        token: 'demo-jwt-token-bedmanager',
      });
    }

    return NextResponse.json({ error: 'Invalid admin credentials. (Demo login: admin / admin123)' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
