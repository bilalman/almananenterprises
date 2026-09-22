import React, { useState, useRef } from 'react';
import { useRouter } from '../context/RouterContext';
import { motion } from 'motion/react';
import { SERVICES_LIST, COMPANY_INFO } from '../data/companyData';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Calculator,
  FileText,
  Clock,
  Plane,
  Award,
  Users,
  Check,
  Sparkles,
  Printer,
  ChevronDown
} from 'lucide-react';
import { ServiceInquiryForm } from '../components/ServiceInquiryForm';
import { DeploymentCalculator } from '../components/DeploymentCalculator';
import { ServiceSpecModal } from '../components/ServiceSpecModal';

export const ServicesPage: React.FC = () => {
  const { navigate } = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const [isSpecModalOpen, setIsSpecModalOpen] = useState<boolean>(false);
  const [selectedServiceForSpec, setSelectedServiceForSpec] = useState<string>(
    'Comprehensive International Manpower Solutions'
  );

  // Prefilled data forwarded from DeploymentCalculator to ServiceInquiryForm
  const [inquiryParams, setInquiryParams] = useState<{
    sector: string;
    headcount: string;
    country: string;
    timeline: string;
    service: string;
  }>({
    sector: 'Civil & Infrastructure Construction',
    headcount: '11 to 50 personnel',
    country: 'Saudi Arabia (KSA)',
    timeline: '30 to 60 days',
    service: 'overseas-employment'
  });

  const scrollToForm = (serviceSlug?: string) => {
    if (serviceSlug) {
      setInquiryParams((prev) => ({ ...prev, service: serviceSlug }));
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCalculatorApply = (plan: {
    sector: string;
    headcount: string;
    country: string;
    timeline: string;
  }) => {
    setInquiryParams({
      sector: plan.sector,
      headcount: plan.headcount,
      country: plan.country,
      timeline: plan.timeline,
      service: 'integrated-package'
    });
    // Scroll smoothly to the form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const openModalWithTitle = (title: string) => {
    setSelectedServiceForSpec(title);
    setIsSpecModalOpen(true);
  };

  return (
    <div className="w-full bg-white text-slate-900 font-jakarta">
      {/* 1. HERO SECTION */}
      <section className="bg-[#071E3D] text-white py-16 sm:py-24 border-b border-[#0A2A54] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(#60A5FA 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg glass-badge-dark text-xs font-bold uppercase tracking-wider text-blue-200 font-outfit">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Govt. of Pakistan BEOE Regulated Operations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading">
            Enterprise Manpower & Mobilization Services
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed font-normal">
            Integrating overseas manpower recruitment, international travel logistics, and technical trade testing under one coordinated Pakistani enterprise.
          </p>

          {/* Quick Action Navigation Bar */}
          <div className="pt-3 flex flex-wrap items-center gap-3 font-outfit">
            <button
              onClick={() => scrollToForm()}
              className="min-h-[44px] px-6 py-3 rounded-lg bg-white hover:bg-slate-100 text-[#0A3871] text-xs font-bold uppercase tracking-wider transition-smooth cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <span>Submit Demand Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={scrollToCalculator}
              className="min-h-[44px] px-5 py-3 rounded-lg glass-badge-dark hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-smooth cursor-pointer flex items-center gap-2 border border-white/20"
            >
              <Calculator className="w-4 h-4 text-sky-400" />
              <span>Mobilization Estimator</span>
            </button>

            <button
              onClick={() => openModalWithTitle('Comprehensive Manpower Deployment Scope')}
              className="min-h-[44px] px-5 py-3 rounded-lg bg-transparent hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-smooth cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Download Executive Brief</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. STATS & GUARANTEES TICKER */}
      <section className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-[#0A3871] font-heading block">
                90 Days
              </span>
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider font-outfit">
                Performance Replacement Warranty
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-[#0A3871] font-heading block">
                100% Verified
              </span>
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider font-outfit">
                Workshop Trade Tested Candidates
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-[#0A3871] font-heading block">
                BEOE Licensed
              </span>
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider font-outfit">
                Protector & Legal Compliance
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-[#0A3871] font-heading block">
                Turnkey Flight
              </span>
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider font-outfit">
                In-House Airline Group Ticketing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICE DIVISIONS (Interactive Cards) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1 font-heading">
              Three Specialized Divisions Working as One
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2 font-jakarta">
              Unlike fragmented recruitment agencies, AL-MANNAN ENTERPRISES owns and operates each step of the mobilization pipeline—from sourcing to workshop testing and direct airline ticketing.
            </p>
          </div>

          <div className="space-y-14">
            {SERVICES_LIST.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-smooth group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Visual Column (5 cols) */}
                  <div className={`lg:col-span-5 relative min-h-72 sm:min-h-80 overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 bg-[#0A3871] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm font-outfit uppercase tracking-wider">
                      Division 0{index + 1}
                    </div>
                  </div>

                  {/* Content Column (7 cols) */}
                  <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
                          {service.tagline}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {service.description}
                      </p>

                      {/* Key Offerings List */}
                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2 font-outfit">
                          Key Capabilities & Protocols:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.keyOfferings.slice(0, 4).map((offering) => (
                            <div key={offering} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0A3871] shrink-0 mt-0.5" />
                              <span>{offering}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3 font-outfit">
                      <button
                        onClick={() => navigate(service.slug)}
                        className="min-h-[42px] px-5 py-2.5 bg-[#0A3871] hover:bg-[#082C59] text-white text-xs font-bold rounded-lg transition-smooth flex items-center gap-2 cursor-pointer shadow-xs group/btn"
                      >
                        <span>{service.ctaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => scrollToForm(service.id)}
                        className="min-h-[42px] px-4 py-2.5 glass-card-light hover:bg-white text-slate-800 border border-slate-300 text-xs font-bold rounded-lg transition-smooth cursor-pointer"
                      >
                        Demand This Service
                      </button>

                      <button
                        onClick={() => openModalWithTitle(service.title)}
                        className="text-xs font-semibold text-slate-500 hover:text-[#0A3871] transition-colors cursor-pointer flex items-center gap-1.5 ml-auto"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Brief Specs</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPARISON & CAPABILITY MATRIX */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
              Execution Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 font-heading">
              Service Models Comparison Matrix
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Choose standalone divisional services or take advantage of our Turnkey Integrated Package for streamlined accountability.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="min-w-full divide-y divide-slate-200 text-xs text-left">
                  <thead className="bg-[#071E3D] text-white font-outfit">
                    <tr>
                      <th className="py-4 px-5 font-bold uppercase tracking-wider">Features & Accountability</th>
                      <th className="py-4 px-4 font-bold uppercase tracking-wider">Div 01: Sourcing</th>
                      <th className="py-4 px-4 font-bold uppercase tracking-wider">Div 02: Trade Testing</th>
                      <th className="py-4 px-4 font-bold uppercase tracking-wider">Div 03: Travel & Tours</th>
                      <th className="py-4 px-5 font-bold uppercase tracking-wider bg-[#0A3871] text-sky-200">
                        Integrated Turnkey
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/80 font-jakarta text-slate-700">
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-5 font-semibold text-slate-900">National Candidate Roster Access</td>
                      <td className="py-3.5 px-4"><Check className="w-4 h-4 text-emerald-600" /></td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-5 bg-blue-50/50 font-bold text-[#0A3871]"><Check className="w-4 h-4 text-emerald-600 inline mr-1" /> Priority Pool</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-5 font-semibold text-slate-900">ASME / AWS Workshop Verification</td>
                      <td className="py-3.5 px-4 text-slate-400">Optional</td>
                      <td className="py-3.5 px-4"><Check className="w-4 h-4 text-emerald-600" /></td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-5 bg-blue-50/50 font-bold text-[#0A3871]"><Check className="w-4 h-4 text-emerald-600 inline mr-1" /> Included</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-5 font-semibold text-slate-900">GAMCA Medical & Biometric Coordination</td>
                      <td className="py-3.5 px-4"><Check className="w-4 h-4 text-emerald-600" /></td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-5 bg-blue-50/50 font-bold text-[#0A3871]"><Check className="w-4 h-4 text-emerald-600 inline mr-1" /> Full Tracking</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-5 font-semibold text-slate-900">Protector of Emigrants Clearance</td>
                      <td className="py-3.5 px-4"><Check className="w-4 h-4 text-emerald-600" /></td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-5 bg-blue-50/50 font-bold text-[#0A3871]"><Check className="w-4 h-4 text-emerald-600 inline mr-1" /> Certified Pass</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-5 font-semibold text-slate-900">Airline Seat Block & Airport Escort</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4"><Check className="w-4 h-4 text-emerald-600" /></td>
                      <td className="py-3.5 px-5 bg-blue-50/50 font-bold text-[#0A3871]"><Check className="w-4 h-4 text-emerald-600 inline mr-1" /> Guaranteed Seats</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-5 font-semibold text-slate-900">90-Day Free Replacement Guarantee</td>
                      <td className="py-3.5 px-4"><Check className="w-4 h-4 text-emerald-600" /></td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-5 bg-blue-50/50 font-bold text-[#0A3871]"><Check className="w-4 h-4 text-emerald-600 inline mr-1" /> 100% Backed</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-5 font-semibold text-slate-900">Single Contract & Dedicated Lead</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-5 bg-blue-50/50 font-bold text-[#0A3871]"><Check className="w-4 h-4 text-emerald-600 inline mr-1" /> Unified Lead</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE MOBILIZATION ESTIMATOR */}
      <section ref={calculatorRef} className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DeploymentCalculator onApplyToInquiry={handleCalculatorApply} />
        </div>
      </section>

      {/* 6. EMBEDDED DEMAND INQUIRY FORM */}
      <section ref={formRef} id="demand-inquiry-section" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
              Direct Demand Registration
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 font-heading">
              Submit Manpower Demand & Trade Requirements
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Attach your demand letter or specify trades below. Receive an official quotation and sourcing allocation within 24 business hours.
            </p>
          </div>

          <ServiceInquiryForm
            initialService={inquiryParams.service}
            initialCountry={inquiryParams.country}
            initialHeadcount={inquiryParams.headcount}
            initialSector={inquiryParams.sector}
          />
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-slate-900 font-heading">
            Need Immediate Consultation with Our Managing Director?
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Our Lahore Head Office & operations desks on Main GT Road are available for scheduled technical calls, trade testing appointments, and visa quota reviews.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-outfit">
            <button
              onClick={() => navigate('/contact')}
              className="min-h-[44px] px-6 py-3 bg-[#0A3871] hover:bg-[#082C59] text-white text-xs font-bold rounded-lg transition-smooth cursor-pointer shadow-xs"
            >
              Contact Head Office Desk
            </button>
            <button
              onClick={() => openModalWithTitle('Comprehensive Manpower Services Specification')}
              className="min-h-[44px] px-6 py-3 glass-card-light hover:bg-white text-slate-800 border border-slate-300 text-xs font-bold rounded-lg transition-smooth cursor-pointer"
            >
              View Service Specs
            </button>
          </div>
        </div>
      </section>

      {/* Specification Brief Modal */}
      <ServiceSpecModal
        isOpen={isSpecModalOpen}
        onClose={() => setIsSpecModalOpen(false)}
        serviceTitle={selectedServiceForSpec}
      />
    </div>
  );
};
