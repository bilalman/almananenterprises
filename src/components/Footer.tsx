import React from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO } from '../data/companyData';
import { Logo } from './Logo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ChevronRight,
  Server
} from 'lucide-react';

interface FooterProps {
  onOpenDeploymentGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeploymentGuide }) => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#071E3D] text-slate-300 border-t border-[#0F2F5A]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" />

            <p className="text-sm text-slate-300 leading-relaxed pt-2">
              AL-MANNAN ENTERPRISES provides reliable manpower across diverse trades, ranging from qualified engineers to certified technical, semi-skilled workers, and HR specialists, dedicated to fulfilling international workforce contracts with punctuality and integrity.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0A2A54] border border-[#173F75] text-xs text-blue-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Government Regulated Overseas Recruitment</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                {COMPANY_INFO.placeholders.licenseNote}
              </p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#173F75] pb-2">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Our Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/recruitment')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Recruitment Process</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/training')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Technical Training</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/apply')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Candidate Registration</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Worker Placements & Success Stories</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Contact & Inquiry</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Main Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#173F75] pb-2">
              Business Divisions
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => navigate('/services/overseas-employment')}
                  className="hover:text-white text-left transition-colors block cursor-pointer"
                >
                  <span className="font-semibold text-white block">Overseas Employment Promoters</span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Engineers, skilled technical labor & field workforce
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/travel-tours')}
                  className="hover:text-white text-left transition-colors block cursor-pointer"
                >
                  <span className="font-semibold text-white block">Travel & Tours</span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    International flights, visa support & delegation logistics
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/training-center')}
                  className="hover:text-white text-left transition-colors block cursor-pointer"
                >
                  <span className="font-semibold text-white block">Technical Trade Test Center</span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Practical 6G welding, electrical, HVAC & civil trade evaluation
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#173F75] pb-2">
              Head Office (Lahore, Pakistan)
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 leading-relaxed block font-medium">
                    {COMPANY_INFO.placeholders.address}
                  </span>
                  <a
                    href={COMPANY_INFO.placeholders.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sky-300 hover:text-white font-semibold underline underline-offset-2 mt-1.5"
                  >
                    <span>Open in Google Maps ↗</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Primary Contact:</span>
                    <a
                      href={`tel:${COMPANY_INFO.placeholders.phonePrimary.replace(/[^0-9]/g, '')}`}
                      className="text-white hover:text-sky-300 font-bold transition-colors"
                    >
                      {COMPANY_INFO.placeholders.phonePrimary}
                    </a>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Operations Desk:</span>
                    <a
                      href={`tel:${COMPANY_INFO.placeholders.phoneSecondary.replace(/[^0-9]/g, '')}`}
                      className="text-white hover:text-sky-300 font-bold transition-colors"
                    >
                      {COMPANY_INFO.placeholders.phoneSecondary}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.placeholders.emailInquiries}`}
                  className="text-white hover:text-sky-300 transition-colors"
                >
                  {COMPANY_INFO.placeholders.emailInquiries}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{COMPANY_INFO.placeholders.businessHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="bg-[#05152B] border-t border-[#0F2F5A] py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © 2026 AL MANNAN ENTERPRISES. All rights reserved. | <a href="https://almannanenterprises.com" className="hover:text-slate-200">almannanenterprises.com</a>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button
              onClick={() => navigate('/portal')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Client & Candidate Portal
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => navigate('/contact')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Employer Inquiries
            </button>
            {onOpenDeploymentGuide && (
              <>
                <span className="text-slate-700">•</span>
                <button
                  onClick={onOpenDeploymentGuide}
                  className="text-blue-300 hover:text-white flex items-center gap-1 font-medium underline underline-offset-4 cursor-pointer"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Hosting & Deployment Info</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
