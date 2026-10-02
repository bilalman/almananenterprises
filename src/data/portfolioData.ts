import { PortfolioItem } from '../types';

/**
 * Al-Mannan Enterprises - Portfolio & Service Delivery Areas
 * 
 * Central data file showcasing verified company operational capabilities and service areas.
 * Per client guidelines, until specific completed client contracts and deployment figures
 * are formally verified by the company, this section presents the 3 actual service divisions
 * as service delivery areas rather than unverified completed projects.
 * 
 * Client can add verified completed projects at any time below.
 */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'division-oep',
    title: 'Overseas Employment Promotions (OEP) Service Area',
    category: 'Overseas Employment Promoters',
    industry: 'International Manpower Recruitment',
    location: 'Pakistan to Gulf & Middle East Corridors',
    description:
      'End-to-end recruitment operations managing international manpower sourcing, candidate credential vetting, trade test coordination, medical clearance assistance, and Protector of Emigrants compliance.',
    imageUrl:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    linkUrl: '/services/overseas-employment',
    linkText: 'Explore OEP Division',
    statusBadge: 'Core Service Division',
    isPlaceholder: false,
    keyHighlights: [
      'Comprehensive Candidate Trade Sourcing',
      'Protector of Emigrants Clearance Protocol',
      'Ethical Recruitment & Zero-Exploitation Standards'
    ]
  },
  {
    id: 'division-travel',
    title: 'Travel & Tours Operations Service Area',
    category: 'Travel & Tours',
    industry: 'Aviation & Emigration Logistics',
    location: 'Lahore, Islamabad & Karachi Departure Hubs',
    description:
      'Specialized travel logistics division coordinating group flight reservations, airport transit protocol management, visa stamping support, and synchronized departure schedules for mobilized workforce batches.',
    imageUrl:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    linkUrl: '/services/travel-tours',
    linkText: 'Explore Travel Division',
    statusBadge: 'Core Service Division',
    isPlaceholder: false,
    keyHighlights: [
      'Group Air Ticketing & Seat Block Allocations',
      'Airport Meet-and-Assist Transit Protocol',
      'Scheduled Flight Departure Coordination'
    ]
  },
  {
    id: 'division-training',
    title: 'Technical Trade Test & Training Center Service Area',
    category: 'Technical Trade Testing',
    industry: 'Practical Trade Evaluation & Testing',
    location: 'Main GT Road, Baghbanpura, Lahore, Pakistan',
    description:
      'Dedicated technical evaluation workshop enabling foreign employer delegations and technical assessors to conduct hands-on skill evaluations across welding, electrical, mechanical, and civil trades.',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    linkUrl: '/services/training-center',
    linkText: 'Explore Testing Facility',
    statusBadge: 'Core Service Division',
    isPlaceholder: false,
    keyHighlights: [
      'Dedicated Test Booths & Calibrated Equipment',
      'Standardized Practical Evaluation Criteria',
      'Pre-Departure Safety & Trade Orientation'
    ]
  },
  {
    id: 'portfolio-placeholder-client-project',
    title: '[Client Project Record - Editable Placeholder]',
    category: 'Client Project Slot',
    industry: '[e.g., Oil & Gas / Civil Construction / MEP / Fleet]',
    location: '[e.g., Saudi Arabia / UAE / Qatar / Oman]',
    description:
      '[Draft Placeholder: This slot is reserved for Al-Mannan Enterprises to document verified completed workforce deployments, employer contracts, or worker placement counts once confirmed by the company.]',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    linkUrl: undefined,
    linkText: 'Awaiting Client Details',
    statusBadge: 'Awaiting Client Verification',
    isPlaceholder: true,
    keyHighlights: [
      '[Add Verified Deployment Scope]',
      '[Add Confirmed Worker Count or Trades]',
      '[Add Employer Approval Details]'
    ]
  }
];
