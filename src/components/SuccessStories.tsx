import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SUCCESS_STORIES } from '../data/successStoriesData';
import { SuccessStory } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Briefcase,
  Award,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Building,
  Quote
} from 'lucide-react';

interface SuccessStoriesProps {
  onNavigateApply?: () => void;
  onNavigateContact?: () => void;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({
  onNavigateApply,
  onNavigateContact
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter stories if a category is selected
  const filteredStories =
    selectedCategory === 'all'
      ? SUCCESS_STORIES
      : SUCCESS_STORIES.filter((s) => s.category === selectedCategory);

  // Keep index within range when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const totalStories = filteredStories.length;
  const currentStory: SuccessStory = filteredStories[currentIndex] || SUCCESS_STORIES[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalStories - 1 : prev - 1));
  }, [totalStories]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalStories - 1 ? 0 : prev + 1));
  }, [totalStories]);

  // Autoplay functionality with pause on user hover
  useEffect(() => {
    if (!isAutoPlaying || totalStories <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext, totalStories]);

  return (
    <section
      id="success-stories"
      className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg glass-badge-dark text-xs font-semibold text-blue-200 font-outfit">
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Proven Placements & Verified Journeys</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Workforce Success Stories
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-jakarta">
              Real accounts from certified Pakistani technical, civil, and mechanical personnel mobilized across the Middle East with 100% legal compliance.
            </p>
          </div>

          {/* Carousel Manual Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              aria-label="Previous success story"
              className="w-11 h-11 rounded-lg glass-card-dark hover:border-blue-500/50 text-slate-200 hover:text-white flex items-center justify-center transition-smooth cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <span className="text-xs font-semibold text-slate-400 min-w-[50px] text-center font-outfit">
              {currentIndex + 1} / {totalStories}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              aria-label="Next success story"
              className="w-11 h-11 rounded-lg glass-card-dark hover:border-blue-500/50 text-slate-200 hover:text-white flex items-center justify-center transition-smooth cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-8 font-outfit">
          {[
            { id: 'all', label: 'All Placements' },
            { id: 'technical', label: 'Specialized 6G Welding' },
            { id: 'mep', label: 'Electromechanical / MEP' },
            { id: 'logistics', label: 'Heavy Rigging & Fleet' },
            { id: 'industrial', label: 'Plant Turnaround' },
            { id: 'civil', label: 'Civil & Formwork' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-smooth cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'glass-badge-dark text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Carousel Card Showcase */}
        <div className="relative min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl glass-card-dark border border-slate-700/80 p-6 sm:p-8 lg:p-10 shadow-2xl"
            >
              {/* Left Column: Worker Identity, Portrait & Verified Credentials */}
              <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-700/80 pb-6 lg:pb-0 lg:pr-8 space-y-6">
                <div className="space-y-4">
                  {/* Photo & Badge */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-blue-500/40 shadow-md">
                    <img
                      src={currentStory.avatarUrl}
                      alt={currentStory.candidateName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-blue-900/90 text-center py-0.5 text-[9px] font-bold tracking-wider text-blue-200 uppercase font-outfit">
                      Placed
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight font-heading">
                      {currentStory.candidateName}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-sky-400 mt-1 font-jakarta">
                      {currentStory.trade}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 pt-1 font-jakarta">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-semibold text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{currentStory.verifiedBadge}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md glass-badge-dark text-[11px] font-semibold text-blue-300">
                      <Award className="w-3.5 h-3.5" />
                      <span>{currentStory.highlightStat}</span>
                    </span>
                  </div>
                </div>

                {/* Origin & Destination Meta Box */}
                <div className="space-y-2 pt-4 border-t border-slate-700/60 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Origin: <strong className="text-white">{currentStory.hometown}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Project: <strong className="text-white">{currentStory.employerOrProject}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Mobilization Cycle: <strong className="text-sky-300">{currentStory.mobilizationDays} Days</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative, Quote, Star Rating & Project Context */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Rating & Placed Date */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(currentStory.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-slate-300 ml-1.5">5.0 Trade Score</span>
                    </div>

                    <span className="text-xs font-semibold text-slate-400">
                      {currentStory.datePlaced}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative pl-5 border-l-2 border-blue-500 py-1">
                    <Quote className="w-8 h-8 text-blue-400/20 absolute -top-3 -left-2 -z-10" />
                    <p className="text-sm sm:text-base text-slate-100 font-medium italic leading-relaxed">
                      "{currentStory.quote}"
                    </p>
                  </div>

                  {/* Verification Journey Description */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Deployment & Compliance Summary
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentStory.story}
                    </p>
                  </div>
                </div>

                {/* Mobilization Stats Bar & Direct Actions */}
                <div className="pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs text-slate-300 w-full sm:w-auto">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>GAMCA Cleared</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Protector Stamped</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{currentStory.contractType}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                    {onNavigateApply && (
                      <button
                        onClick={onNavigateApply}
                        className="w-full sm:w-auto min-h-[44px] px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Apply For Next Batch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {onNavigateContact && (
                      <button
                        onClick={onNavigateContact}
                        className="w-full sm:w-auto min-h-[44px] px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                      >
                        Hire Similar Crew
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots & Thumbnail Previews */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {filteredStories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}: ${story.candidateName}`}
              className={`transition-all duration-200 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 h-2.5 bg-blue-500'
                  : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
