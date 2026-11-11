export interface DepartmentItem {
  id: string;
  name: string;
  shortName: string;
  category: 'Clinical' | 'Surgical' | 'Diagnostics' | 'Academic' | 'Support';
  doctorCategory: string;
  badge: string;
  desc: string;
  image: string;
  facilities: string[];
}

export const HOSPITAL_DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'general-surgery',
    name: 'General & Laparoscopic Surgery',
    shortName: 'General Surgery',
    category: 'Surgical',
    doctorCategory: 'General Surgery',
    badge: 'Laparoscopic & Minimal Access',
    desc: 'Advanced laparoscopic surgeries, hernia repair, gallbladder, gastrointestinal, thyroid, colorectal and emergency trauma surgery.',
    image: '/images/general_surgery.jpg',
    facilities: ['HD Laparoscopy 4K Towers', 'Surgical ICU Recovery Suite', 'Emergency Surgery OT 24/7'],
  },
  {
    id: 'internal-medicine',
    name: 'General & Internal Medicine',
    shortName: 'Internal Medicine',
    category: 'Clinical',
    doctorCategory: 'Internal Medicine',
    badge: 'Internal Medicine & OPD',
    desc: 'Comprehensive adult internal medicine, hypertension, diabetes mellitus, metabolic disorders, infectious diseases, and preventive health.',
    image: '/images/bst-doctor-consultation.jpg',
    facilities: ['24/7 Inpatient Wards', 'Diabetology & Lifestyle Clinic', 'Senior Physician OPD Chambers'],
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics & Joint Replacement',
    shortName: 'Orthopaedics',
    category: 'Surgical',
    doctorCategory: 'Orthopedics',
    badge: 'Joint Replacement & Trauma',
    desc: 'Total knee and hip replacement, complex accident trauma reconstructions, arthroscopic knee/shoulder surgery, sports injuries, and spine care.',
    image: '/images/orthopedics.jpg',
    facilities: ['Modular Ortho OT with C-Arm', 'Arthroscope Suite', 'Physiotherapy & Rehab Unit'],
  },
  {
    id: 'gynaecology',
    name: 'Obstetrics & Gynaecology',
    shortName: 'Obs & Gynaecology',
    category: 'Clinical',
    doctorCategory: 'Gynaecology',
    badge: 'Maternal & Women Health',
    desc: 'Maternal health, high-risk pregnancy care, painless labor & delivery, laparoscopic gynaecology, infertility support, and women wellness.',
    image: '/images/gynaecology.jpg',
    facilities: ['Labor & Delivery Suites', 'Fetal Heart Monitoring (NST)', 'Advanced Laparoscopic Gynae OT'],
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics & Neonatology',
    shortName: 'Paediatrics',
    category: 'Clinical',
    doctorCategory: 'Pediatrics',
    badge: 'Child Care & NICU',
    desc: 'Pioneering paediatric care, Level-3 Neonatal Intensive Care (NICU), Paediatric Intensive Care (PICU), child allergy, and vaccinations.',
    image: '/images/paediatrics.jpg',
    facilities: ['Level-3 NICU Incubators', 'Paediatric ICU Beds', 'Child Immunization Desk'],
  },
  {
    id: 'anaesthesia-critical-care',
    name: 'Anaesthesiology & Critical Care',
    shortName: 'Anaesthesia & ICU',
    category: 'Clinical',
    doctorCategory: 'Critical Care / ICU',
    badge: '24/7 Level-1 ICU & HDU',
    desc: '24/7 Level-1 Intensive Care Unit (ICU), High Dependency Unit (HDU), advanced mechanical ventilation, hemodynamic monitoring, and acute pain management.',
    image: '/images/bst-icu-ward.jpg',
    facilities: ['Multi-Para Vital Monitors', 'Advanced Mechanical Ventilators', 'Bedside Hemodialysis & ABG Lab'],
  },
  {
    id: 'ent',
    name: 'ENT - Otorhinolaryngology',
    shortName: 'ENT',
    category: 'Surgical',
    doctorCategory: 'ENT & Ophthalmology',
    badge: 'Microscopic & Endoscopic',
    desc: 'Microscopic ear surgeries, functional endoscopic sinus surgery (FESS), throat, voice disorders, and head-neck surgery.',
    image: '/images/ent.jpg',
    facilities: ['ENT Operating Microscope', 'Diagnostic Endoscopy Chamber', 'Pure Tone Audiometry'],
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology & Eye Care',
    shortName: 'Ophthalmology',
    category: 'Clinical',
    doctorCategory: 'ENT & Ophthalmology',
    badge: 'Eye Care & Vision',
    desc: 'Comprehensive eye examinations, micro-incision cataract surgery (Phaco), glaucoma screening, retina consultation, and refractive care.',
    image: '/images/ophthalmology.jpg',
    facilities: ['Slit-Lamp Examination Unit', 'Autorefractometer & Tonometry', 'Ophthalmic OT'],
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Cosmetology',
    shortName: 'Dermatology',
    category: 'Clinical',
    doctorCategory: 'Dermatology',
    badge: 'Skin, Hair & Aesthetics',
    desc: 'Clinical dermatology, acne, psoriasis, vitiligo, eczema, paediatric skin disorders, hair restoration, and aesthetic skin procedures.',
    image: '/images/dermatology.jpg',
    facilities: ['Dermatosurgery Suite', 'Phototherapy Unit', 'Laser Skin Care Clinic'],
  },
  {
    id: 'radiodiagnosis',
    name: 'Radiodiagnosis & Imaging',
    shortName: 'Radiology & Imaging',
    category: 'Diagnostics',
    doctorCategory: 'Radiodiagnosis',
    badge: '24/7 Imaging Diagnostics',
    desc: 'Multi-slice CT scans, 24/7 digital X-rays, high-resolution color Doppler ultrasound, interventional radiology, and emergency scans.',
    image: '/images/Radio diagonosis.webp',
    facilities: ['Multi-Slice CT Scanner', '3D/4D Ultrasound Machine', 'Digital Radiography (DR) System'],
  },
  {
    id: 'pathology',
    name: 'Pathology & Laboratory Medicine',
    shortName: 'Pathology',
    category: 'Diagnostics',
    doctorCategory: 'Pathology',
    badge: 'Automated 24/7 Labs',
    desc: 'Automated diagnostic pathology, hematology, histopathology, cytology, clinical pathology, and round-the-clock emergency lab testing.',
    image: '/images/bst-diagnostic-lab.jpg',
    facilities: ['Fully Automated 5-Part Hematology Analyzers', 'Histopathology & Cytology Lab', '24/7 Blood Sample Collection'],
  },
  {
    id: 'blood-bank',
    name: 'Transfusion Medicine / Blood Centre',
    shortName: 'Blood Centre',
    category: 'Diagnostics',
    doctorCategory: 'Pathology',
    badge: '24/7 Blood Bank & Components',
    desc: 'State-of-the-art blood bank licensed for whole blood, packed red cells, platelets, fresh frozen plasma, and emergency blood grouping.',
    image: '/images/blood_bank.jpg',
    facilities: ['24/7 Blood Storage Units (-40°C & -80°C)', 'Blood Component Separators', 'Apheresis Unit'],
  },
  {
    id: 'microbiology',
    name: 'Microbiology & Infection Control',
    shortName: 'Microbiology',
    category: 'Diagnostics',
    doctorCategory: 'Pathology',
    badge: 'Infectious Diagnostics',
    desc: 'Infectious disease diagnostics, blood & body fluid cultures, antimicrobial susceptibility testing (AST), serology, and hospital infection control.',
    image: '/images/bst-medical-research.jpg',
    facilities: ['Bacteriology & Mycology Units', 'Automated Blood Culture System', 'Biosafety Cabinets Level-2'],
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry & Behavioral Sciences',
    shortName: 'Psychiatry',
    category: 'Clinical',
    doctorCategory: 'Internal Medicine',
    badge: 'Mental Health & Wellness',
    desc: 'Behavioral healthcare, depression, anxiety, stress management, counseling, neuropsychiatry, child psychiatry, and de-addiction therapy.',
    image: '/images/psychiatry.jpg',
    facilities: ['Private Counseling Chambers', 'Cognitive Behavioral Therapy (CBT)', 'Neuropsychiatric OPD Desk'],
  },
  {
    id: 'biochemistry',
    name: 'Biochemistry',
    shortName: 'Biochemistry',
    category: 'Diagnostics',
    doctorCategory: 'Pathology',
    badge: 'Clinical Biochemistry',
    desc: 'Automated biochemistry analyzers, hormonal assays, cardiac markers, diabetes panels, kidney and liver function tests, and metabolic profiles.',
    image: '/images/bst-clinical-diagnostics.jpg',
    facilities: ['Automated Immunoassay Systems', 'Electrolyte Analyzers', 'Glycated Hemoglobin (HbA1c) Testing'],
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy & Rehabilitation',
    shortName: 'Physiotherapy',
    category: 'Support',
    doctorCategory: 'General',
    badge: 'Rehab & Mobility',
    desc: 'Post-operative rehabilitation, sports injury recovery, stroke & neurological rehabilitation, spine rehab, and joint mobility restoration.',
    image: '/images/physiotherapy.jpg',
    facilities: ['Electrotherapy & Ultrasound', 'Exercise & Gym Therapy Unit', 'Neuro-Rehab Parallel Bars'],
  },
  {
    id: 'dietetics',
    name: 'Dietetics & Clinical Nutrition',
    shortName: 'Dietetics',
    category: 'Support',
    doctorCategory: 'General',
    badge: 'Clinical Nutrition',
    desc: 'Therapeutic diet planning for ICU, diabetic, cardiac, renal, surgical, and oncology patients to accelerate recovery and clinical nutrition.',
    image: '/images/dietetics.jpg',
    facilities: ['Inpatient Bedside Nutrition Audit', 'Customized Therapeutic Diets', 'OPD Nutrition Counseling Desk'],
  },
  {
    id: 'dental',
    name: 'Dental & Maxillofacial Care',
    shortName: 'Dental Care',
    category: 'Clinical',
    doctorCategory: 'General',
    badge: 'Oral & Maxillofacial Care',
    desc: 'Comprehensive general dentistry, root canal treatment (RCT), dental implants, crown & bridge restorations, and oral maxillofacial surgery.',
    image: '/images/dental.jpg',
    facilities: ['Modern Motorized Dental Chairs', 'Dental Digital X-Ray (RVG)', 'Sterilization Autoclave Suite'],
  },
  {
    id: 'emergency-trauma',
    name: '24/7 Emergency & Trauma Care',
    shortName: 'Emergency & Trauma',
    category: 'Clinical',
    doctorCategory: 'Critical Care / ICU',
    badge: 'Level-1 Emergency Care',
    desc: 'Round-the-clock emergency medical response, trauma resuscitation, stroke management, cardiac arrest protocols, and ambulance services.',
    image: '/images/bst-hospital-exterior.jpg',
    facilities: ['Triage & Resuscitation Bays', 'Dedicated Trauma OT', 'Advanced Life Support (ALS) Ambulances'],
  },
];

