import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data/companyData';
import { Testimonial } from '../types';
import {
  Star,
  Quote,
  ShieldCheck,
  Building2,
  UserCheck,
  CheckCircle2,
  MapPin,
  Briefcase
} from 'lucide-react';

interface TestimonialsSectionProps {
  onNavigateContact?: () => void;
  onNavigateApply?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onNavigateContact,
  onNavigateApply
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'client' | 'candidate'>('all');

  const filteredTestimonials: Testimonial[] =
    activeTab === 'all'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((t) => t.clientType === activeTab);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg glass-badge-light text-[#0A3871] text-xs font-bold uppercase tracking-wider font-outfit">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0A3871]" />
              <span>Verified Deployment Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Client & Candidate Endorsements
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-jakarta">
              Hear directly from international engineering directors, logistics leaders, and deployed technical trades mobilized through <strong className="font-cinzel text-slate-800 font-semibold">AL-MANNAN ENTERPRISES</strong>.
            </p>
          </motion.div>

          {/* Interactive Filter Pills with Mobile-friendly touch targets */}
          <div className="flex flex-wrap items-center gap-2 font-outfit">
            <button
              onClick={() => setActiveTab('all')}
              className={`min-h-[44px] px-4 py-2.5 rounded-lg text-xs font-bold transition-smooth cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-[#0A3871] text-white shadow-sm'
                  : 'glass-card-light text-slate-700 hover:bg-white border border-slate-200'
              }`}
            >
              <span>All Endorsements</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/15 font-semibold">
                {TESTIMONIALS_DATA.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('client')}
              className={`min-h-[44px] px-4 py-2.5 rounded-lg text-xs font-bold transition-smooth cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'client'
                  ? 'bg-[#0A3871] text-white shadow-sm'
                  : 'glass-card-light text-slate-700 hover:bg-white border border-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>International Employers</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/15 font-semibold">
                {TESTIMONIALS_DATA.filter((t) => t.clientType === 'client').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('candidate')}
              className={`min-h-[44px] px-4 py-2.5 rounded-lg text-xs font-bold transition-smooth cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'candidate'
                  ? 'bg-[#0A3871] text-white shadow-sm'
                  : 'glass-card-light text-slate-700 hover:bg-white border border-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Placed Workforce</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/15 font-semibold">
                {TESTIMONIALS_DATA.filter((t) => t.clientType === 'candidate').length}
              </span>
            </button>
          </div>
        </div>

        {/* Testimonials Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="glass-card-light rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-smooth flex flex-col justify-between group hover:border-[#0A3871]/40"
              >
                <div className="space-y-4 font-jakarta">
                  {/* Card Top: Stars & Verified Badge */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50/90 text-[11px] font-semibold text-[#0A3871] shrink-0 font-outfit">
                      <CheckCircle2 className="w-3 h-3 text-[#0A3871]" />
                      <span>{item.badge}</span>
                    </div>
                  </div>

                  {/* Project / Sector Tag */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A3871] bg-slate-50/90 px-2.5 py-1.5 rounded-md border border-slate-200/70 font-outfit">
                    <Briefcase className="w-3.5 h-3.5 text-[#0A3871] shrink-0" />
                    <span className="truncate">{item.projectOrSector}</span>
                  </div>

                  {/* Quote text */}
                  <div className="relative pt-1">
                    <Quote className="w-7 h-7 text-blue-100 absolute -top-2 -left-1 -z-0 opacity-80" />
                    <p className="relative z-10 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      "{item.quote}"
                    </p>
                  </div>
                </div>

                {/* Author Card Footer */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-3.5 font-jakarta">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                    <img
                      src={item.avatarUrl}
                      alt={item.author}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate font-heading">
                      {item.author}
                    </h4>
                    <p className="text-[11px] font-medium text-[#0A3871] truncate font-outfit">
                      {item.role}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 shrink-0 text-slate-400" />
                      <span className="truncate">{item.organization}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5 font-outfit">
                      <MapPin className="w-2.5 h-2.5 shrink-0 text-slate-400" />
                      <span className="truncate">{item.location}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Operational Proof Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 glass-card-dark text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10 font-outfit">
            <div className="space-y-1 pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-sky-300">99.2%</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Site Retention
              </div>
              <div className="text-[11px] text-slate-400 font-jakarta">Post-probation performance pass</div>
            </div>

            <div className="space-y-1 pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-sky-300">100%</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Regulatory Pass
              </div>
              <div className="text-[11px] text-slate-400 font-jakarta">Protector of Emigrants & BEOE compliance</div>
            </div>

            <div className="space-y-1 pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-sky-300">14–21 Days</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Mobilization
              </div>
              <div className="text-[11px] text-slate-400 font-jakarta">Average visa to flight turnaround</div>
            </div>

            <div className="space-y-1 pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-sky-300">15,000+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Workforce Mobilized
              </div>
              <div className="text-[11px] text-slate-400 font-jakarta">Across KSA, UAE, Qatar & GCC projects</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-jakarta">
            <div className="text-xs text-slate-300 text-center sm:text-left">
              Need references or trade test audit sheets for your procurement committee?
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto font-outfit">
              {onNavigateContact && (
                <button
                  onClick={onNavigateContact}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-smooth cursor-pointer shadow-sm text-center flex items-center justify-center"
                >
                  Request Employer References
                </button>
              )}
              {onNavigateApply && (
                <button
                  onClick={onNavigateApply}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 glass-card-dark hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-lg transition-smooth cursor-pointer text-center flex items-center justify-center"
                >
                  Candidate Registration
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
