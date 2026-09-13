import { NextResponse } from 'next/server';
import { createIcuRequest } from '@/lib/icu-store';

export async function POST(request: Request) {
  try {
    const body: any = await request.json();
    if (!body.patient || !body.patient.fullName || !body.patient.mobile) {
      return NextResponse.json({ error: 'Patient full name and mobile number are required' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const dateStr = now.slice(0, 10).replace(/-/g, '');
    let seqNumber = Math.floor(1000 + Math.random() * 9000);

    try {
      const { connectToDatabase } = await import('@/lib/db/connect');
      const conn = await connectToDatabase();
      if (conn) {
        const { IcuRequestModel } = await import('@/lib/db/models/IcuRequest');
        const todayPrefix = `NIMS-ICU-${dateStr}-`;
        const count = await IcuRequestModel.countDocuments({
          requestId: { $regex: `^${todayPrefix}` }
        });
        seqNumber = count + 1;
      }
    } catch (e) {
      console.error('Error counting documents for sequential ID:', e);
    }

    const seqFormatted = String(seqNumber).padStart(4, '0');
    const requestId = `NIMS-ICU-${dateStr}-${seqFormatted}`;
    const id = `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const processedDocuments = [];
    if (Array.isArray(body.documents)) {
      for (const doc of body.documents) {
        if (doc.fileUrl && typeof doc.fileUrl === 'string' && doc.fileUrl.startsWith('data:')) {
          try {
            const { uploadToS3 } = await import('@/lib/s3');
            const s3Url = await uploadToS3(
              doc.fileUrl,
              doc.fileName || `${doc.docType || 'document'}.pdf`,
              `bsthospital/icu-requests/${requestId}`
            );
            processedDocuments.push({ ...doc, fileUrl: s3Url });
          } catch (s3Err) {
            console.error('Failed to upload document to AWS S3:', s3Err);
            processedDocuments.push(doc);
          }
        } else {
          processedDocuments.push(doc);
        }
      }
    }

    const newRequestData = {
      id,
      requestId,
      submittedBy: body.submittedBy || 'patient',
      patient: {
        fullName: body.patient.fullName,
        age: Number(body.patient.age) || 30,
        gender: body.patient.gender || 'male',
        mobile: body.patient.mobile,
        alternateMobile: body.patient.alternateMobile,
        address: body.patient.address || { city: 'Jaipur', state: 'Rajasthan', pinCode: '302001' },
        idProofType: body.patient.idProofType || 'aadhaar',
        idProofNumber: body.patient.idProofNumber || body.patient.aadhaarOrId,
        aadhaarOrId: body.patient.aadhaarOrId || body.patient.idProofNumber,
        patientUhid: body.patient.patientUhid,
      },
      attendant: body.attendant
        ? {
            fullName: body.attendant.fullName,
            relationship: body.attendant.relationship,
            mobile: body.attendant.mobile,
            alternateMobile: body.attendant.alternateMobile,
            email: body.attendant.email,
            idProofType: body.attendant.idProofType || 'aadhaar',
            idProofNumber: body.attendant.idProofNumber,
            sameAddressAsPatient: body.attendant.sameAddressAsPatient ?? true,
          }
        : undefined,
      medical: {
        admissionType: body.medical?.admissionType || 'emergency',
        requiredIcuType: body.medical?.requiredIcuType || 'medical_icu',
        department: body.medical?.department || 'medicine',
        departmentOther: body.medical?.departmentOther,
        currentMedicalCondition: body.medical?.currentMedicalCondition || 'Critical condition',
        diagnosis: body.medical?.diagnosis || 'Pending evaluation',
        symptomsCriticality: body.medical?.symptomsCriticality || 'Urgent admission needed',
        oxygenRequired: body.medical?.oxygenRequired ?? true,
        ventilatorRequired: body.medical?.ventilatorRequired ?? false,
        treatingDoctorName: body.medical?.treatingDoctorName,
        referringHospital: body.medical?.referringHospital,
        currentHospitalLocation: body.medical?.currentHospitalLocation,
        expectedAdmissionTime: body.medical?.expectedAdmissionTime,
        ambulanceRequired: body.medical?.ambulanceRequired ?? false,
        infectionIsolationRequired: body.medical?.infectionIsolationRequired ?? false,
        additionalRemarks: body.medical?.additionalRemarks,
      },
      documents: processedDocuments,
      status: 'submitted',
      priority:
        body.medical?.ventilatorRequired || body.medical?.symptomsCriticality?.toLowerCase().includes('critical')
          ? 'critical'
          : 'high',
      payment: body.payment || {
        orderId: `ord_test_${Date.now()}`,
        paymentId: `pay_test_${Date.now()}`,
        amountPaid: 5000,
        paymentStatus: 'paid',
        paidAt: now,
      },
      consentAccepted: body.consentAccepted ?? true,
      adminNotes: [],
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          action: 'Nims Tatkaal Seva Request Submitted & Fee Paid ₹5,000',
          performedBy: body.submittedBy === 'attendant' ? body.attendant?.fullName || 'Attendant' : body.patient.fullName,
          timestamp: now,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    // 1. Unconditionally save to ICU In-Memory Store (Fast & reliable in all runtimes)
    let memoryReq: any = null;
    try {
      memoryReq = createIcuRequest({
        submittedBy: newRequestData.submittedBy as any,
        patient: newRequestData.patient as any,
        attendant: newRequestData.attendant as any,
        medical: newRequestData.medical as any,
        documents: newRequestData.documents as any,
        status: newRequestData.status as any,
        priority: newRequestData.priority as any,
        payment: newRequestData.payment as any,
        consentAccepted: newRequestData.consentAccepted,
      }, requestId);
    } catch (storeErr) {
      console.error('Store sync error:', storeErr);
    }

    const finalRequestId = memoryReq?.requestId || newRequestData.requestId;

    // 2. Save to MongoDB Cloud Database (MongoDB Atlas)
    let savedInDb = false;
    let dbErrorDetails: string | null = null;
    try {
      const { connectToDatabase } = await import('@/lib/db/connect');
      const conn = await connectToDatabase();
      if (conn) {
        const { IcuRequestModel } = await import('@/lib/db/models/IcuRequest');
        const mongoDoc = await IcuRequestModel.create({
          ...newRequestData,
          requestId: finalRequestId,
        });
        console.log('Successfully saved Tatkaal ICU Request to MongoDB Atlas:', mongoDoc._id, finalRequestId);
        savedInDb = true;
      } else {
        dbErrorDetails = 'connectToDatabase() returned null connection';
      }
    } catch (dbErr: any) {
      dbErrorDetails = String(dbErr?.stack || dbErr?.message || dbErr);
      console.error('MongoDB save error in /api/icu-requests:', dbErr);
    }



    return NextResponse.json({
      success: true,
      message: 'Nims Tatkaal Seva ICU Bed booking request submitted successfully',
      requestId: finalRequestId,
      savedInDb,
      request: memoryReq || newRequestData,
    });

  } catch (error: any) {
    console.error('API /api/icu-requests error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit request' }, { status: 500 });
  }
}