export const MASTER_DEPARTMENT_NAMES: string[] = HOSPITAL_DEPARTMENTS.map((d) => d.name);

export const MASTER_CATEGORIES: string[] = [
  'General Surgery',
  'Internal Medicine',
  'Orthopedics',
  'Gynaecology',
  'Pediatrics',
  'Critical Care / ICU',
  'ENT & Ophthalmology',
  'Dermatology',
  'Radiodiagnosis',
  'Pathology',
  'General',
];

/**
 * Normalizes a department string to match standard department names
 */
export function matchDepartment(docDepartment?: string, docCategory?: string, targetDepartment?: string): boolean {
  if (!targetDepartment || targetDepartment === 'All') return true;
  const target = targetDepartment.toLowerCase().trim();
  const dept = (docDepartment || '').toLowerCase().trim();
  const cat = (docCategory || '').toLowerCase().trim();

  if (dept === target || cat === target) return true;

  // Keyword / Partial matching
  if (target.includes('surgery') && (dept.includes('surgery') || cat.includes('surgery'))) return true;
  if (target.includes('medicine') && (dept.includes('medicine') || cat.includes('medicine'))) return true;
  if (target.includes('ortho') && (dept.includes('ortho') || cat.includes('ortho'))) return true;
  if ((target.includes('gyn') || target.includes('obs')) && (dept.includes('gyn') || dept.includes('obs') || cat.includes('gyn'))) return true;
  if ((target.includes('paed') || target.includes('ped')) && (dept.includes('paed') || dept.includes('ped') || cat.includes('ped'))) return true;
  if ((target.includes('anaesth') || target.includes('icu') || target.includes('critical')) && (dept.includes('anaesth') || dept.includes('icu') || dept.includes('critical') || cat.includes('icu'))) return true;
  if (target.includes('ent') && (dept.includes('ent') || dept.includes('otorh') || cat.includes('ent'))) return true;
  if ((target.includes('ophth') || target.includes('eye')) && (dept.includes('ophth') || dept.includes('eye'))) return true;
  if (target.includes('derm') && (dept.includes('derm') || cat.includes('derm'))) return true;
  if ((target.includes('radio') || target.includes('imaging')) && (dept.includes('radio') || dept.includes('imaging') || cat.includes('radio'))) return true;
  if (target.includes('path') && (dept.includes('path') || cat.includes('path'))) return true;
  if ((target.includes('blood') || target.includes('transfusion')) && (dept.includes('blood') || dept.includes('transfusion'))) return true;
  if (target.includes('microbio') && dept.includes('microbio')) return true;
  if (target.includes('psych') && dept.includes('psych')) return true;

  return dept.includes(target) || cat.includes(target);
}

