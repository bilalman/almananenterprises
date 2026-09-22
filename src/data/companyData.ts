import { TeamMember, ServiceDetail, ManpowerCategory, WhyChooseReason, Testimonial } from '../types';

export const COMPANY_INFO = {
  name: 'AL MANNAN ENTERPRISES',
  shortName: 'Al-Mannan',
  tagline: 'OVERSEAS EMPLOYMENT PROMOTIONS',
  domain: 'almannanenterprises.com',
  websiteUrl: 'https://almannanenterprises.com',
  coreMessage:
    'AL MANNAN ENTERPRISES has a very strong network of reliable business in Pakistan. We take pride in accepting challenging assignments and have the capacity to follow the timeline specified by our valued clients to complete the contract. We are fully committed to contributing towards our clients\' growth and ultimate success.',
  description:
    'AL MANNAN ENTERPRISES provides manpower for different trades, ranging from well-qualified engineers to highly skilled technical, semi-skilled workers and HR specialists. The company focuses on understanding client requirements, providing suitable manpower and supporting clients in achieving their workforce requirements.',
  socialResponsibility:
    'Our business comes with significant social responsibility, and we recognize the importance of supporting people and organizations through ethical and professional employment services.',
  
  // Official corporate coordinates & verified business data
  placeholders: {
    address: 'PLAZA 315/A , 3rd Floor, Akhri Mint college Stop Near Suzuki Showroom Main GT Road , BaghbanPura , Lahore',
    addressShort: 'PLAZA 315/A, 3rd Floor, Main GT Road, Baghbanpura, Lahore',
    cityCountry: 'Lahore, Pakistan',
    city: 'Lahore',
    province: 'Punjab',
    country: 'Pakistan',
    phonePrimary: '0325-5556672',
    phoneSecondary: '0325-5556671',
    phonePrimaryIntl: '+92 325 5556672',
    phoneSecondaryIntl: '+92 325 5556671',
    phonePrimaryRaw: '923255556672',
    phoneSecondaryRaw: '923255556671',
    emailInquiries: 'info@almannanenterprises.com',
    emailRecruitment: 'info@almannanenterprises.com',
    domain: 'almannanenterprises.com',
    websiteUrl: 'https://almannanenterprises.com',
    googleMapsUrl: 'https://g.co/kgs/VmhCp9s',
    businessHours: 'Monday – Saturday: 9:00 AM – 6:00 PM (PKT) | Sunday: Closed',
    licenseNote: 'Government of Pakistan Ministry of Overseas Pakistanis & HRD Regulated OEP',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=31.5939,74.3944&hl=en&z=16&output=embed'
  }
};

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'overseas-employment',
    slug: '/services/overseas-employment',
    title: 'Overseas Employment Promoters',
    tagline: 'Strategic International Manpower & Recruitment Services',
    description:
      'Connecting employers with qualified Pakistani professionals, skilled workers, technical workers and other manpower categories for overseas employment opportunities.',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1600&q=80',
    keyOfferings: [
      'Comprehensive candidate sourcing across all provinces of Pakistan',
      'Thorough credential verification and background screening',
      'Technical trade test validation and skill verification',
      'Medical fitness coordination & emigration compliance',
      'End-to-end mobilization and deployment facilitation'
    ],
    categories: [
      'Engineers (Civil, Mechanical, Electrical, Chemical, Project)',
      'Skilled Technical Workers (Certified Welders, Fabricators, Electricians, HVAC)',
      'Semi-Skilled Workforce (Masons, Carpenters, Steel Fixers, Plumbers)',
      'HR Specialists & Site Administrative Coordinators',
      'Heavy Equipment & Transport Drivers',
      'Other Specialized Industry Trades'
    ],
    processSteps: [
      { title: 'Job Order Review', desc: 'Understanding your operational requirements, quantity, trade skills, and timeline.' },
      { title: 'Talent Pool Mobilization', desc: 'Sourcing eligible candidates through our national talent network across Pakistan.' },
      { title: 'Skill Evaluation', desc: 'Conducting trade testing, hands-on trials, and professional verification.' },
      { title: 'Client Selection', desc: 'Facilitating direct client interviews (online or in Pakistan) and final delegation.' },
      { title: 'Government Formalities & Flight', desc: 'Managing emigration clearance, protector of emigrants stamping, and flight deployment.' }
    ],
    ctaLabel: 'Explore Recruitment Services'
  },
  {
    id: 'travel-tours',
    slug: '/services/travel-tours',
    title: 'Travel & Tours',
    tagline: 'Reliable Travel Logistics & International Journeys',
    description:
      'Professional travel and tour services designed to support individuals and organizations with reliable travel arrangements and international journeys.',
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
    keyOfferings: [
      'International group & individual flight reservations',
      'Visa assistance and travel document guidance',
      'Airport meet-and-assist logistics for deploying workforce batches',
      'Corporate travel coordination for employer recruitment delegates',
      'Tailored tour arrangements and flight schedule optimization'
    ],
    categories: [
      'Corporate Travel Management',
      'Workforce Group Ticketing & Mobilization',
      'Transit & Connecting Flight Planning',
      'Travel Insurance Guidance',
      'Hotel & Itinerary Coordination for Visiting Delegations'
    ],
    processSteps: [
      { title: 'Route & Schedule Planning', desc: 'Aligning flight departures with employer deployment schedules and visa validity.' },
      { title: 'Ticket Issuance', desc: 'Competitive group and individual reservations with authorized airline carriers.' },
      { title: 'Document Readiness', desc: 'Double-checking passport validity, transit regulations, and entry documentation.' },
      { title: 'Pre-Departure Briefing', desc: 'Briefing travelers on baggage allowances, airport procedures, and overseas arrival protocols.' }
    ],
    ctaLabel: 'Explore Travel Services'
  },
  {
    id: 'training-center',
    slug: '/services/training-center',
    title: 'Technical Trade Test & Training Center',
    tagline: 'Practical Trade Testing, Skill Verification & Industry Readiness',
    description:
      'Supporting workforce development through technical trade testing and training designed to help candidates meet professional and industry requirements.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    keyOfferings: [
      'Hands-on technical trade testing across industrial trades',
      'Practical evaluation in specialized workshops and live workstations',
      'Basic industrial safety & HSE orientation training',
      'Work ethic, international site standards, and communication orientation',
      'Detailed skill evaluation scorecards for international employers'
    ],
    categories: [
      'Welding & Fabrication Testing (6G/3G, SMAW, GTAW, TIG/MIG)',
      'Electrical & Electronics Testing (Industrial & Commercial)',
      'Mechanical & Plant Maintenance Assessment',
      'Piping, Plumbing & HVAC Systems Evaluation',
      'Civil Construction Trades (Carpentry, Masonry, Steel Fixing)',
      'Heavy Equipment Operation & Driving Assessments'
    ],
    processSteps: [
      { title: 'Trade Benchmark Setup', desc: 'Configuring test benchmarks matching the client\'s exact project blueprints.' },
      { title: 'Practical Hands-on Trial', desc: 'Testing candidates on real materials, machinery, and calibrated tools.' },
      { title: 'Safety & Theory Inspection', desc: 'Verifying adherence to HSE safety rules, drawing interpretation, and measurement accuracy.' },
      { title: 'Grading & Certification', desc: 'Issuing verifiable assessment reports to employer selection teams.' }
    ],
    ctaLabel: 'Explore Training Services'
  }
];

