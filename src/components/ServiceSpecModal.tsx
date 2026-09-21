import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Printer,
  ShieldCheck,
  Building2,
  FileText,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ServiceSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
}

export const ServiceSpecModal: React.FC<ServiceSpecModalProps> = ({
  isOpen,
  onClose,
  serviceTitle = 'International Manpower Mobilization & Trade Testing Services'
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 font-jakarta max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 bg-[#071E3D] text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-400" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300 font-outfit block">
                  Official Corporate Document Brief
                </span>
                <span className="text-sm sm:text-base font-bold text-white font-heading truncate">
                  {serviceTitle} - Executive Specification
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Print this specification"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
            {/* Document Brand Banner */}
            <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-cinzel">
                  AL-MANNAN ENTERPRISES
                </h2>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit block">
                  Overseas Employment Promoters & Technical Manpower Solutions
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Govt. of Pakistan BEOE Regulatory Protocol Compliant
                </span>
              </div>
              <div className="text-right text-[11px] text-slate-500 space-y-0.5">
                <div>Document ID: SPEC-2026-ALM</div>
                <div>Issue Date: Official Current Standard</div>
                <div className="font-semibold text-emerald-700">Status: Active Operating Framework</div>
              </div>
            </div>

            {/* Scope Summary */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
                1. Institutional Mandate & Scope
              </h3>
              <p className="text-slate-600">
                AL-MANNAN ENTERPRISES operates as an authorized overseas manpower recruitment organization licensed under the Emigration Ordinance of Pakistan. Our operations encompass sourcing, technical workshop verification, medical qualification (GAMCA), emigration legalities, and group flight deployments to GCC and global destinations.
              </p>
            </div>

            {/* Core Operating Divisions */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
                2. Operational Division Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-[#0A3871] font-outfit">Div 01: Overseas Recruitment</div>
                  <p className="text-slate-600 text-[11px]">
                    National sourcing of certified engineers, tradesmen, and operators across all 4 provinces of Pakistan.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-[#0A3871] font-outfit">Div 02: Technical Trade Testing</div>
                  <p className="text-slate-600 text-[11px]">
                    Hands-on testing at Islamabad/Rawalpindi workshops with ASME/AWS standards and HD video documentation.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-[#0A3871] font-outfit">Div 03: Travel & Logistics</div>
                  <p className="text-slate-600 text-[11px]">
                    Coordinated airline block ticketing, meet-and-assist airport handling, and departure briefings.
                  </p>
                </div>
              </div>
            </div>

            {/* Warranty & SLA */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A3871] font-outfit">
                <ShieldCheck className="w-4 h-4 text-[#0A3871]" />
                <span>Standard 90-Day Candidate Performance Warranty</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Under standard international recruitment agreements, if any deployed candidate is determined to be medically unfit upon arrival or technically incompetent within the first 90 days of employment, Al-Mannan Enterprises provides immediate replacement facilitation without additional recruitment agency service charges.
              </p>
            </div>

            {/* Legal Protocol */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
                3. Mandatory Client Documentation Requirements
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Power of Attorney (Wakala):</strong> Authorizing Al-Mannan Enterprises to process visas on employer behalf.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Demand Letter:</strong> Specifying job categories, basic salary, overtime, food/housing, and medical terms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Chamber & MOFA Attestation:</strong> Legal authentication by the host country Chamber of Commerce and Pakistani Embassy.</span>
                </li>
              </ul>
            </div>

            {/* Coordinates Footer */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-600 font-outfit">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0A3871]" />
                  <span>Head Office: Islamabad / Rawalpindi, Pakistan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0A3871]" />
                  <span>Email: {COMPANY_INFO.placeholders.emailInquiries}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0A3871]" />
                  <span>Phone: {COMPANY_INFO.placeholders.phonePrimary}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0A3871]" />
                  <span>Mon - Sat: 9:00 AM - 6:00 PM PKT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 font-outfit">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Specification Document</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-[#0A3871] hover:bg-[#082C59] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Close Brief
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
