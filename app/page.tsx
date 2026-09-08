'use client';

import { useEffect, useState } from 'react';
import './extra.css';
import './sections.css';
import './responsive.css';
import './doctor-directory.css';
import './gallery-refresh.css';
import './compact-campus.css';
import './hero-carousel.css';

const departments = [
  ['General Medicine', 'Clinical care', 'Diagnosis, treatment and preventive care for adults.'],
  ['General Surgery', 'Surgical care', 'Specialist consultation and surgical care pathways.'],
  ['Orthopaedics', 'Bone & joint', 'Movement, injury and joint-care support for every age.'],
  ['Obstetrics & Gynaecology', 'Women’s health', 'Compassionate care through every stage of life.'],
  ['Paediatrics', 'Child health', 'Age-appropriate healthcare and family guidance.'],
  ['Radio-Diagnosis', 'Diagnostics', 'Diagnostic imaging support for clinical decision-making.'],
  ['Ophthalmology', 'Eye care', 'Consultation and clinical support for eye health.'],
  ['Dermatology', 'Skin care', 'Dermatology, venereology and leprosy services.'],
  ['Anatomy', 'Academic', 'Foundational anatomy education and laboratory learning.'],
  ['Anesthesiology', 'Clinical care', 'Anaesthesia and peri-operative patient support.'],
  ['Biochemistry', 'Diagnostics', 'Biochemical testing and academic laboratory support.'],
  ['Community Medicine', 'Community care', 'Preventive medicine, health education and outreach.'],
  ['Forensic Medicine', 'Academic', 'Forensic medicine and medical jurisprudence learning.'],
  ['Microbiology', 'Diagnostics', 'Microbiology laboratory and infection-related learning.'],
  ['Otorhinolaryngology', 'ENT care', 'Ear, nose and throat clinical support.'],
  ['Pathology', 'Diagnostics', 'Diagnostic pathology and laboratory services.'],
  ['Pharmacology', 'Academic', 'Clinical pharmacology education and research.'],
  ['Physiology', 'Academic', 'Human physiology education and laboratory learning.'],
  ['Psychiatry', 'Mental health', 'Mental health consultation and support.'],
];
const services = [
  ['01', 'Find a specialist', 'Explore departments, procedures and the right doctor for your care.'],
  ['02', 'Book an appointment', 'Send an appointment request and receive a call-back from our team.'],
  ['03', 'Plan your visit', 'Get practical guidance for OPD, admissions, insurance and patient support.'],
];
const doctorProfiles = [
  { image: '/doctors/doctor-womens-health.png', specialty: 'Women’s Health', name: 'Care Team Profile', department: 'Obstetrics & Gynaecology', availability: 'OPD consultation' },
  { image: '/doctors/doctor-orthopaedics.png', specialty: 'Bone & Joint Care', name: 'Care Team Profile', department: 'Orthopaedics', availability: 'OPD consultation' },
  { image: '/doctors/doctor-paediatrics.png', specialty: 'Child Health', name: 'Care Team Profile', department: 'Paediatrics', availability: 'OPD consultation' },
];
const heroSlides = [
  { image: '1.webp', label: 'Patient-first care', title: 'Here when you need us.' },
  { image: '2.webp', label: 'Modern facilities', title: 'Care supported by thoughtful spaces.' },
  { image: '3.webp', label: 'One connected journey', title: 'From consultation to recovery.' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 5200); return () => window.clearInterval(timer); }, []);
  useEffect(() => {
    if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a[href^="#"]');
      const targetId = link?.getAttribute('href')?.slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', window.location.pathname);
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  return <main>
    <div className="topline"><span>24×7 Emergency Care</span><span>Jagatpura, Jaipur · Rajasthan 302012</span></div>
    <header className="nav-shell"><a href="#home" className="brand" aria-label="BST Hospital home"><img src="/bst-logo.png" alt="Dr. B. S. Tomar Institute of Medical Sciences & Research and Hospital" /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button><nav className={menuOpen ? 'nav open' : 'nav'}><a href="#about">About</a><a href="#departments">Departments</a><a href="#doctors">Doctors</a><a href="#patient-care">Patient Care</a><a href="#contact">Contact</a><a href="#appointment" className="nav-cta">Book appointment</a></nav></header>
    <section className="hero" id="home"><div className="hero-copy"><p className="eyebrow">A unit associated with NIMS</p><h1>Care that listens.<br /><em>Healing that lasts.</em></h1><p className="hero-text">Compassionate, patient-first healthcare from a trusted multidisciplinary team in Jagatpura, Jaipur.</p><div className="hero-actions"><a href="#appointment" className="button primary">Request appointment <span>→</span></a><a href="#departments" className="text-link">Explore specialties <span>↘</span></a></div></div><div className="hero-art"><div className="hero-slides">{heroSlides.map((slide, index) => <img className={index === activeSlide ? 'hero-banner-image active' : 'hero-banner-image'} key={slide.image} src={`https://bstmedicalcollege.com/wp-content/uploads/2025/06/${slide.image}`} alt="BST hospital facility" />)}</div><div className="hero-image-wash"></div><div className="care-card"><span>{heroSlides[activeSlide].label}</span><strong>{heroSlides[activeSlide].title}</strong></div><div className="hero-controls"><button onClick={() => setActiveSlide((activeSlide + heroSlides.length - 1) % heroSlides.length)} aria-label="Previous banner">←</button><div>{heroSlides.map((slide, index) => <button onClick={() => setActiveSlide(index)} className={index === activeSlide ? 'active' : ''} aria-label={`Show banner ${index + 1}`} key={slide.image}></button>)}</div><button onClick={() => setActiveSlide((activeSlide + 1) % heroSlides.length)} aria-label="Next banner">→</button></div></div><div className="hero-strip"><div><b>24×7</b><span>Emergency support</span></div><div><b>Multi-speciality</b><span>Coordinated care</span></div><div><b>Jagatpura</b><span>Jaipur, Rajasthan</span></div></div></section>
    <section className="intro section" id="about"><p className="eyebrow red">WELCOME TO BST HOSPITAL</p><div className="intro-grid"><h2>Modern medicine,<br />deeply human care.</h2><div><p className="lead">At Dr. B. S. Tomar Institute of Medical Sciences & Research and Hospital, we bring together clinical expertise, clear communication and a caring environment—so every patient feels understood.</p><a href="#patient-care" className="under-link">How we support your visit <span>→</span></a></div></div></section>
    <section className="department-section section" id="departments"><div className="section-heading"><div><p className="eyebrow red">HOSPITAL DEPARTMENTS & SPECIALTIES</p><h2>Care for every chapter<br />of your health.</h2></div><p>We provide a broad spectrum of medical and surgical specialties, with teams supported by modern facilities and a patient-first approach to care.</p></div><div className="department-grid">{departments.map(([name, kind, description]) => <article className="department-card" key={name}><span className="card-number">{kind}</span><h3>{name}</h3><p>{description}</p><a href="#appointment">Request support <span>→</span></a></article>)}</div></section>
    <section className="doctor-banner" id="doctors"><div><p className="eyebrow light">THE RIGHT DOCTOR, MADE EASIER</p><h2>Expert guidance begins<br />with a conversation.</h2><p>Find the right department and share your requirement. Our team will guide you to the appropriate specialist.</p><a href="#appointment" className="button pale">Find a doctor <span>→</span></a></div><div className="doctor-orbit" aria-hidden="true"><div className="orbit-core">BST<br /><small>CARE</small></div><span className="orb orb-one">✦</span><span className="orb orb-two">♥</span><span className="orb orb-three">+</span></div></section>
    <section className="directory section"><div className="directory-intro"><div><p className="eyebrow red">DOCTOR DIRECTORY</p><h2>Find expertise<br />that feels personal.</h2></div><p>Choose a specialty, explore the care team, then request an appointment. Individual doctor names, qualifications and schedules can be connected once verified by BST.</p></div><div className="directory-toolbar"><span>Featured specialists</span><div>{['All specialities','Women’s health','Bone & joint','Child health'].map((tag, index) => <button className={index === 0 ? 'active' : ''} key={tag}>{tag}</button>)}</div></div><div className="doctor-grid">{doctorProfiles.map((doctor, index) => <article className="doctor-card" key={doctor.specialty} style={{ animationDelay: `${index * 120}ms` }}><div className="doctor-image"><img src={doctor.image} alt={`${doctor.specialty} care team`} /><span>BST CARE</span></div><div className="doctor-details"><p>{doctor.specialty}</p><h3>{doctor.name}</h3><span>{doctor.department}</span><div className="doctor-meta"><i></i>{doctor.availability}</div><a href="#appointment">Request appointment <b>→</b></a></div></article>)}</div><div className="directory-bottom"><div><b>Can’t find your specialist?</b><span>Tell us your health concern and we’ll guide you to the right department.</span></div><a href="#appointment" className="button primary">Talk to patient support →</a></div></section>
    <section className="section patient-section" id="patient-care"><p className="eyebrow red">PATIENT SERVICES</p><div className="section-heading patient-heading"><h2>Clear support,<br />at every step.</h2><p>From your first question to follow-up care, we help make your experience simpler and more reassuring.</p></div><div className="service-list">{services.map(([num, title, text]) => <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div><b>→</b></article>)}</div></section>
    <section className="gallery section" id="gallery"><div className="section-heading"><div><p className="eyebrow red">CAMPUS & FACILITIES</p><h2>Campus at a glance.</h2></div><p>A quick look at the spaces that support care, learning and clinical excellence.</p></div><div className="gallery-grid"><div className="gallery-note"><span>01 / OUR CAMPUS</span><strong>Thoughtful spaces for every care journey.</strong><p>From reception to advanced learning labs.</p><i>Explore ↓</i></div>{[['DSC04177.webp','Reception'],['image.webp','General Ward'],['image-2.webp','Skill Lab'],['image-3.webp','Library'],['image-5.webp','Dissection Hall'],['DSC04003.webp','Clinical Physiology Lab'],['image-1.webp','Clinical Pathology & Hematology'],['DSC03858.webp','Biochemistry Lab'],['image-6.webp','Histology Lab'],['image-5.webp','Anatomy Museum']].map(([image, title], index) => <figure className={`gallery-item item-${index + 1}`} key={title}><img src={`https://bstmedicalcollege.com/wp-content/uploads/2025/06/${image}`} alt={title} /><figcaption><span>0{index + 1}</span>{title}<b>↗</b></figcaption></figure>)}</div></section>
    <section className="media-section section"><div className="media-head"><div><p className="eyebrow red">OUR MEDIA PRESENCE</p><h2>Moments that connect<br />care with community.</h2></div><p>Hospital updates, community activities and academic milestones from the BST family.</p></div><div className="media-grid">{[['2news.webp','Community health'],['3news.webp','Campus updates'],['4news.webp','BST in the news']].map(([image, title], index) => <article key={title}><div className="media-image"><img src={`https://bstmedicalcollege.com/wp-content/uploads/2025/09/${image}`} alt={title} /><span>0{index + 1}</span></div><div><span>BST UPDATE</span><h3>{title}</h3><p>Explore the latest from BST’s care, campus and community initiatives.</p><a href="#contact">Read story <b>→</b></a></div></article>)}</div></section>
    <section className="careers section" id="jobs"><div><p className="eyebrow light">CAREERS AT BST</p><h2>Build a career<br />that cares.</h2><p>We welcome applications from committed healthcare, academic, administrative and support professionals.</p></div><div className="career-list"><article><span>Clinical teams</span><p>Doctors, nursing and allied healthcare professionals</p></article><article><span>Academic teams</span><p>Teaching, research and laboratory professionals</p></article><article><span>Support teams</span><p>Operations, administration, front desk and patient support</p></article><a href="mailto:info@bstmedicalcollege.com" className="button pale">Send your CV →</a></div></section>
    <section className="appointment" id="appointment"><div className="appointment-copy"><p className="eyebrow light">APPOINTMENTS</p><h2>Let’s take the next step together.</h2><p>Tell us what you need. Our patient-support team will get in touch to help with your appointment.</p><div className="appointment-note"><span>✦</span><p>For urgent medical emergencies, please visit the nearest emergency department immediately.</p></div></div><form onSubmit={(e) => { e.preventDefault(); setSent(true); }}><label>Your name<input required placeholder="Enter your name" /></label><label>Phone number<input required type="tel" placeholder="Enter your phone number" /></label><label>How can we help?<select defaultValue=""><option value="" disabled>Select a department or service</option><option>Find a specialist</option><option>Book an appointment</option><option>Patient services</option></select></label><button className="button primary" type="submit">{sent ? 'Request received ✓' : 'Request a call-back →'}</button>{sent && <p className="form-success">Thank you. Our team will contact you shortly.</p>}</form></section>
    <footer id="contact"><div className="footer-top"><img src="/bstims-logo.png" alt="Dr B S Tomar Institute of Medical Sciences & Research" /><p>Trusted care, close to home.</p><a href="#appointment" className="button primary">Book appointment →</a></div><div className="contact-grid"><div><span>Visit us</span><p>Science Tech City, Jaipur – Delhi Highway, 11c, Jaipur – 303002</p></div><div><span>Call us</span><p><a href="tel:+917412077125">+91 74120 77125</a><br /><a href="tel:+917412077141">+91 74120 77141</a><br /><a href="tel:+919116010407">+91 91160 10407</a></p></div><div><span>Email</span><p><a href="mailto:info@bstmedicalcollege.com">info@bstmedicalcollege.com</a></p></div></div><div className="footer-bottom"><span>© 2026 BST Hospital. All rights reserved.</span><span>Reference: BST Medical College & Research</span><a href="#home">Back to top ↑</a></div></footer>
    <button className="chat-button" onClick={() => setChatOpen(!chatOpen)} aria-label="Open patient support chat">◌ <span>Need help?</span></button>{chatOpen && <aside className="chat-board"><button onClick={() => setChatOpen(false)} aria-label="Close chat">×</button><p className="eyebrow red">BST PATIENT SUPPORT</p><h3>Hello, how can we help?</h3><p>Choose a quick option or request a call-back.</p><a href="#appointment" onClick={() => setChatOpen(false)}>Book an appointment →</a><a href="tel:+919116010407">Call patient support →</a><a href="#departments" onClick={() => setChatOpen(false)}>Explore departments →</a></aside>}
  </main>;
}
