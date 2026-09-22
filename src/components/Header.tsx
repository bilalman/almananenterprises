import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';
import { Logo } from './Logo';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="w-full glass-header sticky top-0 z-50 transition-colors">
      {/* Top Corporate Strip */}
      <div className="bg-[#0A3871] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5 text-slate-200">
            <a
              href={COMPANY_INFO.placeholders.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Open Google Maps Location"
            >
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Lahore, Pakistan (Main GT Road)</span>
            </a>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${COMPANY_INFO.placeholders.phonePrimary.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{COMPANY_INFO.placeholders.phonePrimary}</span>
              </a>
              <span className="text-blue-300/60">/</span>
              <a
                href={`tel:${COMPANY_INFO.placeholders.phoneSecondary.replace(/[^0-9]/g, '')}`}
                className="hover:text-white transition-colors text-slate-300 font-medium"
              >
                <span>{COMPANY_INFO.placeholders.phoneSecondary}</span>
              </a>
            </div>
            <a
              href={`mailto:${COMPANY_INFO.placeholders.emailInquiries}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{COMPANY_INFO.placeholders.emailInquiries}</span>
            </a>
          </div>

          <div className="flex items-center gap-5 text-slate-200 font-outfit">
            <span className="text-xs text-blue-200 font-medium">
              BEOE Regulated Overseas Employment Promoters
            </span>
            <div className="h-3.5 w-px bg-blue-800/80"></div>
            <button
              onClick={() => handleNavClick('/portal')}
              className="hover:text-white transition-colors text-xs font-semibold cursor-pointer"
            >
              Portal Login
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center text-left focus:outline-hidden cursor-pointer"
            aria-label="Al-Mannan Enterprises Home"
          >
            <Logo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-outfit">
            <button
              onClick={() => handleNavClick('/')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-smooth cursor-pointer ${
                isActive('/') && currentPath === '/'
                  ? 'text-[#0A3871] bg-slate-100/90 font-bold'
                  : 'text-slate-700 hover:text-[#0A3871] hover:bg-slate-100/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('/about')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-smooth cursor-pointer ${
                isActive('/about')
                  ? 'text-[#0A3871] bg-slate-100/90 font-bold'
                  : 'text-slate-700 hover:text-[#0A3871] hover:bg-slate-100/60'
              }`}
            >
              About
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('/services')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-smooth cursor-pointer ${
                  isActive('/services')
                    ? 'text-[#0A3871] bg-slate-100/90 font-bold'
                    : 'text-slate-700 hover:text-[#0A3871] hover:bg-slate-100/60'
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 mt-1.5 w-72 glass-dropdown rounded-xl shadow-xl border border-slate-200/90 py-2.5 z-50"
                  >
                    <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                      Areas of Operation
                    </div>
                    <button
                      onClick={() => handleNavClick('/services/overseas-employment')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-800 hover:bg-blue-50/80 hover:text-[#0A3871] flex flex-col transition-colors cursor-pointer"
                    >
                      <span className="font-semibold">Overseas Employment</span>
                      <span className="text-xs text-slate-500">
                        Engineering, technical & skilled recruitment
                      </span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/services/travel-tours')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-800 hover:bg-blue-50/80 hover:text-[#0A3871] flex flex-col transition-colors cursor-pointer"
                    >
                      <span className="font-semibold">Travel & Tours</span>
                      <span className="text-xs text-slate-500">
                        Flight ticketing & deployment logistics
                      </span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/services/training-center')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-800 hover:bg-blue-50/80 hover:text-[#0A3871] flex flex-col transition-colors cursor-pointer"
                    >
                      <span className="font-semibold">Technical Trade Testing</span>
                      <span className="text-xs text-slate-500">
                        Skill verification & candidate evaluation
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleNavClick('/recruitment')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-smooth cursor-pointer ${
                isActive('/recruitment')
                  ? 'text-[#0A3871] bg-slate-100/90 font-bold'
                  : 'text-slate-700 hover:text-[#0A3871] hover:bg-slate-100/60'
              }`}
            >
              Recruitment Process
            </button>

            <button
              onClick={() => handleNavClick('/training')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-smooth cursor-pointer ${
                isActive('/training')
                  ? 'text-[#0A3871] bg-slate-100/90 font-bold'
                  : 'text-slate-700 hover:text-[#0A3871] hover:bg-slate-100/60'
              }`}
            >
              Training Center
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-smooth cursor-pointer ${
                isActive('/contact')
                  ? 'text-[#0A3871] bg-slate-100/90 font-bold'
                  : 'text-slate-700 hover:text-[#0A3871] hover:bg-slate-100/60'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action: Request Manpower Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/apply')}
              className="text-xs font-semibold text-slate-600 hover:text-[#0A3871] px-3 py-2 transition-smooth cursor-pointer"
            >
              For Candidates
            </button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('/contact')}
              className="bg-[#0A3871] hover:bg-[#0B4386] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-smooth flex items-center gap-2 cursor-pointer font-outfit"
            >
              <span>Request Manpower</span>
              <ArrowRight className="w-4 h-4 opacity-85" />
            </motion.button>
          </div>

          {/* Mobile Quick Action & Menu Button */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
            <a
              href={`tel:${COMPANY_INFO.placeholders.phonePrimary.replace(/\s+/g, '')}`}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 hover:text-[#0A3871] rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Direct Call"
            >
              <Phone className="w-4 h-4 text-[#0A3871]" />
            </a>
            <button
              onClick={() => handleNavClick('/contact')}
              className="min-h-[44px] px-3 sm:px-3.5 bg-[#0A3871] hover:bg-[#082C59] text-white text-xs font-bold rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            >
              Inquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-hidden transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden glass-dropdown border-b border-slate-200/90 px-4 pt-2 pb-6 space-y-1.5 overflow-hidden shadow-xl"
          >
            <button
              onClick={() => handleNavClick('/')}
              className={`w-full text-left px-3.5 min-h-[44px] flex items-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                isActive('/') && currentPath === '/' ? 'bg-slate-100 text-[#0A3871] font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('/about')}
              className={`w-full text-left px-3.5 min-h-[44px] flex items-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                isActive('/about') ? 'bg-slate-100 text-[#0A3871] font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('/services')}
              className={`w-full text-left px-3.5 min-h-[44px] flex items-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                isActive('/services') ? 'bg-slate-100 text-[#0A3871] font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => handleNavClick('/services/overseas-employment')}
              className="w-full text-left pl-6 pr-3 min-h-[40px] flex items-center text-xs font-medium text-slate-600 hover:text-[#0A3871] hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
            >
              • Overseas Employment Promotion
            </button>
            <button
              onClick={() => handleNavClick('/services/travel-tours')}
              className="w-full text-left pl-6 pr-3 min-h-[40px] flex items-center text-xs font-medium text-slate-600 hover:text-[#0A3871] hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
            >
              • Travel & Tours Logistics
            </button>
            <button
              onClick={() => handleNavClick('/services/training-center')}
              className="w-full text-left pl-6 pr-3 min-h-[40px] flex items-center text-xs font-medium text-slate-600 hover:text-[#0A3871] hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
            >
              • Technical Trade Testing Center
            </button>

            <div className="border-t border-slate-100 my-2"></div>

            <button
              onClick={() => handleNavClick('/recruitment')}
              className={`w-full text-left px-3.5 min-h-[44px] flex items-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                isActive('/recruitment') ? 'bg-slate-100 text-[#0A3871] font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Recruitment Process
            </button>
            <button
              onClick={() => handleNavClick('/training')}
              className={`w-full text-left px-3.5 min-h-[44px] flex items-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                isActive('/training') ? 'bg-slate-100 text-[#0A3871] font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Technical Training Center
            </button>
            <button
              onClick={() => handleNavClick('/apply')}
              className={`w-full text-left px-3.5 min-h-[44px] flex items-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                isActive('/apply') ? 'bg-slate-100 text-[#0A3871] font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Candidate Registration
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className={`w-full text-left px-3.5 min-h-[44px] flex items-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                isActive('/contact') ? 'bg-slate-100 text-[#0A3871] font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Contact & Office Details
            </button>
            <button
              onClick={() => handleNavClick('/portal')}
              className="w-full text-left px-3.5 min-h-[44px] flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              Client / Candidate Portal
            </button>

            <div className="pt-3">
              <button
                onClick={() => handleNavClick('/contact')}
                className="w-full min-h-[48px] bg-[#0A3871] hover:bg-[#082C59] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>Request Manpower</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Contact & Location Card */}
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs space-y-2 text-slate-600">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0A3871]" />
                <span>Head Office: Lahore, Pakistan</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                PLAZA 315/A, 3rd Floor, Akhri Mint College Stop, Near Suzuki Showroom, Main GT Road, Baghbanpura, Lahore
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`tel:${COMPANY_INFO.placeholders.phonePrimary.replace(/[^0-9]/g, '')}`}
                  className="font-bold text-[#0A3871] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-[#0A3871]" />
                  <span>{COMPANY_INFO.placeholders.phonePrimary}</span>
                </a>
                <span className="text-slate-300">|</span>
                <a
                  href={`tel:${COMPANY_INFO.placeholders.phoneSecondary.replace(/[^0-9]/g, '')}`}
                  className="font-semibold text-slate-700 hover:underline"
                >
                  <span>{COMPANY_INFO.placeholders.phoneSecondary}</span>
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={COMPANY_INFO.placeholders.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A3871] hover:underline"
                >
                  <span>📍 View Location on Google Maps</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
