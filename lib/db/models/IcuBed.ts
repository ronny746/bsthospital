import mongoose, { Schema, Document } from 'mongoose';

export interface IIcuBedDocument extends Document {
  id: string;
  bedNumber: string;
  icuType: string;
  unitName: string;
  floor: string;
  status: 'available' | 'reserved' | 'occupied' | 'maintenance';
  currentRequestId?: string | null;
  currentPatientName?: string | null;
  reservedUntil?: string | null;
  hasVentilator: boolean;
  hasOxygen: boolean;
  updatedAt: string;
}

const IcuBedSchema = new Schema<IIcuBedDocument>(
  {
    id: { type: String, required: true, unique: true },
    bedNumber: { type: String, required: true, unique: true },
    icuType: { type: String, required: true },
    unitName: { type: String, required: true },
    floor: { type: String, required: true },
    status: { type: String, enum: ['available', 'reserved', 'occupied', 'maintenance'], default: 'available' },
    currentRequestId: { type: String, default: null },
    currentPatientName: { type: String, default: null },
    reservedUntil: { type: String, default: null },
    hasVentilator: { type: Boolean, default: true },
    hasOxygen: { type: Boolean, default: true },
    updatedAt: { type: String, required: true },
  },
  { timestamps: true }
);

export const IcuBedModel =
  mongoose.models.IcuBed || mongoose.model<IIcuBedDocument>('IcuBed', IcuBedSchema);