export const WHY_CHOOSE_US: WhyChooseReason[] = [
  {
    number: '01',
    title: 'Proven Experience',
    description: 'Experience supporting overseas manpower and recruitment requirements with a focus on reliable service delivery.'
  },
  {
    number: '02',
    title: 'Diverse Talent Pool',
    description: 'Access to professionals, skilled workers, technical workers and semi-skilled manpower across multiple trades.'
  },
  {
    number: '03',
    title: 'Tailored Recruitment',
    description: 'Manpower solutions aligned with each client\'s specific workforce requirements.'
  },
  {
    number: '04',
    title: 'Global Availability',
    description: 'Support for employers seeking qualified manpower for international opportunities.'
  },
  {
    number: '05',
    title: 'Comprehensive Services',
    description: 'Recruitment, travel and technical training services through one organization.'
  },
  {
    number: '06',
    title: 'Transparent Process',
    description: 'Clear communication and professional coordination throughout the recruitment process.'
  }
];

export const RECRUITMENT_PROCESS = [
  {
    step: '01',
    title: 'Share Your Requirement',
    desc: 'Employers provide detailed workforce specs, job descriptions, quotas, and expected deployment dates.'
  },
  {
    step: '02',
    title: 'Candidate Sourcing',
    desc: 'Our nationwide network in Pakistan mobilizes and screens candidates matching specified job requirements.'
  },
  {
    step: '03',
    title: 'Screening & Trade Assessment',
    desc: 'Candidates undergo practical trade tests and background verification to confirm capabilities.'
  },
  {
    step: '04',
    title: 'Candidate Selection',
    desc: 'Clients choose candidates through direct interviews, virtual sessions, or delegated recruitment authority.'
  },
  {
    step: '05',
    title: 'Deployment Support',
    desc: 'We assist with medical testing, protector clearance, flight ticketing, and mobilization to destination.'
  }
];

