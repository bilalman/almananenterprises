import React from 'react';
import { useRouter } from '../context/RouterContext';
import { motion } from 'motion/react';
import { SERVICES_LIST } from '../data/companyData';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full bg-white text-slate-900">
      {/* Services Hero */}
      <section className="bg-[#071E3D] text-white py-16 sm:py-24 border-b border-[#0A2A54] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
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
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-900/60 border border-blue-500/30 text-xs font-semibold text-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Comprehensive Workforce Operations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Our Business Services
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed font-normal">
            Integrating overseas manpower recruitment, international travel logistics, and technical trade testing under one coordinated Pakistani enterprise.
          </p>
        </motion.div>
      </section>

      {/* Services Overview - 3 Large Editorial Horizontal Blocks */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {SERVICES_LIST.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Visual Column (5 cols) */}
                <div className={`lg:col-span-5 relative min-h-72 sm:min-h-80 overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-[#0A3871] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                    Division 0{index + 1}
                  </div>
                </div>

                {/* Content Column (7 cols) */}
                <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871]">
                        {service.tagline}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>

                    {/* Key Offerings List */}
                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2">
                        Key Capabilities:
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

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => navigate(service.slug)}
                      className="px-5 py-2.5 bg-[#0A3871] hover:bg-[#0B4386] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm group/btn"
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => navigate('/contact')}
                      className="text-xs font-bold text-slate-600 hover:text-[#0A3871] transition-colors cursor-pointer"
                    >
                      Request Quotation / Trade Quota
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Direct Inquiries Callout */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">
            Have a Specific Workforce Requirement?
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Our recruitment officers can prepare a customized manpower deployment timeline and trade assessment proposal for your company.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-[#0A3871] hover:bg-[#0B4386] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Contact Our Recruitment Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
