import React from 'react';
import { motion } from 'motion/react';
import { CEO_MESSAGE_DATA, COMPANY_INFO } from '../data/companyData';
import { useRouter } from '../context/RouterContext';
import { WhatsAppIcon, WHATSAPP_LINK } from './WhatsAppButton';
import {
  Quote,
  ShieldCheck,
  CheckCircle2,
  Mail,
  ArrowRight,
  Award
} from 'lucide-react';

export const CeoMessageSection: React.FC = () => {
  const { navigate } = useRouter();
  const {
    sectionTitle,
    name,
    designation,
    company,
    photoUrl,
    messageParagraphs,
    isPlaceholder
  } = CEO_MESSAGE_DATA;

  return (
    <section id="ceo-message" className="py-20 sm:py-28 bg-gradient-to-b from-[#06152B] via-[#092244] to-[#06152B] text-white relative overflow-hidden border-b border-slate-800">
      {/* Subtle Architectural Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#60A5FA 1px, transparent 1px), linear-gradient(90deg, #60A5FA 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Decorative Radial Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-950/80 border border-blue-800/60 text-xs font-bold uppercase tracking-wider text-sky-400 font-outfit">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>Executive Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-3 font-heading">
            {sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 font-jakarta">
            Direct leadership perspective on ethical manpower mobilization, regulatory governance, and our commitments to international partners.
          </p>
        </motion.div>

        {/* Two-Column Layout on Desktop, Clean Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Column 1: CEO Photograph & Credentials Card (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start"
          >
            <div className="relative w-full max-w-md bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-2xl p-3 border border-slate-700/80 shadow-2xl overflow-hidden group">
              {/* Photo Frame */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-950 shadow-inner">
                <img
                  src={photoUrl}
                  alt={`${name} - ${designation}, ${company}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-102"
                />
                
                {/* Gradient vignette for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0A3871]/90 backdrop-blur-md border border-blue-400/30 text-[11px] font-bold text-white shadow-md font-outfit">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span>Executive Board</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight font-heading">
                    {name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-sky-300 uppercase tracking-wider font-outfit">
                    {designation}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {company}
                  </p>
                </div>
              </div>

              {/* Verified Leadership Attributes Bar */}
              <div className="mt-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-300 font-jakarta">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ethical Sourcing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Licensed OEP</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Approved / Editable Message from the CEO (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Draft Placeholder Notice / Quote Icon Header */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex p-3 rounded-xl bg-blue-900/40 border border-blue-700/50 text-sky-400 shadow-sm">
                <Quote className="w-6 h-6 rotate-180" />
              </div>
              {isPlaceholder && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-medium font-jakarta">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Draft Placeholder — For Client & CEO Review Prior to Final Publication</span>
                </div>
              )}
            </div>

            <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-jakarta">
              {messageParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? 'text-white font-medium text-lg sm:text-xl leading-relaxed italic border-l-4 border-sky-400 pl-4 py-0.5'
                      : 'text-slate-300 leading-relaxed'
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Official Signature & Title Block */}
            <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-white font-heading">
                  {name}
                </h4>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-400 font-outfit">
                  {designation} — {company}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ministry of Overseas Pakistanis & HRD Regulated OEP
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#06152B] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer font-outfit"
                >
                  <span>Inquire with Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Direct Official Contact Strip */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-4 font-jakarta">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-400">Official Email:</span>
                <a
                  href={`mailto:${COMPANY_INFO.placeholders.emailInquiries}`}
                  className="text-white hover:text-sky-300 font-semibold"
                >
                  {COMPANY_INFO.placeholders.emailInquiries}
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
