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
    id: 'medical-oncology',
    name: 'Medical Oncology',
    shortName: 'Medical Oncology',
    category: 'Clinical',
    doctorCategory: 'Medical Oncology',
    badge: 'Cancer Care & Chemotherapy',
    desc: 'Comprehensive cancer management with advanced systemic chemotherapy, immunotherapy, targeted biological therapy, and day-care infusion suites.',
    image: '/images/general_surgery.jpg',
    facilities: ['Dedicated Daycare Chemotherapy Suite', 'Targeted Biological Therapy Protocol', 'Comprehensive Palliative Oncology'],
  },
  {
    id: 'surgical-oncology',
    name: 'Surgical Oncology',
    shortName: 'Surgical Oncology',
    category: 'Surgical',
    doctorCategory: 'Surgical Oncology',
    badge: 'Complex Cancer Surgery',
    desc: 'Advanced surgical resections for head & neck, breast, gastrointestinal, thoracic, gynaecological, and musculoskeletal malignancies.',
    image: '/images/general_surgery.jpg',
    facilities: ['Tumor Resection Theatres', 'Laparoscopic Onco-Surgery', 'Reconstructive Onco-Surgeries'],
  },
  {
    id: 'radiation-oncology',
    name: 'Radiation Oncology',
    shortName: 'Radiation Oncology',
    category: 'Clinical',
    doctorCategory: 'Radiation Oncology',
    badge: 'Precision Radiation Therapy',
    desc: 'High-precision radiation oncology utilizing modern linear accelerators, IGRT, IMRT, and brachytherapy for targeted tumor ablation.',
    image: '/images/radiodiagnosis.jpg',
    facilities: ['Linear Accelerator Suite', '3D CRT & IMRT Planning', 'High-Dose-Rate Brachytherapy'],
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    shortName: 'Cardiology',
    category: 'Clinical',
    doctorCategory: 'Cardiology',
    badge: '24×7 Cath Lab & Heart Care',
    desc: 'Round-the-clock primary angioplasty (PTCA), cardiac catheterization, coronary angiography, pacemaker implantation, and cardiac intensive care.',
    image: '/images/cardiology.jpg',
    facilities: ['Advanced Flat-Panel Cath Lab', '2D/3D Color Doppler Echo', 'Coronary Care Unit (CCU)'],
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery',
    shortName: 'Neurosurgery',
    category: 'Surgical',
    doctorCategory: 'Neurosurgery',
    badge: 'Brain & Spine Institute',
    desc: 'Micro-neurosurgical procedures for brain tumors, neuro-vascular aneurysms, head trauma resuscitation, and minimally invasive spine surgeries.',
    image: '/images/orthopedics.jpg',
    facilities: ['Operating Microscope Suite', 'Neuro-Navigation System', 'Neuro-ICU with ICP Monitoring'],
  },
  {
    id: 'ctvs',
    name: 'CTVS (Cardiothoracic & Vascular Surgery)',
    shortName: 'CTVS',
    category: 'Surgical',
    doctorCategory: 'CTVS',
    badge: 'Open Heart & Bypass Surgery',
    desc: 'CABG heart bypass surgery, heart valve repairs and replacements, aortic aneurysm surgeries, and peripheral vascular reconstructions.',
    image: '/images/general_surgery.jpg',
    facilities: ['Dedicated CTVS Modular OT', 'Heart-Lung Machine Unit', 'Post-Op Cardiac Surgical ICU'],
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    shortName: 'General Medicine',
    category: 'Clinical',
    doctorCategory: 'General Medicine',
    badge: 'General Medicine & OPD',
    desc: 'Comprehensive adult medicine, management of chronic lifestyle diseases, diabetes mellitus, hypertension, fevers, and multi-system infectious disorders.',
    image: '/images/bst-doctor-consultation.jpg',
    facilities: ['24/7 Inpatient Medical Wards', 'Diabetology & Metabolic Clinic', 'Senior Consultant OPD Suites'],
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics & Joint Replacement',
    shortName: 'Orthopaedics',
    category: 'Surgical',
    doctorCategory: 'Orthopaedics',
    badge: 'Joint Replacement & Trauma',
    desc: 'Total knee and hip replacement, complex poly-trauma stabilization, arthroscopic knee/shoulder surgeries, sports injury care, and fracture clinic.',
    image: '/images/orthopedics.jpg',
    facilities: ['Modular Ortho OT with High-Res C-Arm', 'Arthroscope Tower', 'Comprehensive Physiotherapy Gym'],
  },
  {
    id: 'emergency-medicine',
    name: 'Emergency Medicine',
    shortName: 'Emergency Medicine',
    category: 'Clinical',
    doctorCategory: 'Emergency Medicine',
    badge: '24/7 Level-1 Emergency & Trauma',
    desc: '24/7 immediate trauma resuscitation, stroke protocol, acute myocardial infarction pathway, dedicated emergency triage, and mobile ALS ambulance dispatch.',
    image: '/images/bst-hospital-exterior.jpg',
    facilities: ['Triage & Resuscitation Bays', 'Emergency Minor OT', 'Dedicated 24×7 Trauma Response Team'],
  },
  {
    id: 'anaesthesiology',
    name: 'Anaesthesiology & Critical Care',
    shortName: 'Anaesthesia & ICU',
    category: 'Clinical',
    doctorCategory: 'Anaesthesiology & Critical Care',
    badge: '24×7 ICU & Pain Management',
    desc: 'Round-the-clock intensive care, perioperative anaesthesia, acute & chronic pain management, and Level-1 trauma critical care resuscitation.',
    image: '/images/anesthesia.jpg',
    facilities: ['Advanced Level-1 ICU & HDU Suites', 'Multi-Modal Pain Clinic', 'Post-Op Critical Care Unit'],
  },
  {
    id: 'nephrology',
    name: 'Nephrology',
    shortName: 'Nephrology',
    category: 'Clinical',
    doctorCategory: 'Nephrology',
    badge: 'Kidney Care & Hemodialysis',
    desc: 'State-of-the-art dialysis center, acute and chronic kidney disease treatment, glomerulonephritis management, and pre-transplant nephrology care.',
    image: '/images/bst-icu-ward.jpg',
    facilities: ['Advanced Hemodialysis Units', 'Bedside ICU Dialysis Support', 'Kidney Biopsy & Vascular Access Suite'],
  },
  {
    id: 'general-surgery',
    name: 'General & Laparoscopic Surgery',
    shortName: 'General Surgery',
    category: 'Surgical',
    doctorCategory: 'General Surgery',
    badge: 'Minimal Access & Laparoscopy',
    desc: 'Advanced laparoscopic cholecystectomy, hernia repairs, appendectomy, gastrointestinal surgery, thyroid surgery, and acute surgical emergencies.',
    image: '/images/general_surgery.jpg',
    facilities: ['4K HD Laparoscopy Towers', 'Modular OT Suites', 'Surgical Recovery HDU'],
  },
  {
    id: 'neurology',
    name: 'Neurology',
    shortName: 'Neurology',
    category: 'Clinical',
    doctorCategory: 'Neurology',
    badge: 'Comprehensive Stroke & Brain Care',
    desc: 'Specialized diagnosis and treatment for acute ischemic stroke, epilepsy, Parkinsonism, neuromuscular disorders, migraines, and nerve conduction studies.',
    image: '/images/bst-doctor-consultation.jpg',
    facilities: ['Digital EEG & EMG Diagnostics', 'Thrombolysis Stroke Protocol', 'Dedicated Stroke Care Unit'],
  },
  {
    id: 'interventional-radiology',
    name: 'Interventional Radiology',
    shortName: 'Interventional Radiology',
    category: 'Diagnostics',
    doctorCategory: 'Radiology',
    badge: 'Image-Guided Interventions',
    desc: 'Minimally invasive image-guided vascular embolization, catheter drainage, tumor ablation, angiograms, and non-surgical interventions.',
    image: '/images/radiodiagnosis.jpg',
    facilities: ['Cath Lab & Angio Suite', 'Ultrasound & CT Guided Biopsy', 'Vascular Stenting Setups'],
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics & Child Health',
    shortName: 'Paediatrics',
    category: 'Clinical',
    doctorCategory: 'Paediatrics',
    badge: 'Child Care & Paediatric Health',
    desc: 'Expert care for newborns, infants, children, and adolescents, covering childhood infections, growth assessment, development disorders, and emergency care.',
    image: '/images/paediatrics.jpg',
    facilities: ['Dedicated Paediatric Ward', 'Child Immunization Clinic', 'Pediatric Emergency Care'],
  },
  {
    id: 'urology',
    name: 'Urology',
    shortName: 'Urology',
    category: 'Surgical',
    doctorCategory: 'Urology',
    badge: 'Laser Kidney Stone & Prostate',
    desc: 'Holmium laser lithotripsy for kidney stones, TURP for prostate enlargement, reconstructive urology, uro-oncology, and male fertility care.',
    image: '/images/general_surgery.jpg',
    facilities: ['Holmium Laser Lithotripter', 'Flexible Ureterorenoscopy (RIRS)', 'Urodynamics & Endourology Suite'],
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    shortName: 'Gastroenterology',
    category: 'Clinical',
    doctorCategory: 'Gastroenterology',
    badge: 'Endoscopy & Liver Clinic',
    desc: 'Diagnostic and therapeutic upper GI endoscopy, colonoscopy, ERCP, chronic liver disease management, and viral hepatitis treatment.',
    image: '/images/general_surgery.jpg',
    facilities: ['Video Endoscopy & Colonoscopy Suite', 'ERCP System', 'Liver & Digestive OPD Chambers'],
  },
  {
    id: 'ent',
    name: 'ENT - Otorhinolaryngology',
    shortName: 'ENT',
    category: 'Surgical',
    doctorCategory: 'ENT',
    badge: 'Ear, Nose, Throat & Sinus Care',
    desc: 'Microscopic ear surgery, tympanoplasty, functional endoscopic sinus surgery (FESS), voice therapy, adenoidectomy, tonsillectomy, and vertigo clinic.',
    image: '/images/ent.jpg',
    facilities: ['ENT Operating Microscope', 'Diagnostic Nasal Endoscopy', 'Pure Tone Audiometry (PTA) Booth'],
  },
  {
    id: 'tb-resp-diseases',
    name: 'TB & Respiratory Diseases',
    shortName: 'Pulmonology & Respiratory',
    category: 'Clinical',
    doctorCategory: 'TB & Resp. Diseases',
    badge: 'Chest & Lung Health',
    desc: 'Diagnosis and management of asthma, COPD, pneumonia, tuberculosis, interstitial lung diseases, and sleep apnea testing.',
    image: '/images/bst-doctor-consultation.jpg',
    facilities: ['Computerized Pulmonary Function Test (PFT)', 'Video Bronchoscopy', 'Allergy & Asthma Clinic'],
  },
  {
    id: 'neonatology',
    name: 'Neonatology & NICU',
    shortName: 'Neonatology',
    category: 'Clinical',
    doctorCategory: 'Neonatology',
    badge: 'Level-3 Advanced NICU',
    desc: 'Round-the-clock intensive care for premature babies, extremely low birth weight infants, neonatal jaundice, and critical neonatal emergencies.',
    image: '/images/paediatrics.jpg',
    facilities: ['Level-3 NICU Radiant Warmers', 'Neonatal Mechanical Ventilators', 'LED Phototherapy Systems'],
  },
  {
    id: 'obstetrics-gynaecology',
    name: 'Obstetrics & Gynaecology',
    shortName: 'Obs & Gynaecology',
    category: 'Clinical',
    doctorCategory: 'Obstetrics & Gynaecology',
    badge: 'Maternal & Women Health',
    desc: 'Comprehensive women healthcare, high-risk pregnancy management, painless normal deliveries, Caesarean sections, laparoscopic hysterectomy, and fibroid care.',
    image: '/images/gynaecology.jpg',
    facilities: ['Modern Labor & Delivery Suites', 'Fetal Heart Monitoring (NST)', 'Advanced Gynaecological Laparoscopy OT'],
  },
  {
    id: 'surgical-gastroenterology',
    name: 'Surgical Gastroenterology',
    shortName: 'Surgical Gastroenterology',
    category: 'Surgical',
    doctorCategory: 'Surgical Gastroenterology',
    badge: 'Advanced GI & HPB Surgery',
    desc: 'Complex surgeries of the esophagus, stomach, intestine, pancreas, gallbladder, bile ducts, and colorectal system using open and laparoscopic methods.',
    image: '/images/general_surgery.jpg',
    facilities: ['Advanced Laparoscopic GI Suite', 'HPB Surgery Facility', 'Post-Op Surgical ICU Support'],
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology & Diabetology',
    shortName: 'Endocrinology',
    category: 'Clinical',
    doctorCategory: 'Endocrinology',
    badge: 'Hormonal & Thyroid Care',
    desc: 'Expert care for type 1 and type 2 diabetes mellitus, thyroid disorders, osteoporosis, pituitary-adrenal gland disorders, and metabolic health.',
    image: '/images/bst-doctor-consultation.jpg',
    facilities: ['Diabetic Foot Clinic', 'Continuous Glucose Monitoring (CGM)', 'Endocrine Hormone Testing Support'],
  },
  {
    id: 'plastic-surgery',
    name: 'Plastic Surgery',
    shortName: 'Plastic Surgery',
    category: 'Surgical',
    doctorCategory: 'Plastic Surgery',
    badge: 'Reconstructive & Cosmetic Surgery',
    desc: 'Reconstructive surgery for trauma wounds, post-cancer defects, burns management, cleft lip/palate repair, hand surgery, and aesthetic procedures.',
    image: '/images/general_surgery.jpg',
    facilities: ['Micro-Vascular Surgery Microscope', 'Cosmetic OT Suite', 'Burn Care Recovery Room'],
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology & Eye Care',
    shortName: 'Ophthalmology',
    category: 'Surgical',
    doctorCategory: 'Ophthalmology',
    badge: 'Advanced Cataract & Vision Care',
    desc: 'Micro-incision sutureless cataract surgery (Phacoemulsification), glaucoma screening and laser management, retina evaluation, and refractive vision care.',
    image: '/images/ophthalmology.jpg',
    facilities: ['Phacoemulsification Cataract System', 'Slit Lamp & Applanation Tonometry', 'Computerized Auto-Refractor'],
  },
  {
    id: 'ivf',
    name: 'IVF & Fertility Clinic',
    shortName: 'IVF & Fertility',
    category: 'Clinical',
    doctorCategory: 'IVF',
    badge: 'Reproductive Medicine & IVF',
    desc: 'Comprehensive infertility evaluation, Intrauterine Insemination (IUI), In-Vitro Fertilization (IVF), ICSI, and fertility preservation.',
    image: '/images/gynaecology.jpg',
    facilities: ['Class 10,000 IVF Cleanroom Laboratory', 'Laser Hatching & Cryopreservation', 'Dedicated Embryology Workstations'],
  },
  {
    id: 'liver-transplant',
    name: 'Liver Transplant, HPB & GI Surgery',
    shortName: 'Liver Transplant & HPB',
    category: 'Surgical',
    doctorCategory: 'Liver Transplant',
    badge: 'Organ Transplant & HPB Centre',
    desc: 'Specialized hepato-pancreato-biliary (HPB) surgery, acute liver failure management, living donor liver transplantation protocols, and complex bile duct reconstructions.',
    image: '/images/general_surgery.jpg',
    facilities: ['Organ Transplant ICU', 'CUSA Cavitron Ultrasonic Aspirator', 'Laminar Airflow Transplant OT'],
  },
  {
    id: 'dental',
    name: 'Dental & Maxillofacial Surgery',
    shortName: 'Dental Care',
    category: 'Clinical',
    doctorCategory: 'Dental',
    badge: 'Dental & Facial Reconstructions',
    desc: 'Root canal treatments, dental implants, teeth alignment, facial trauma bone plating, impacted wisdom tooth extraction, and smile designing.',
    image: '/images/dentistry.jpg',
    facilities: ['Computerized Dental Operator Chair', 'Digital RVG Dental X-Ray', 'Maxillofacial Trauma Plating OT'],
  },
  {
    id: 'spine-surgery',
    name: 'Spine Surgery',
    shortName: 'Spine Surgery',
    category: 'Surgical',
    doctorCategory: 'Spine Surgery',
    badge: 'Endoscopic & Minimally Invasive Spine',
    desc: 'Discectomy for slip disc, spinal canal decompression, spinal fusion, scoliosis correction, and vertebral trauma fixation.',
    image: '/images/orthopedics.jpg',
    facilities: ['Intraoperative Neuromonitoring', 'Spinal Endoscopy Unit', 'High-Definition Spine C-Arm'],
  },
  {
    id: 'skin-vd',
    name: 'Skin & V.D. (Dermatology)',
    shortName: 'Dermatology & Skin',
    category: 'Clinical',
    doctorCategory: 'Dermatology',
    badge: 'Clinical Dermatology & Cosmetology',
    desc: 'Expert medical diagnosis for psoriasis, eczema, acne, fungal infections, hair loss, vitiligo, allergy testing, and cosmetic dermatology.',
    image: '/images/dermatology.jpg',
    facilities: ['Dermatosurgery Suite', 'Phototherapy (UVB/UVA) Unit', 'Chemical Peeling & Radiofrequency Clinic'],
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy & Rehabilitation',
    shortName: 'Physiotherapy',
    category: 'Support',
    doctorCategory: 'Physiotherapy',
    badge: 'Physical Therapy & Rehab',
    desc: 'Post-operative orthopaedic rehabilitation, stroke neuro-rehabilitation, sports injury recovery, pain management therapy, and posture correction.',
    image: '/images/orthopedics.jpg',
    facilities: ['Electrotherapy & Ultrasound Equipment', 'Traction and Exercise Gymnasium', 'Gait Training & Rehab Corridor'],
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry & Behavioral Sciences',
    shortName: 'Psychiatry',
    category: 'Clinical',
    doctorCategory: 'Psychiatry',
    badge: 'Mental Health & Wellness',
    desc: 'Confidential care for depression, anxiety disorders, bipolar disorder, schizophrenia, addiction de-addiction therapy, and geriatric psychiatry.',
    image: '/images/bst-doctor-consultation.jpg',
    facilities: ['Private Counseling Suites', 'De-addiction Rehabilitation Protocol', 'Psychometric Evaluation Assessment'],
  },
  {
    id: 'nuclear-medicine',
    name: 'Nuclear Medicine',
    shortName: 'Nuclear Medicine',
    category: 'Diagnostics',
    doctorCategory: 'Nuclear Medicine',
    badge: 'Molecular Imaging & Radionuclide',
    desc: 'State-of-the-art molecular diagnostic imaging, PET-CT scans, thyroid radionuclide therapy, and gamma camera scans.',
    image: '/images/radiodiagnosis.jpg',
    facilities: ['Gamma Camera Imaging Room', 'Radioiodine Therapy Wards', 'Radiation Safety Monitoring'],
  },
  {
    id: 'bmt',
    name: 'Bone Marrow Transplant (BMT)',
    shortName: 'BMT Unit',
    category: 'Clinical',
    doctorCategory: 'BMT',
    badge: 'Stem Cell & Marrow Transplant',
    desc: 'Autologous and allogeneic bone marrow transplantation for leukemia, lymphoma, multiple myeloma, aplastic anemia, and thalassemia.',
    image: '/images/bst-icu-ward.jpg',
    facilities: ['HEPA Filtered Positive-Pressure Rooms', 'Stem Cell Cryopreservation', '24/7 Transfusion Support'],
  },
  {
    id: 'clinical-hematology',
    name: 'Clinical Hematology',
    shortName: 'Clinical Hematology',
    category: 'Clinical',
    doctorCategory: 'Clinical Hematology',
    badge: 'Blood Disorders & Hemato-Oncology',
    desc: 'Comprehensive diagnosis and medical management of anemias, bleeding disorders, hemophilia, ITP, clotting diseases, and blood cancers.',
    image: '/images/bst-blood-bank.jpg',
    facilities: ['Hemophilia Comprehensive Desk', 'Bone Marrow Aspiration & Biopsy', 'Daycare Transfusion Lounge'],
  },
  {
    id: 'clinical-psychology',
    name: 'Clinical Psychology',
    shortName: 'Clinical Psychology',
    category: 'Support',
    doctorCategory: 'Clinical Psychology',
    badge: 'Psychotherapy & Counseling',
    desc: 'Cognitive behavioral therapy (CBT), child psychological counseling, IQ and personality testing, stress management, and emotional therapy.',
    image: '/images/bst-doctor-consultation.jpg',
    facilities: ['Child & Adolescent Counseling Room', 'Psychological Diagnostic Battery', 'Family Therapy Chambers'],
  },
  {
    id: 'blood-bank',
    name: 'Blood Bank & Transfusion Medicine',
    shortName: 'Blood Bank',
    category: 'Support',
    doctorCategory: 'Blood Bank',
    badge: '24×7 Licensed Blood Centre',
    desc: '24×7 voluntary donor blood collection, modern blood component separation (PRBC, FFP, Platelets, Cryo), apheresis, and cross-matching.',
    image: '/images/bst-blood-bank.jpg',
    facilities: ['Blood Component Separation Unit', 'Single Donor Platelet (SDP) Apheresis', 'Fully Automated Gel Card Cross-Match'],
  },
  {
    id: 'radiology',
    name: 'Radiology & Imaging',
    shortName: 'Radiology',
    category: 'Diagnostics',
    doctorCategory: 'Radiology',
    badge: 'Advanced 24×7 Diagnostic Imaging',
    desc: 'State-of-the-art multi-slice CT, high-resolution digital X-rays, 3D/4D ultrasound, color Doppler, and computerized radiography.',
    image: '/images/radiodiagnosis.jpg',
    facilities: ['Multi-Slice CT Scanner', 'High-Frequency Digital X-Ray', 'High-Resolution 3D/4D Ultrasound'],
  },
  {
    id: 'pathology',
    name: 'Pathology & Laboratory Medicine',
    shortName: 'Pathology',
    category: 'Diagnostics',
    doctorCategory: 'Pathology',
    badge: 'Fully Automated Clinical Lab',
    desc: '24×7 clinical biochemistry, hematology, histopathology, cytopathology, microbiology, serology, and molecular diagnostics with barcoded accuracy.',
    image: '/images/pathology.jpg',
    facilities: ['Fully Automated Biochemistry Analyzers', 'Automated 5-Part Cell Counters', 'Histopathology & Biopsy Suite'],
  },
];

