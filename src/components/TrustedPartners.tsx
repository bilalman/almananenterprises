import React from 'react';
import { motion } from 'motion/react';
import { PARTNERS_DATA } from '../data/partnersData';
import {
  Building2,
  ShieldCheck,
  Globe2,
  CheckCircle2,
  ExternalLink,
  Users
} from 'lucide-react';

interface TrustedPartnersProps {
  onContactClick?: () => void;
}

export const TrustedPartners: React.FC<TrustedPartnersProps> = ({ onContactClick }) => {
  return (
    <section className="py-14 sm:py-20 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-badge-light text-xs font-semibold text-slate-700 font-outfit">
              <Building2 className="w-3.5 h-3.5 text-[#0A3871]" />
              <span>International Employer Alliances</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Trusted by Leading International EPC & Engineering Partners
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-jakarta">
              Approved recruitment partner for tier-one contractors, industrial facilities, and logistics fleets across Saudi Arabia, UAE, Qatar, Oman, and Kuwait.
            </p>
          </div>

          {/* Quick Metrics Badge with Glassmorphism */}
          <div className="flex items-center gap-4 shrink-0 glass-card-light p-3.5 rounded-xl shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A3871] flex items-center justify-center font-black text-sm font-outfit">
              GCC
            </div>
            <div className="text-xs font-jakarta">
              <span className="font-bold text-slate-900 block font-outfit">50+ Active Quota Demands</span>
              <span className="text-slate-500">Authenticated via MOFA & Embassies</span>
            </div>
          </div>
        </div>

        {/* Greyscale Logo / Corporate Partner Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-10">
          {PARTNERS_DATA.map((partner, idx) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
              className="group relative p-5 sm:p-6 rounded-xl glass-card-light hover:bg-white border border-slate-200/90 hover:border-[#0A3871]/50 shadow-xs hover:shadow-lg transition-smooth flex flex-col justify-between"
            >
              {/* Top Row: Acronym Mark + Country Tag */}
              <div className="flex items-center justify-between gap-3 mb-4">
                {/* Modern Greyscale Corporate Emblem */}
                <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-[#0A3871] group-hover:text-white transition-colors duration-300 flex items-center justify-center font-black text-xs tracking-wider border border-slate-200 group-hover:border-[#0A3871] font-outfit">
                  {partner.acronym}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-600 border border-slate-200 group-hover:bg-blue-50 group-hover:text-[#0A3871] group-hover:border-blue-100 transition-colors font-outfit">
                  {partner.country.includes('Saudi')
                    ? 'KSA'
                    : partner.country.includes('Emirates')
                    ? 'UAE'
                    : partner.country.includes('Qatar')
                    ? 'QAT'
                    : partner.country.includes('Oman')
                    ? 'OMN'
                    : partner.country.includes('Kuwait')
                    ? 'KWT'
                    : 'GCC'}
                </span>
              </div>

              {/* Partner Name & Details in Greyscale Aesthetic */}
              <div className="space-y-1.5 flex-1 font-jakarta">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0A3871] transition-colors leading-snug font-outfit">
                  {partner.name}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 line-clamp-1">
                  {partner.sector}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {partner.specialty}
                </p>
              </div>

              {/* Mobilization Count Footer */}
              <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-jakarta">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Users className="w-3 h-3 text-[#0A3871]" />
                  <span>{partner.deployedCount}</span>
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust & Accreditation Stripe */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0A3871]" />
              <span>Attested Power of Attorney (Wakkala) Ready</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0A3871]" />
              <span>Chamber of Commerce Validated Demands</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0A3871]" />
              <span>90-Day Unconditional Performance Guarantee</span>
            </span>
          </div>

          {onContactClick && (
            <button
              onClick={onContactClick}
              className="text-[#0A3871] hover:text-[#082C59] font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Submit Project Quota Demand</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
