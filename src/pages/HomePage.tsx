import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  COMPANY_INFO,
  MANPOWER_CATEGORIES,
  TEAM_MEMBERS
} from '../data/companyData';
import { ContactForm } from '../components/ContactForm';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FaqSection } from '../components/FaqSection';
import { TrustedPartners } from '../components/TrustedPartners';
import { SuccessStories } from '../components/SuccessStories';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Briefcase,
  Plane,
  Award,
  Users,
  ChevronRight,
  Flame,
  HardHat,
  Wrench,
  Truck,
  Building2,
  Cpu,
  Globe2,
  FileCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';

// Mobilization Corridors for the Interactive Hero Radar
interface SectorData {
  id: string;
  name: string;
  tag: string;
  icon: React.ElementType;
  headline: string;
  turnaround: string;
  keyRoles: string[];
  testBench: string;
  topDestinations: string[];
}

const SECTORS_DATA: SectorData[] = [
  {
    id: 'oil-gas',
    name: 'Oil & Gas / Industrial',
    tag: 'Petrochemical & Energy',
    icon: Flame,
    headline: 'Certified Welders, Pipe Fabricators & Plant Technicians',
    turnaround: '14–20 Business Days',
    keyRoles: ['6G TIG/MIG/SMAW Welders', 'Pipe Fabricators & Fitters', 'Certified Riggers & Scaffolders', 'NDT Technicians & QC Inspectors'],
    testBench: 'Calibrated radiographic & pressure-tested test booths',
    topDestinations: ['Saudi Arabia (Jubail, Yanbu)', 'UAE (Ruwais, Abu Dhabi)', 'Qatar (Ras Laffan)']
  },
  {
    id: 'civil',
    name: 'Civil & Infrastructure',
    tag: 'Mega-Project Construction',
    icon: Building2,
    headline: 'High-Volume Structural Trades & Heavy Plant Operators',
    turnaround: '12–18 Business Days',
    keyRoles: ['Shuttering & Finishing Carpenters', 'Steel Fixers & Rod Benders', 'Heavy Excavator & Tower Crane Operators', 'Quantity Surveyors & Site Foremen'],
    testBench: 'Practical carpentry, rebar alignment & optical level testing',
    topDestinations: ['Saudi Arabia (Riyadh, NEOM)', 'UAE (Dubai)', 'Kuwait', 'Oman (Muscat)']
  },
  {
    id: 'mep',
    name: 'MEP & Electro-Mechanical',
    tag: 'Systems & Facilities',
    icon: Cpu,
    headline: 'Industrial Electricians, HVAC & Instrumentation Specialists',
    turnaround: '14–21 Business Days',
    keyRoles: ['Industrial & High-Voltage Electricians', 'HVAC Chillers & Duct Technicians', 'Plumbers & Sanitary Specialists', 'PLC & Instrumentation Techs'],
    testBench: '3-phase control circuitry, motor testing & refrigerant diagnostics',
    topDestinations: ['Saudi Arabia (Jeddah, Dammam)', 'UAE (Dubai, Sharjah)', 'Bahrain', 'Qatar']
  },
  {
    id: 'logistics',
    name: 'Logistics & Fleet Transport',
    tag: 'Cross-Border Supply Chain',
    icon: Truck,
    headline: 'Heavy Trailer, Tanker Drivers & Equipment Mechanics',
    turnaround: '10–16 Business Days',
    keyRoles: ['Heavy Trailer (HTV) Drivers (GCC/Pak License)', 'Forklift & Reach Stacker Operators', 'Diesel & Heavy Equipment Mechanics', 'Warehouse Logistics Supervisors'],
    testBench: 'Heavy maneuvering tracks & computerized engine diagnostics',
    topDestinations: ['Saudi Arabia (All Hubs)', 'UAE (Jebel Ali)', 'Oman (Sohar, Salalah)']
  }
];

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeSector, setActiveSector] = useState<SectorData>(SECTORS_DATA[0]);
  const [selectedTradeFilter, setSelectedTradeFilter] = useState<string>('all');

  // Filter manpower trades directory
  const filteredCategories = selectedTradeFilter === 'all'
    ? MANPOWER_CATEGORIES
    : MANPOWER_CATEGORIES.filter(cat => {
        if (selectedTradeFilter === 'engineering') return cat.id === 'engineers';
        if (selectedTradeFilter === 'technical') return cat.id === 'skilled-technical';
        if (selectedTradeFilter === 'construction') return cat.id === 'semi-skilled';
        if (selectedTradeFilter === 'operations') return cat.id === 'general-workforce' || cat.id === 'hr-professionals';
        return true;
      });

  return (
    <div className="w-full bg-white text-slate-900">
      {/* =========================================================================
          1. HERO SECTION - High-Prestige Architectural Dual-Column Layout
          ========================================================================= */}
      <section className="relative bg-[#06152B] text-white overflow-hidden border-b border-slate-800">
        {/* Architectural Grid, Ken-Burns Background & Corporate Navy Gradient Overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Subtle Technical Grid */}
          <div
            className="absolute inset-0 opacity-[0.06] z-10"
            style={{
              backgroundImage: `linear-gradient(#60A5FA 1px, transparent 1px), linear-gradient(90deg, #60A5FA 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }}
          />
          {/* High-Resolution Infrastructure & Mobility Visual with refined Ken-Burns scale motion */}
          <motion.img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=2200&q=85"
            alt="International Engineering & Infrastructure Workforce"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.12 }}
            transition={{
              duration: 14,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="w-full h-full object-cover object-center transform-gpu"
          />

          {/* Refined Corporate Dark Navy Gradient Overlays ensuring crisp text legibility & brand consistency */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06152B] via-[#06152B]/95 to-[#0A3871]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06152B] via-[#06152B]/75 to-[#06152B]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Authoritative Editorial Voice & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-7"
            >
              {/* Government Regulatory Accreditation Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg glass-badge-dark text-xs font-medium text-slate-200 shadow-sm font-outfit">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white tracking-wide">Govt. of Pakistan Licensed Overseas Employment Promoters</span>
                <span className="hidden sm:inline-block text-slate-500">•</span>
                <span className="hidden sm:inline-block text-slate-300 font-medium">BEOE Regulated</span>
              </div>

              {/* Authoritative Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.08] font-heading">
                  Connecting Global Employers With Skilled{' '}
                  <span className="text-sky-300">
                    Pakistani Workforce
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl pt-1 font-jakarta">
                  <strong className="font-cinzel text-white font-semibold">AL-MANNAN ENTERPRISES</strong> coordinates end-to-end recruitment, workshop trade evaluations, Gamca medical clearance, Protector of Emigrants stamping, and chartered flight mobilizations across the Kingdom of Saudi Arabia, UAE, Qatar, Oman, and global destinations.
                </p>
              </div>

              {/* Tactile Call to Action Cluster */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 font-outfit">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/contact')}
                  className="px-7 py-4 bg-white text-[#0A3871] hover:bg-slate-100 font-bold text-sm rounded-lg shadow-xl hover:shadow-2xl transition-smooth flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <Briefcase className="w-4 h-4 text-[#0A3871] group-hover:rotate-6 transition-transform" />
                  <span>Request Manpower Quota</span>
                  <ArrowRight className="w-4 h-4 text-[#0A3871] group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/services')}
                  className="px-6 py-4 glass-card-dark hover:bg-white/10 text-white border border-white/20 hover:border-white/50 font-semibold text-sm rounded-lg transition-smooth flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore 3 Core Divisions</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </motion.button>
              </div>

              {/* Quick Candidate Link */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-jakarta">
                <span>Looking for overseas job opportunities?</span>
                <button
                  onClick={() => navigate('/apply')}
                  className="text-sky-300 hover:text-white font-semibold underline underline-offset-4 flex items-center gap-1 transition-smooth cursor-pointer"
                >
                  <span>Submit Candidate CV</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Key Trust & Regulatory Metric Pillars */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left font-jakarta">
                <div className="space-y-1">
                  <div className="text-white font-bold text-sm flex items-center gap-1.5 font-outfit">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>100% Legal</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Protector of Emigrants Stamped</div>
                </div>

                <div className="space-y-1">
                  <div className="text-white font-bold text-sm flex items-center gap-1.5 font-outfit">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Trade Tested</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Calibrated Workshop Testing</div>
                </div>

                <div className="space-y-1">
                  <div className="text-white font-bold text-sm flex items-center gap-1.5 font-outfit">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>GAMCA Cleared</span>
                  </div>
                  <div className="text-[11px] text-slate-300">GCC Standard Medical Protocol</div>
                </div>

                <div className="space-y-1">
                  <div className="text-white font-bold text-sm flex items-center gap-1.5 font-outfit">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Group Flights</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Synchronized Mobilization</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive Manpower Mobilization Radar Terminal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl glass-card-dark border border-slate-700/80 shadow-2xl overflow-hidden p-6 sm:p-7">
                {/* Card Header & Status */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0A3871]/50 border border-blue-500/30 flex items-center justify-center text-blue-300">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-outfit">
                        Mobilization Dispatch
                      </span>
                      <h2 className="text-sm font-bold text-white font-heading">Active Workforce Trades</h2>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/70 border border-emerald-500/40 text-[11px] font-semibold text-emerald-400 font-outfit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Ready for Deployment</span>
                  </div>
                </div>

                {/* Sector Selector Tabs */}
                <div className="grid grid-cols-2 gap-2 mb-5 font-outfit">
                  {SECTORS_DATA.map((sector) => {
                    const isSelected = activeSector.id === sector.id;
                    const IconComp = sector.icon;
                    return (
                      <button
                        key={sector.id}
                        onClick={() => setActiveSector(sector)}
                        className={`flex items-center gap-2 p-2.5 min-h-[44px] rounded-lg text-left text-xs font-semibold transition-smooth cursor-pointer border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                            : 'glass-card-dark text-slate-300 border-slate-700/50 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
                        <span className="truncate">{sector.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Sector Information Card with AnimatePresence */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSector.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                        {activeSector.tag}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">
                        {activeSector.headline}
                      </h4>
                    </div>

                    {/* Trade Roles Checklist */}
                    <div className="space-y-2 py-2 border-y border-slate-800">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Verified Trade Categories:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeSector.keyRoles.map((role, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                            <span className="truncate">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Operational Benchmarks */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">Deployment Pace</span>
                        <span className="text-white font-bold">{activeSector.turnaround}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">Testing Quality</span>
                        <span className="text-sky-300 font-bold">100% Hands-On Trials</span>
                      </div>
                    </div>

                    {/* Active Flight Route Indicator */}
                    <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/40 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-blue-200">
                        <Plane className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="font-medium">Pakistan (ISB/KHI/LHE)</span>
                      </div>
                      <span className="text-blue-400 font-bold">➔</span>
                      <div className="text-right text-blue-100 font-semibold truncate max-w-[150px]">
                        {activeSector.topDestinations[0]}
                      </div>
                    </div>

                    {/* Action Inside Card */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => navigate('/contact')}
                        className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>Request {activeSector.name} Quota</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigate('/training')}
                        title="View Technical Testing Center"
                        className="py-3 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors border border-slate-700 cursor-pointer"
                      >
                        <Wrench className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. TRUSTED PARTNERS - International Hiring & EPC Logomark Grid
          ========================================================================= */}
      <TrustedPartners onContactClick={() => navigate('/contact')} />

      {/* =========================================================================
          3. CORPORATE INTRODUCTION - Executive Statement & Ethical Foundation
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] flex items-center gap-2 font-outfit">
                <span className="w-2 h-2 rounded-full bg-[#0A3871]"></span>
                <span>Established Manpower Organization</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
                A Reliable Partner for International Workforce Demands
              </h2>
              <div className="w-12 h-1 bg-[#0A3871] rounded-full"></div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2 font-jakarta">
                Pakistan possesses one of the world's most disciplined, capable, and hardworking technical talent pools. <strong className="font-cinzel text-slate-800 font-semibold">AL-MANNAN ENTERPRISES</strong> bridges this vast human potential with reputable employers across Saudi Arabia, the United Arab Emirates, Qatar, Oman, Kuwait, and international destinations.
              </p>
            </div>

            <div className="lg:col-span-7 glass-card-light p-8 sm:p-10 rounded-2xl shadow-xs space-y-5 border border-slate-200/90">
              <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed italic border-l-4 border-[#0A3871] pl-5 font-jakarta">
                "{COMPANY_INFO.coreMessage}"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-slate-100 text-xs text-slate-600 font-jakarta">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-900 font-bold font-outfit">
                    <ShieldCheck className="w-4 h-4 text-[#0A3871]" />
                    <span>Ethical Recruitment Standards</span>
                  </div>
                  <p className="leading-relaxed">Strict zero-exploitation policies, verified employer job orders, and transparent candidate employment contracts.</p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-900 font-bold font-outfit">
                    <Clock className="w-4 h-4 text-[#0A3871]" />
                    <span>Timeline Compliance</span>
                  </div>
                  <p className="leading-relaxed">Fast-track processing from initial interviews through protector stamping and coordinated group flight dispatch.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          3. CORE SERVICES - 3 Integrated Editorial Divisions (Hover & Motion)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3871]"></span>
              <span>Comprehensive Capabilities</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1.5">
              Integrated Overseas Recruitment & Support Services
            </h2>
            <p className="text-base text-slate-600 mt-2.5">
              From candidate sourcing and practical workshop testing to visa liaison and airline ticketing, AL-MANNAN operates an integrated ecosystem for cross-border manpower mobility.
            </p>
          </motion.div>

          {/* DIVISION 1: Overseas Employment Promoters */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group"
          >
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                  alt="Overseas engineering and construction manpower mobilization"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-[#0A3871] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                  Primary Division
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Division 01
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Overseas Employment Promoters
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Connecting global infrastructure, industrial, oil & gas, facilities, and commercial organizations with vetted Pakistani manpower. We manage large-scale talent drives, credential authentication, medical clearance, and protector endorsements.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">
                    National talent network spanning Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, and Azad Kashmir.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">
                    Civil, mechanical, electrical, and QA/QC engineers alongside certified 6G welders and mechanics.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">
                    Full regulatory compliance under the Protector of Emigrants (Government of Pakistan).
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => navigate('/services/overseas-employment')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0A3871] hover:text-[#0B4386] transition-colors cursor-pointer group/btn"
                >
                  <span>Detailed Recruitment Specifications</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* DIVISION 2: Travel & Tours Logistics (Alternating: Content Left, Image Right) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group"
          >
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Division 02
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Travel & Tours
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                International recruitment requires synchronized travel logistics. Our Travel & Tours division handles high-capacity workforce flight bookings, emergency re-routing, transit protocols, and executive itineraries for client interviewing delegations visiting Pakistan.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">
                    Group flight allocations on authorized scheduled carriers to Gulf, Middle East, and international hubs.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">
                    Airport meet-and-assist, document briefing, baggage compliance, and orderly boarding dispatch.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">
                    VIP hospitality and local travel arrangements for visiting corporate employer selection delegations.
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => navigate('/services/travel-tours')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0A3871] hover:text-[#0B4386] transition-colors cursor-pointer group/btn"
                >
                  <span>Explore Travel Operations</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                  alt="Workforce international travel logistics and flight dispatch"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                  Global Mobility
                </div>
              </div>
            </div>
          </motion.div>

          {/* DIVISION 3: Technical Trade Test & Training Center */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group"
          >
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                  alt="Technical trade testing, welding benchmarks, and skill verification workshops"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-[#0A3871] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                  Skill Assurance
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Division 03
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Technical Trade Test & Training Center
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We eliminate recruitment risk through rigorous, hands-on workshop assessments. Our partner testing facilities verify candidate competency across welding, electrical schematics, civil craftsmanship, plant maintenance, and heavy equipment operation before final client selection.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">
                    Calibrated test booths for 6G, TIG, MIG, and structural arc welding with non-destructive weld testing.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">
                    Practical industrial wiring, PLC controls, motor testing, and HVAC refrigeration diagnostics.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">
                    Pre-departure Health, Safety & Environment (HSE) and overseas worksite orientation.
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => navigate('/services/training-center')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0A3871] hover:text-[#0B4386] transition-colors cursor-pointer group/btn"
                >
                  <span>View Trade Testing Capabilities</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          4. RECRUITMENT PROCESS - 4-Step Animated Interactive Workflow
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3871]"></span>
              <span>Structured Workflow</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1.5">
              The Overseas Recruitment Process
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Our systematic 4-phase mobilization framework guarantees legal compliance, quality benchmarks, and punctual deployment.
            </p>
          </motion.div>

          {/* Timeline Grid (4-Step Flow with Hover Lifts) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                tag: 'Demand Order',
                title: 'Job Order & Criteria',
                desc: 'The employer provides job descriptions, required headcounts, trade skill levels, salary structures, and required deployment timeline.',
                highlight: 'Review Specs'
              },
              {
                step: '02',
                tag: 'Sourcing & Trials',
                title: 'Sourcing & Trade Testing',
                desc: 'We mobilize candidates through our nationwide database, conduct preliminary interviews, and run hands-on technical workshop evaluations.',
                highlight: 'Skill Validation'
              },
              {
                step: '03',
                tag: 'Client Selection',
                title: 'Interviews & Selection',
                desc: 'Employers select candidates via direct in-person delegations in Pakistan, live digital video interviews, or delegated recruitment authority.',
                highlight: 'Delegation or Virtual'
              },
              {
                step: '04',
                tag: 'Mobilization',
                title: 'Protector, Visa & Flight',
                desc: 'We coordinate GAMCA medical exams, embassy visa stamping, Protector of Emigrants endorsement, flight booking, and airport dispatch.',
                highlight: 'Group Dispatch'
              }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="relative space-y-3 glass-card-light hover:bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-[#0A3871]/40 shadow-xs hover:shadow-lg transition-smooth flex flex-col justify-between group"
              >
                <div className="space-y-3 font-jakarta">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-[#0A3871] group-hover:scale-105 transition-transform font-outfit">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 bg-slate-100/90 text-slate-700 rounded-md font-outfit border border-slate-200/60">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0A3871] transition-colors font-outfit">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500 flex items-center justify-between font-outfit">
                  <span>{item.highlight}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/recruitment')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0A3871] hover:text-[#0B4386] transition-colors cursor-pointer group"
            >
              <span>Review Detailed Legal & Mobilization Requirements</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. MANPOWER TRADES DIRECTORY - Interactive Filterable Overview
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0A3871]"></span>
                <span>Workforce Specialization</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1.5">
                Manpower Categories Supplied
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                We recruit and deploy disciplined manpower across major industrial trades, verified against international standards.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: 'all', label: 'All Trades' },
                { key: 'engineering', label: 'Engineers' },
                { key: 'technical', label: 'Skilled Techs' },
                { key: 'construction', label: 'Civil Trades' },
                { key: 'operations', label: 'Operations & HR' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTradeFilter(tab.key)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedTradeFilter === tab.key
                      ? 'bg-[#0A3871] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredCategories.map((cat) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={cat.id}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#0A3871]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A3871] flex items-center justify-center font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{cat.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <ul className="space-y-2 text-xs text-slate-700">
                      {cat.roles.slice(0, 5).map((role, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0A3871] shrink-0"></span>
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bespoke Quota Callout */}
          <div className="mt-10 p-6 sm:p-8 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-slate-900 text-base">Need a specialized trade or bespoke headcount quota?</h4>
              <p className="text-xs sm:text-sm text-slate-600">Our recruitment coordinators can mobilize custom trades and industrial delegations.</p>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-[#0A3871] hover:bg-[#0B4386] text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              Discuss Workforce Requirement
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. TEAM SECTION - Professional Executive Leadership & Operational Staff
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3871]"></span>
              <span>Leadership & Operations</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1.5">
              Dedicated Management Team
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Our seasoned executive leadership and operations officers bring decades of combined experience in overseas recruitment, embassy processing, and candidate mobility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="glass-card-light rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-smooth group"
              >
                <div className="relative h-64 bg-slate-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 block font-outfit">
                      {member.department}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2 font-jakarta">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight font-heading">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1.5 border-t border-slate-100">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. WORKFORCE SUCCESS STORIES - Modern Placement & Testimonial Carousel
          ========================================================================= */}
      <SuccessStories
        onNavigateApply={() => navigate('/apply')}
        onNavigateContact={() => navigate('/contact')}
      />

      {/* =========================================================================
          9. CLIENT & CANDIDATE ENDORSEMENTS - Full Feedback Grid
          ========================================================================= */}
      <TestimonialsSection
        onNavigateContact={() => navigate('/contact')}
        onNavigateApply={() => navigate('/apply')}
      />

      {/* =========================================================================
          8. FREQUENTLY ASKED QUESTIONS - Minimalist Accordion
          ========================================================================= */}
      <FaqSection
        onNavigateContact={() => navigate('/contact')}
        onNavigateApply={() => navigate('/apply')}
      />

      {/* =========================================================================
          9. CONTACT & INQUIRY DESK - Direct Engagement & Form
          ========================================================================= */}
      <section id="inquiry" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Corporate Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0A3871]"></span>
                  <span>Direct Engagement</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1.5">
                  Connect With Our Recruitment Desk
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                  Whether you are planning an immediate project intake, requesting a trade test proposal, or scheduling an overseas recruitment trip to Pakistan, our team is at your disposal.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0A3871] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Office Address (Pakistan)</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{COMPANY_INFO.placeholders.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0A3871] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Telephone & WhatsApp</h4>
                    <a
                      href={`tel:${COMPANY_INFO.placeholders.phonePrimary.replace(/\s+/g, '')}`}
                      className="text-xs text-[#0A3871] hover:underline font-bold block min-h-[30px] flex items-center"
                    >
                      {COMPANY_INFO.placeholders.phonePrimary}
                    </a>
                    <a
                      href={`tel:${COMPANY_INFO.placeholders.phoneSecondary.replace(/\s+/g, '')}`}
                      className="text-xs text-slate-600 hover:text-slate-900 hover:underline block min-h-[26px] flex items-center"
                    >
                      {COMPANY_INFO.placeholders.phoneSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0A3871] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Official Emails</h4>
                    <a
                      href={`mailto:${COMPANY_INFO.placeholders.emailInquiries}`}
                      className="text-xs text-[#0A3871] hover:underline font-bold block min-h-[30px] flex items-center"
                    >
                      {COMPANY_INFO.placeholders.emailInquiries}
                    </a>
                    <a
                      href={`mailto:${COMPANY_INFO.placeholders.emailRecruitment}`}
                      className="text-xs text-slate-600 hover:text-slate-900 hover:underline block min-h-[26px] flex items-center"
                    >
                      {COMPANY_INFO.placeholders.emailRecruitment}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0A3871] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Business Operating Hours</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{COMPANY_INFO.placeholders.businessHours}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">Regulatory Licensing</span>
                <p>{COMPANY_INFO.placeholders.licenseNote}</p>
              </div>
            </motion.div>

            {/* Right Column: Functional Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};
