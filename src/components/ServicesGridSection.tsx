import React from 'react';
import { motion } from 'motion/react';
import { useRouter } from '../context/RouterContext';
import { SERVICES_LIST } from '../data/companyData';
import {
  Briefcase,
  Plane,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'overseas-employment': Briefcase,
  'travel-tours': Plane,
  'training-center': Wrench
};

export const ServicesGridSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section id="services" className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A3871]/10 text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
            <span className="w-2 h-2 rounded-full bg-[#0A3871]" />
            <span>Comprehensive Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3 font-heading">
            Our Professional Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-jakarta leading-relaxed">
            Al-Mannan Enterprises provides end-to-end recruitment, travel logistics, and technical skill verification through dedicated specialized divisions.
          </p>
        </motion.div>

        {/* 3-Column Modern Service Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service, index) => {
            const IconComponent = SERVICE_ICONS[service.id] || Briefcase;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="flex flex-col bg-slate-50/70 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all group"
              >
                {/* Visual Image Header */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-900">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Division Badge & Icon */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-[#0A3871]/95 text-[11px] font-bold text-white shadow-xs font-outfit">
                      Division 0{index + 1}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0A3871] shadow-xs">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Service Title on bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider block font-outfit">
                      {service.tagline}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-white leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5 font-jakarta">
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Key Offerings Preview */}
                    <div className="pt-2 border-t border-slate-200/80 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-outfit">
                        Key Capabilities:
                      </div>
                      {service.keyOfferings.slice(0, 3).map((offering, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0A3871] shrink-0 mt-0.5" />
                          <span className="leading-snug">{offering}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Learn More Button linking to Service Detail Page */}
                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3 font-outfit">
                    <button
                      onClick={() => navigate(service.slug)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A3871] hover:bg-[#071E3D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer group/btn"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => navigate('/contact')}
                      className="text-xs font-semibold text-slate-600 hover:text-[#0A3871] transition-colors cursor-pointer"
                    >
                      Inquire Directly
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Capabilities Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#06152B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md font-jakarta">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider font-outfit">
              Government Regulated & Protected
            </div>
            <h4 className="text-lg font-bold text-white font-heading">
              Looking for a Complete Workforce Mobilization Proposal?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              We provide formal commercial proposals, turnaround timelines, and sample documentation for international employers within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 font-outfit">
            <button
              onClick={() => navigate('/services')}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer"
            >
              View All Services
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#06152B] text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              Request Formal Proposal
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
