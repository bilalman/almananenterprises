import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA } from '../data/faqData';
import { FaqItem } from '../types';
import {
  ChevronDown,
  HelpCircle,
  Building2,
  UserCheck,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface FaqSectionProps {
  onNavigateContact?: () => void;
  onNavigateApply?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onNavigateContact,
  onNavigateApply
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'client' | 'candidate'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('client-1');

  const filteredFaqs =
    activeCategory === 'all'
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg glass-badge-light text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
            <HelpCircle className="w-3.5 h-3.5 text-[#0A3871]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Clear Answers for Employers & Candidates
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-jakarta">
            Essential information regarding Pakistani overseas recruitment regulations, trade testing protocols, and mobilization workflows under <strong className="font-cinzel text-slate-800 font-semibold">AL-MANNAN ENTERPRISES</strong>.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10 font-outfit">
          <button
            onClick={() => setActiveCategory('all')}
            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-bold transition-smooth cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'all'
                ? 'bg-[#0A3871] text-white shadow-xs'
                : 'glass-card-light text-slate-700 hover:bg-white border border-slate-200'
            }`}
          >
            <span>All Questions</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/15 font-semibold">
              {FAQ_DATA.length}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('client')}
            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-bold transition-smooth cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'client'
                ? 'bg-[#0A3871] text-white shadow-xs'
                : 'glass-card-light text-slate-700 hover:bg-white border border-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>For International Employers</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/15 font-semibold">
              {FAQ_DATA.filter((i) => i.category === 'client').length}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('candidate')}
            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-bold transition-smooth cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'candidate'
                ? 'bg-[#0A3871] text-white shadow-xs'
                : 'glass-card-light text-slate-700 hover:bg-white border border-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>For Candidates & Jobseekers</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/15 font-semibold">
              {FAQ_DATA.filter((i) => i.category === 'candidate').length}
            </span>
          </button>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-smooth ${
                  isExpanded
                    ? 'border-[#0A3871]/40 bg-white/95 shadow-sm ring-1 ring-[#0A3871]/10'
                    : 'glass-card-light border-slate-200/90 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left px-5 sm:px-6 py-4.5 sm:py-5 min-h-[48px] flex items-center justify-between gap-4 cursor-pointer font-jakarta"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-left">
                    {faq.badge && (
                      <span className="inline-block self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#0A3871] border border-blue-100 shrink-0 font-outfit">
                        {faq.badge}
                      </span>
                    )}
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-heading">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-smooth ${
                      isExpanded
                        ? 'bg-[#0A3871] text-white rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/90 font-jakarta">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Minimalist Bottom Help Desk Bar */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl glass-card-light border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5 text-center sm:text-left font-jakarta">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A3871] flex items-center justify-center shrink-0 hidden sm:flex border border-blue-100">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">
                Have an unaddressed question regarding quotas or candidate trade tests?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 font-jakarta">
                Our recruitment officers at our Lahore Head Office provide direct, official assistance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 font-outfit">
            {onNavigateContact && (
              <button
                onClick={onNavigateContact}
                className="w-full sm:w-auto min-h-[44px] px-4.5 py-2.5 bg-[#0A3871] hover:bg-[#082C59] text-white text-xs font-bold rounded-lg transition-smooth cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Contact Officer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {onNavigateApply && (
              <button
                onClick={onNavigateApply}
                className="w-full sm:w-auto min-h-[44px] px-4.5 py-2.5 glass-card-light hover:bg-white text-slate-700 border border-slate-300 text-xs font-bold rounded-lg transition-smooth cursor-pointer flex items-center justify-center"
              >
                Candidate Register
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
