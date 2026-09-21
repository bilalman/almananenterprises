import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SERVICES_LIST } from '../data/companyData';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

interface ServiceDetailPageProps {
  serviceId: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId }) => {
  const { navigate } = useRouter();
  const service = SERVICES_LIST.find((s) => s.id === serviceId) || SERVICES_LIST[0];

  return (
    <div className="w-full bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0A3871] text-white py-16 sm:py-24 border-b border-[#071E3D] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#071E3D]/80"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-blue-200">
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

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AL-MANNAN ENTERPRISES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl">
            {service.title}
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
            {service.tagline}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-[#0A3871] text-xs font-bold rounded-md shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-[#0A3871]" />
              <span>Inquire About This Service</span>
            </button>
            <button
              onClick={() => navigate('/apply')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-semibold rounded-md transition-colors cursor-pointer"
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
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871]">
                  Service Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  Professional Delivery Tailored to Client Specs
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>

              <div className="pt-4 space-y-3">
                <h3 className="text-base font-bold text-slate-900">
                  Core Capabilities & Deliverables
                </h3>
                <div className="space-y-2.5">
                  {service.keyOfferings.map((item) => (
                    <div
                      key={item}
                      className="p-3.5 rounded-md bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0A3871] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {service.categories && (
                <div className="pt-6 space-y-3">
                  <h3 className="text-base font-bold text-slate-900">
                    Target Trades & Workforce Profiles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.categories.map((cat) => (
                      <div
                        key={cat}
                        className="p-3 rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-700 flex items-center gap-2"
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
              <div className="p-6 rounded-lg bg-[#071E3D] text-white space-y-4 border border-[#0F2F5A] shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block">
                  Employer Consultation
                </span>
                <h3 className="text-xl font-bold text-white">
                  Need Manpower for an International Project?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our operations team can review your job description, trade test specifications, and deployment schedule to formulate a tailored recruitment proposal.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-3 bg-white hover:bg-slate-100 text-[#0A3871] text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Workforce Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-slate-200 bg-slate-50 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Other Operating Divisions
                </span>
                <div className="space-y-2">
                  {SERVICES_LIST.filter((s) => s.id !== service.id).map((other) => (
                    <button
                      key={other.id}
                      onClick={() => navigate(other.slug)}
                      className="w-full text-left p-3 rounded-md bg-white border border-slate-200 hover:border-[#0A3871]/40 transition-colors flex items-center justify-between text-xs cursor-pointer"
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
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871]">
              Operational Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-1">
              How We Execute This Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {service.processSteps.map((step, idx) => (
              <div
                key={step.title}
                className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-[#0A3871] inline-block mb-2">
                    Phase 0{idx + 1}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">
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

      {/* 4. BOTTOM CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">
            Get Started With {service.title}
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Contact AL-MANNAN ENTERPRISES to discuss your specific requirements.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-[#0A3871] hover:bg-[#0B4386] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
            >
              Submit Requirements
            </button>
            <button
              onClick={() => navigate('/services')}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-md transition-colors cursor-pointer"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
