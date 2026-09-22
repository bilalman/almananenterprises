import React, { useState, useRef } from 'react';
import { useRouter } from '../context/RouterContext';
import { SERVICES_LIST } from '../data/companyData';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  ChevronRight,
  ArrowLeft,
  FileText,
  Clock,
  Printer,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { ServiceInquiryForm } from '../components/ServiceInquiryForm';
import { ServiceSpecModal } from '../components/ServiceSpecModal';

interface ServiceDetailPageProps {
  serviceId: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId }) => {
  const { navigate } = useRouter();
  const service = SERVICES_LIST.find((s) => s.id === serviceId) || SERVICES_LIST[0];
  const formRef = useRef<HTMLDivElement>(null);
  const [isSpecModalOpen, setIsSpecModalOpen] = useState<boolean>(false);

  const scrollToInquiry = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-white font-jakarta text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#071E3D] text-white py-16 sm:py-24 border-b border-[#0A2A54] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#071E3D]/85"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-blue-200 font-outfit">
            <button
              onClick={() => navigate('/services')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Services</span>
            </button>
            <span>/</span>
            <span className="text-white font-semibold">{service.title}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg glass-badge-dark text-xs font-bold uppercase tracking-wider text-blue-200 font-outfit">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>AL-MANNAN ENTERPRISES • Verified Division</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl font-heading">
            {service.title}
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
            {service.tagline}
          </p>

          <div className="pt-3 flex flex-wrap gap-3 font-outfit">
            <button
              onClick={scrollToInquiry}
              className="min-h-[44px] px-6 py-3 bg-white hover:bg-slate-100 text-[#0A3871] text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-smooth flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-[#0A3871]" />
              <span>Submit Demand Order</span>
            </button>
            <button
              onClick={() => setIsSpecModalOpen(true)}
              className="min-h-[44px] px-5 py-3 glass-badge-dark hover:bg-white/15 text-white border border-white/25 text-xs font-bold uppercase tracking-wider rounded-lg transition-smooth cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Executive Specification</span>
            </button>
            <button
              onClick={() => navigate('/apply')}
              className="min-h-[44px] px-5 py-3 bg-transparent hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-smooth cursor-pointer"
            >
              Candidate Registration
            </button>
          </div>
        </div>
      </section>

      {/* 2. DESCRIPTION & KEY OFFERINGS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
                  Service Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-heading">
                  Professional Delivery Tailored to Client Specs
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>

              <div className="pt-4 space-y-3">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Core Capabilities & Deliverables
                </h3>
                <div className="space-y-2.5">
                  {service.keyOfferings.map((item) => (
                    <div
                      key={item}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0A3871] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {service.categories && (
                <div className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Target Trades & Workforce Profiles
                    </h3>
                    <span className="text-[11px] text-slate-500 font-outfit uppercase tracking-wider">
                      Tested & Certified
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.categories.map((cat) => (
                      <div
                        key={cat}
                        className="p-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 flex items-center gap-2 hover:border-[#0A3871] transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#0A3871] shrink-0"></span>
                        <span>{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#071E3D] text-white space-y-4 border border-[#0F2F5A] shadow-lg font-jakarta">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-300 font-outfit">
                    Employer Consultation
                  </span>
                  <span className="text-[11px] text-slate-300 font-outfit">
                    Direct Operations Desk
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-heading">
                  Need Manpower for an International Project?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our operations team can review your job description, trade test specifications, and deployment schedule to formulate a tailored recruitment proposal.
                </p>

                <div className="pt-2 space-y-2.5 font-outfit">
                  <button
                    onClick={scrollToInquiry}
                    className="w-full min-h-[44px] py-3 bg-white hover:bg-slate-100 text-[#0A3871] text-xs font-bold uppercase tracking-wider rounded-lg transition-smooth flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Request Workforce Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsSpecModalOpen(true)}
                    className="w-full min-h-[44px] py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-sky-400" />
                    <span>Print Service Specification</span>
                  </button>
                </div>
              </div>

              {/* Other Divisions Navigator */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 font-jakarta">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block font-outfit">
                  Other Operating Divisions
                </span>
                <div className="space-y-2">
                  {SERVICES_LIST.filter((s) => s.id !== service.id).map((other) => (
                    <button
                      key={other.id}
                      onClick={() => navigate(other.slug)}
                      className="w-full text-left p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#0A3871] hover:shadow-xs transition-all flex items-center justify-between text-xs cursor-pointer"
                    >
                      <span className="font-semibold text-slate-800">{other.title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROCESS STEPS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
              Operational Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-1 font-heading">
              How We Execute {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {service.processSteps.map((step, idx) => (
              <div
                key={step.title}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-50 text-[#0A3871] inline-block mb-2 font-outfit">
                    Phase 0{idx + 1}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EMBEDDED DEMAND FORM SECTION */}
      <section ref={formRef} className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-xs font-bold text-[#0A3871] font-outfit uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#0A3871]" />
              <span>Division Specific Inquiry</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 font-heading">
              Initiate Project Demand: {service.title}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Submit your required trades, headcounts, or schedule below. You will receive an official response and trade availability profile from our operations desk.
            </p>
          </div>

          <ServiceInquiryForm initialService={service.id} />
        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-slate-900 font-heading">
            Need Direct Assistance With International Accreditation?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto font-jakarta">
            Contact AL-MANNAN ENTERPRISES for attestation guidance, demand letter drafting, or power of attorney templates.
          </p>
          <div className="pt-2 flex justify-center gap-3 font-outfit">
            <button
              onClick={() => navigate('/contact')}
              className="min-h-[44px] px-6 py-3 bg-[#0A3871] hover:bg-[#082C59] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-smooth cursor-pointer shadow-xs"
            >
              Contact Head Office
            </button>
            <button
              onClick={() => navigate('/services')}
              className="min-h-[44px] px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-smooth cursor-pointer"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Specification Brief Modal */}
      <ServiceSpecModal
        isOpen={isSpecModalOpen}
        onClose={() => setIsSpecModalOpen(false)}
        serviceTitle={service.title}
      />
    </div>
  );
};
