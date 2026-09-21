import { FaqItem } from '../types';

export const FAQ_DATA: FaqItem[] = [
  // --- Client & Employer FAQs ---
  {
    id: 'client-1',
    category: 'client',
    question: 'What is the standard turnaround time from Demand Letter to flight mobilization?',
    answer:
      'For pre-screened technical and civil trades (e.g. pipe welders, electricians, carpenters, heavy drivers), the standard mobilization cycle is 14 to 21 business days following receipt of the authenticated Demand Letter and visa quota (Wakkala / Enjaz). Specialized engineering professionals or multi-stage client delegation visits typically take 25 to 30 days.',
    badge: 'Mobilization Timeline'
  },
  {
    id: 'client-2',
    category: 'client',
    question: 'What mandatory legal documents are required from foreign employers to recruit from Pakistan?',
    answer:
      'Under the Emigration Ordinance of the Government of Pakistan, employers must provide: (1) Demand Letter specifying job titles, quantities, salaries, and benefits; (2) Power of Attorney (Wakkala) authorizing AL-MANNAN ENTERPRISES; and (3) Standard Employment Contract. In the GCC, these documents are attested by the local Chamber of Commerce and Ministry of Foreign Affairs / Embassy of Pakistan.',
    badge: 'Legal Requirements'
  },
  {
    id: 'client-3',
    category: 'client',
    question: 'Can our project management or technical team conduct in-person trade testing in Pakistan?',
    answer:
      'Yes. We regularly host foreign employer delegations at our dedicated technical trade testing facility in Rawalpindi / Islamabad. We provide air-conditioned executive interview boardrooms, fully equipped test bays for 6G welding, electrical circuit testing, pipe fabrication, civil rebar and formwork, as well as logistical support for hotel transfers and security.',
    badge: 'Trade Testing & Audits'
  },
  {
    id: 'client-4',
    category: 'client',
    question: 'What warranty or replacement guarantee does AL-MANNAN offer for mobilized workforce?',
    answer:
      'We provide an unconditional 90-day probationary performance guarantee. If any mobilized worker is found medically unfit or technically incapable of performing the contracted duties as assessed by the employer within the initial 90 days, AL-MANNAN replaces the candidate promptly with zero additional service charge.',
    badge: 'Performance Guarantee'
  },
  {
    id: 'client-5',
    category: 'client',
    question: 'How do you ensure medical clearance and GCC regulatory compliance?',
    answer:
      'Every selected worker must pass an exhaustive physical and biochemical examination strictly through GCC-authorized GAMCA (Gulf Approved Medical Centres Association) clinics. Once cleared, their files are officially processed through the Protectorate of Emigrants (Bureau of Emigration & Overseas Employment, Govt. of Pakistan) with mandatory overseas state insurance.',
    badge: 'GAMCA & Emigration'
  },
  {
    id: 'client-6',
    category: 'client',
    question: 'Do you handle block visa allocations and group chartered flight ticketing?',
    answer:
      'Yes. Through our in-house Travel & Tours division (IATA accredited network), we coordinate block visa group reservations, bulk airline allocations with Gulf carriers (Saudia, Emirates, Qatar Airways, Gulf Air, Flydubai), and synchronized airport departures to ensure crews arrive on site on the exact required mobilization date.',
    badge: 'Group Travel Logistics'
  },

  // --- Candidate & Jobseeker FAQs ---
  {
    id: 'cand-1',
    category: 'candidate',
    question: 'How can I register my CV and apply for overseas vacancies with AL-MANNAN?',
    answer:
      'You can apply online via our Candidate Registration page by uploading your updated resume and trade certificates, or visit our Rawalpindi / Islamabad office in person. Bring your original CNIC, valid passport (minimum 1-year validity), technical diplomas, and past overseas work experience certificates.',
    badge: 'Application Process'
  },
  {
    id: 'cand-2',
    category: 'candidate',
    question: 'Does AL-MANNAN charge any illegal advance recruitment or registration fees?',
    answer:
      'No. AL-MANNAN ENTERPRISES strictly enforces an ethical recruitment policy compliant with the Bureau of Emigration & Overseas Employment (BEOE), Ministry of Overseas Pakistanis. Registration and preliminary skills intake are completely free. Candidate processing costs adhere strictly to official government fee schedules without hidden commissions.',
    badge: 'Ethical Recruitment'
  },
  {
    id: 'cand-3',
    category: 'candidate',
    question: 'What practical trade tests are required before final selection?',
    answer:
      'Depending on your trade, you will undergo a hands-on practical test at our workshop. For example: welders are tested on 3G/4G/6G SMAW or TIG/MIG root and cap welds; electricians are tested on control wiring, 3-phase circuits, and schematics; heavy drivers are tested on road safety, reversing, and vehicle inspection.',
    badge: 'Skill Evaluation'
  },
  {
    id: 'cand-4',
    category: 'candidate',
    question: 'What is the Protector of Emigrants stamp, and why is it mandatory?',
    answer:
      'The Protector stamp from the Government of Pakistan verifies that your employment contract meets legal minimum wage, food, accommodation, and overtime protections. It also enrolls you into the State Life Overseas Workers Insurance Scheme, guaranteeing full legal rights and financial protection for your family while working abroad.',
    badge: 'Legal Protectorate'
  },
  {
    id: 'cand-5',
    category: 'candidate',
    question: 'Do I need an existing GCC driving license to apply for heavy equipment or trailer roles?',
    answer:
      'While a previously held, valid GCC license from Saudi Arabia, UAE, Qatar, or Oman grants immediate priority and higher salary brackets, candidates holding valid Pakistani HTV/LTV licenses with clean records are also eligible for projects that sponsor on-arrival GCC driving conversion.',
    badge: 'Drivers & Fleet'
  },
  {
    id: 'cand-6',
    category: 'candidate',
    question: 'What support does AL-MANNAN provide prior to flight departure?',
    answer:
      'Prior to departure, every candidate attends our Pre-Departure Orientation Seminar in Islamabad covering overseas host country labor laws, site safety protocols, camp rules, cultural etiquette, emergency helpline contacts, and secure banking remittance procedures for sending money back home.',
    badge: 'Pre-Departure Briefing'
  }
];