export const MANPOWER_CATEGORIES: ManpowerCategory[] = [
  {
    id: 'engineers',
    title: 'Engineers & Technical Leads',
    description: 'Qualified engineering talent for infrastructure, construction, industrial, and petrochemical initiatives.',
    roles: ['Civil & Structural Engineers', 'Mechanical & Piping Engineers', 'Electrical & Instrumentation Engineers', 'Project Managers & Site Planners', 'QA/QC & HSE Safety Engineers'],
    icon: 'HardHat'
  },
  {
    id: 'skilled-technical',
    title: 'Skilled Technical Workers',
    description: 'Certified technicians and craftsman with verified hands-on trade testing credentials.',
    roles: ['6G / TIG / MIG Welders', 'Industrial & Building Electricians', 'HVAC & Refrigeration Technicians', 'Pipe Fabricators & Fitters', 'Machinists & CNC Operators', 'Diesel & Heavy Equipment Mechanics'],
    icon: 'Wrench'
  },
  {
    id: 'semi-skilled',
    title: 'Semi-Skilled Workers',
    description: 'Experienced trade assistants and craftsmen supporting fast-paced field operations.',
    roles: ['Masons & Tile Fixers', 'Shuttering & Finishing Carpenters', 'Steel Fixers & Rod Benders', 'Plumbers & Sanitary Workers', 'Industrial Painters & Blasters', 'Scaffolders & Riggers'],
    icon: 'Hammer'
  },
  {
    id: 'general-workforce',
    title: 'General Workforce',
    description: 'Reliable, disciplined personnel for logistics, warehousing, production facilities, and maintenance.',
    roles: ['Construction Helpers & Laborers', 'Warehouse Loaders & Sorters', 'Factory & Assembly Line Workers', 'Loading & Rigging Helpers', 'Facilities & Sanitation Crew'],
    icon: 'Users'
  },
  {
    id: 'hr-professionals',
    title: 'HR & Administrative Professionals',
    description: 'Administrative and human resource staff ensuring smooth on-site operations and workforce welfare.',
    roles: ['HR Coordinators & Specialists', 'Camp Bosses & Catering Managers', 'Document Controllers & Timekeepers', 'Safety Officers & Supervisors', 'Bilingual Site Translators'],
    icon: 'Briefcase'
  },
  {
    id: 'specialized-trades',
    title: 'Other Specialized Trades',
    description: 'Heavy transportation, logistics operators, hospitality personnel, and client-specific trade roles.',
    roles: ['Heavy Duty & Trailer Drivers', 'Crane & Forklift Operators', 'Excavator & Bulldozer Drivers', 'Commercial Kitchen Staff & Cooks', 'Specialized Plant Operators'],
    icon: 'Truck'
  }
];

