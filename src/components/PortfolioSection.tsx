import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from '../context/RouterContext';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import {
  Briefcase,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Service Areas' },
    { id: 'Overseas Employment Promoters', label: 'Overseas Manpower' },
    { id: 'Technical Trade Testing', label: 'Trade Test Center' },
    { id: 'Travel & Tours', label: 'Travel & Logistics' }
  ];

  const filteredItems = filter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A3871]/10 text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
              <Layers className="w-3.5 h-3.5" />
              <span>Demonstrated Delivery & Mobilization</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-heading">
              Our Portfolio & Completed Work
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-jakarta">
              Presenting Al-Mannan Enterprises' three core operational divisions as established service delivery areas. As specific completed employer assignments are confirmed, they can be added directly via the portfolio data file.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-outfit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  filter === cat.id
                    ? 'bg-[#0A3871] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            const isPlaceholder = Boolean(item.isPlaceholder);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`flex flex-col bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-xl transition-all group ${
                  isPlaceholder
                    ? 'border-dashed border-amber-300 bg-amber-50/20'
                    : 'border-slate-200/90'
                }`}
              >
                {/* Image Banner */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Badges on top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#0A3871]/90 backdrop-blur-md text-[11px] font-bold text-white shadow-xs font-outfit">
                      {item.category}
                    </span>

                    {item.statusBadge && (
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs font-outfit ${
                          isPlaceholder
                            ? 'bg-amber-500/90 text-white'
                            : 'bg-emerald-600/90 text-white'
                        }`}
                      >
                        {item.statusBadge}
                      </span>
                    )}
                  </div>

                  {/* Location / Industry on bottom of photo */}
                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs flex items-center gap-1.5 font-jakarta">
                    <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate text-slate-200 font-medium">
                      {item.location || item.industry}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 font-jakarta">
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
                      {item.industry}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug font-heading group-hover:text-[#0A3871] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  {item.keyHighlights && item.keyHighlights.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                      {item.keyHighlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0A3871] shrink-0 mt-0.5" />
                          <span className="leading-snug">{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Link (Rendered only if valid destination exists) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    {item.linkUrl ? (
                      <button
                        onClick={() => navigate(item.linkUrl!)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A3871] hover:text-[#071E3D] transition-colors cursor-pointer group/btn font-outfit"
                      >
                        <span>{item.linkText || 'View Details'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium font-outfit">
                        Verified Execution
                      </span>
                    )}

                    {isPlaceholder && (
                      <span className="text-[10px] text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded font-mono">
                        Editable Slot
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Central Portfolio Management Info Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 font-jakarta">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900 font-heading">
              Need to Discuss a Custom Recruitment Order or Delegation Visit?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Our operations team coordinates directly with international employers to structure bespoke manpower deployment pipelines.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A3871] hover:bg-[#071E3D] text-white text-xs font-bold shadow-sm transition-all cursor-pointer font-outfit"
            >
              <span>Submit Job Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