export const MASTER_DEPARTMENT_NAMES: string[] = HOSPITAL_DEPARTMENTS.map((d) => d.name);

export const MASTER_CATEGORIES: string[] = [
  'General Surgery',
  'General Medicine',
  'Orthopaedics',
  'Obstetrics & Gynaecology',
  'Paediatrics',
  'Ophthalmology',
  'ENT',
  'Radiology',
  'Blood Bank',
  'Cardiology',
  'Anaesthesiology & Critical Care',
  'Neurosurgery',
  'Urology',
  'Gastroenterology',
  'Dermatology',
  'Critical Care / ICU',
  'Pathology',
  'Dental',
  'Psychiatry',
];

/**
 * Normalizes and accurately matches a doctor to their hospital clinical department.
 */
export function matchDepartment(
  docDepartment?: string,
  docCategory?: string,
  targetDepartment?: string,
  docSpecialty?: string
): boolean {
  if (!targetDepartment || targetDepartment === 'All') return true;
  const target = targetDepartment.toLowerCase().trim();
  const dept = (docDepartment || '').toLowerCase().trim();
  const cat = (docCategory || '').toLowerCase().trim();
  const spec = (docSpecialty || '').toLowerCase().trim();

  // Exact equality match
  if (dept === target || cat === target) return true;

  // 1. Ophthalmology & Eye Care
  if (target.includes('ophthalm') || target.includes('eye')) {
    return (dept.includes('ophthalm') || dept.includes('eye') || cat.includes('ophthalm') || spec.includes('ophthalm')) && !dept.includes('ent');
  }

  // 2. ENT - Otorhinolaryngology (Word boundary match to avoid substring match in 'department' or 'replacement')
  if (target === 'ent' || target.includes('otorhinolaryngology') || /\bent\b/i.test(target)) {
    return (/\bent\b/i.test(dept) || /\bent\b/i.test(cat) || dept.includes('otorh') || spec.includes('otorh')) && !dept.includes('ophthalm');
  }

  // 3. Blood Bank & Transfusion Medicine
  if (target.includes('blood bank') || target.includes('transfusion')) {
    return dept.includes('blood') || dept.includes('transfusion') || cat.includes('blood') || spec.includes('transfusion');
  }

  // 4. Radiology & Imaging / Radiodiagnosis / Nuclear Medicine
  if (target.includes('radiology') || target.includes('radiodiagnosis') || target.includes('imaging') || target.includes('interventional radiology') || target.includes('nuclear medicine')) {
    return dept.includes('radio') || dept.includes('imaging') || cat.includes('radio') || spec.includes('radio') || spec.includes('imaging');
  }

  // 5. Pathology & Laboratory Medicine / Microbiology
  if (target.includes('pathology') || target.includes('microbiology') || target.includes('laboratory') || target.includes('clinical hematology')) {
    return (dept.includes('patholog') || dept.includes('microbiolog') || cat.includes('patholog') || spec.includes('patholog')) && !dept.includes('blood');
  }

  // 6. Paediatrics & Child Health / Neonatology (Exclude orthopedics!)
  if (target.includes('paediatric') || target.includes('pediatric') || target.includes('neonat')) {
    if (dept.includes('ortho') || cat.includes('ortho') || spec.includes('ortho')) return false;
    return dept.includes('paed') || dept.includes('pediat') || cat.includes('paed') || cat.includes('pediat') || spec.includes('paed') || spec.includes('pediat') || dept.includes('neonat');
  }

  // 7. Obstetrics & Gynaecology / IVF
  if (target.includes('gynaecology') || target.includes('obstetric') || target.includes('gynae') || target.includes('ivf')) {
    return dept.includes('gyn') || dept.includes('obs') || cat.includes('gyn') || cat.includes('obs') || spec.includes('gyn') || spec.includes('obs');
  }

  // 8. Orthopaedics & Joint Replacement / Spine Surgery
  if (target.includes('orthop') || target.includes('joint') || target.includes('spine')) {
    return dept.includes('ortho') || cat.includes('ortho') || spec.includes('ortho') || spec.includes('joint');
  }

  // 9. General & Laparoscopic Surgery
  if (target.includes('general surgery') || target.includes('laparoscopic surgery') || target.includes('surgical gastroenterology')) {
    if (dept.includes('gyn') || cat.includes('gyn') || spec.includes('gyn') || dept.includes('ortho') || spec.includes('ortho') || dept.includes('ophthalm')) return false;
    return dept.includes('general surgery') || cat.includes('general surgery') || dept.includes('general & lap') || (dept.includes('laparoscop') && !dept.includes('gyn')) || dept.includes('surgery');
  }

  // 10. General Medicine / Internal Medicine
  if (target.includes('general medicine') || target.includes('internal medicine')) {
    if (dept.includes('psych') || cat.includes('psych') || spec.includes('psych')) return false;
    return dept.includes('general medicine') || dept.includes('internal medicine') || cat.includes('general medicine') || cat.includes('internal medicine') || (dept === 'general medicine') || spec.includes('general physician');
  }

  // 11. Dermatology & Skin (Skin & V.D.)
  if (target.includes('dermatology') || target.includes('skin')) {
    return dept.includes('derm') || dept.includes('skin') || cat.includes('derm') || spec.includes('derm') || dept.includes('dvl');
  }

  // 12. Anaesthesiology & Critical Care / ICU
  if (target.includes('anaesthesia') || target.includes('anesthesia') || target.includes('critical care') || target.includes('icu')) {
    return dept.includes('anaesth') || dept.includes('anesth') || cat.includes('critical care') || dept.includes('critical care') || dept.includes('icu') || cat.includes('icu') || spec.includes('anaesth') || spec.includes('anesth');
  }

  // 13. Psychiatry & Behavioral Sciences
  if (target.includes('psychiatry') || target.includes('behavioral') || target.includes('clinical psychology')) {
    return dept.includes('psych') || cat.includes('psych') || spec.includes('psych');
  }

  // 14. Dental & Maxillofacial Surgery
  if (target.includes('dental') || target.includes('maxillofacial')) {
    return dept.includes('dental') || cat.includes('dental') || spec.includes('dental') || dept.includes('maxillo') || spec.includes('maxillo');
  }

  // 15. Cardiology & CTVS
  if (target.includes('cardio') || target.includes('ctvs')) {
    return dept.includes('cardio') || cat.includes('cardio') || spec.includes('cardio');
  }

  // 16. Neurology & Neurosurgery
  if (target.includes('neuro')) {
    return dept.includes('neuro') || cat.includes('neuro') || spec.includes('neuro');
  }

  // 17. Nephrology & Kidney Care
  if (target.includes('nephro')) {
    return dept.includes('nephro') || dept.includes('kidney');
  }

  // 18. Oncology & Cancer Care
  if (target.includes('onco') || target.includes('cancer')) {
    return dept.includes('onco') || cat.includes('onco') || spec.includes('onco') || dept.includes('cancer');
  }

  // Fallback substring matching
  return dept.includes(target) || cat.includes(target);
}