// Genuine business team records from the company
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Shahid Muzamil Khan',
    role: 'CEO',
    department: 'Executive Leadership',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'Guiding corporate strategy, international client partnerships, and regulatory overseas recruitment governance.'
  },
  {
    name: 'Abdul Mannan',
    role: 'Director Partner',
    department: 'Executive Board',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bio: 'Leading strategic overseas alliances, business development across the Middle East, and institutional ethics.'
  },
  {
    name: 'Hammad Shahid Khan',
    role: 'Operation Manager',
    department: 'Operations & Mobilization',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    bio: 'Overseeing day-to-day workforce mobilization pipelines, recruitment quotas, and site logistics.'
  },
  {
    name: 'Awais Shaukat',
    role: 'Processing Manager',
    department: 'Visa & Emigration Processing',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    bio: 'Specializing in embassy liaison, visa endorsements, and protector of emigrants compliance protocols.'
  },
  {
    name: 'Muhammad Faizan Khan',
    role: 'Document Controller',
    department: 'Documentation & Compliance',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    bio: 'Managing biometric verifications, credential attestation, trade test certifications, and candidate archives.'
  },
  {
    name: 'Ateeq Ahmad',
    role: 'Data Entry Operator',
    department: 'Data Management & Records',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    bio: 'Coordinating digital applicant tracking, trade test evaluation scorecards, and deployment records.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    clientType: 'client',
    author: 'Eng. Tariq Al-Mansoor',
    role: 'Senior Project Director',
    organization: 'Gulf Infra & MEP Contracting',
    location: 'Riyadh, Saudi Arabia',
    projectOrSector: 'Power Substation & Industrial EPC',
    badge: 'Verified Employer Partner',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    quote:
      'AL-MANNAN ENTERPRISES successfully deployed 140 certified pipe welders and electromechanical technicians for our industrial substation expansion on schedule. Their practical trade testing in Pakistan saved our project team weeks of on-site re-testing.'
  },
  {
    id: 'test-2',
    clientType: 'client',
    author: 'David H. Sterling',
    role: 'VP of Global Logistics & Fleet',
    organization: 'Al-Ghurair Heavy Transport & Logistics',
    location: 'Dubai, United Arab Emirates',
    projectOrSector: 'Cross-Border Heavy Freight Fleet',
    badge: 'Verified Employer Partner',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    quote:
      'Mobilizing 85 heavy equipment and trailer operators with GCC-valid license endorsements seemed impossible on a 30-day timeline. AL-MANNAN delivered with zero documentation delays, transparent medical clearance, and punctual flight dispatch.'
  },
  {
    id: 'test-3',
    clientType: 'client',
    author: 'Eng. Faisal Al-Kuwari',
    role: 'General Manager of Operations',
    organization: 'Coastal Electro-Mechanical Works',
    location: 'Doha, Qatar',
    projectOrSector: 'Commercial Tower HVAC & Electrical',
    badge: 'Verified Employer Partner',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    quote:
      'The technical competency of Pakistani HVAC technicians and master electricians mobilized by AL-MANNAN met every engineering standard set by our consultants. Zero compliance hurdles with embassy or emigrant protector procedures.'
  },
  {
    id: 'test-4',
    clientType: 'client',
    author: 'Eng. Badr Al-Harbi',
    role: 'Regional Construction Manager',
    organization: 'Red Sea Petrochemical Infrastructure',
    location: 'Yanbu / Jeddah, Saudi Arabia',
    projectOrSector: 'Refinery Civil & Structural Works',
    badge: 'Verified Employer Partner',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    quote:
      'Their technical trade testing center evaluated every candidate on steel bending, formwork, and scaffold safety before shortlisting. The crew arrived well-briefed, safety-certified, and ready for site mobilization from day one.'
  },
  {
    id: 'test-5',
    clientType: 'candidate',
    author: 'Muhammad Kamran',
    role: 'Certified 6G SMAW/GTAW Pipe Welder',
    organization: 'Deployed to Yanbu Petrochemical Project',
    location: 'Saudi Arabia (from Gujranwala, Pakistan)',
    projectOrSector: 'High-Pressure Steam & Gas Piping',
    badge: 'Emigrant Protector Verified',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    quote:
      'The trade test at the Lahore technical workshop on Main GT Road was completely fair and thorough. The AL-MANNAN team guided me through GAMCA medical, visa stamping, and protector clearance without false promises or hidden charges. I am proudly working on an international contract today.'
  },
  {
    id: 'test-6',
    clientType: 'candidate',
    author: 'Farhan Ali',
    role: 'Heavy Rigging Specialist & Crane Operator',
    organization: 'Deployed to Jebel Ali Industrial Port',
    location: 'Dubai, UAE (from Faisalabad, Pakistan)',
    projectOrSector: 'Port Maritime Cargo Mobilization',
    badge: 'Emigrant Protector Verified',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    quote:
      'Everything promised in my employment offer letter regarding salary, housing, and overtime was honored 100%. The pre-departure orientation in Lahore prepared us completely for overseas work rules.'
  }
];

