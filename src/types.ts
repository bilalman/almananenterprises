export interface TeamMember {
  name: string;
  role: string;
  department: string;
  image?: string;
  bio?: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  keyOfferings: string[];
  processSteps: { title: string; desc: string }[];
  categories?: string[];
  ctaLabel: string;
}

export interface ManpowerCategory {
  id: string;
  title: string;
  description: string;
  roles: string[];
  icon: string;
}

export interface WhyChooseReason {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  clientType: 'client' | 'candidate';
  quote: string;
  author: string;
  role: string;
  organization: string;
  location: string;
  projectOrSector: string;
  avatarUrl: string;
  badge: string;
  rating: number;
}

export interface SuccessStory {
  id: string;
  candidateName: string;
  trade: string;
  category: 'technical' | 'industrial' | 'logistics' | 'mep' | 'civil';
  categoryLabel: string;
  hometown: string;
  deploymentLocation: string;
  country: string;
  employerOrProject: string;
  mobilizationDays: number;
  contractType: string;
  avatarUrl: string;
  projectImageUrl: string;
  story: string;
  quote: string;
  highlightStat: string;
  verifiedBadge: string;
  datePlaced: string;
  rating: number;
}

export interface PartnerLogo {
  id: string;
  name: string;
  acronym?: string;
  sector: string;
  country: string;
  tagline: string;
  deployedCount: string;
  specialty: string;
}

export interface FaqItem {
  id: string;
  category: 'client' | 'candidate' | 'general';
  question: string;
  answer: string;
  badge?: string;
}

export interface ContactFormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  service: string;
  workforceCategory: string;
  workersCount: string;
  timeline: string;
  message: string;
  website_hp?: string; // honeypot
}

export interface CandidateFormState {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  profession: string;
  experience: string;
  education: string;
  message: string;
  website_hp?: string; // honeypot
  cvFile?: File | null;
}

export interface CeoMessageData {
  sectionTitle: string;
  name: string;
  designation: string;
  company: string;
  photoUrl: string;
  messageParagraphs: string[];
  isPlaceholder?: boolean;
  note?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  industry: string;
  location?: string;
  description: string;
  imageUrl: string;
  linkUrl?: string; // Route link if verified detail page exists
  linkText?: string;
  statusBadge?: string;
  isPlaceholder?: boolean; // clearly marked editable placeholder
  keyHighlights?: string[];
}

export interface ServiceInquiryState {
  companyName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  destinationCountry: string;
  serviceDivision: string;
  industrySector: string;
  tradesNeeded: string[];
  customTradesText: string;
  headcount: string;
  deploymentTimeline: string;
  testingPreference: string;
  jobScopeDetails: string;
  attachmentFileName?: string;
  website_hp?: string;
}
