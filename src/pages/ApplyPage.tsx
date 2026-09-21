import React from 'react';
import { CandidateForm } from '../components/CandidateForm';
import {
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const ApplyPage: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <section className="bg-[#0A3871] text-white py-16 sm:py-24 border-b border-[#071E3D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-200">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Pakistani Workforce Registration</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Register for Overseas Employment
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            Submit your professional profile, technical trade details, and CV for consideration across current and upcoming overseas employment contracts.
          </p>
        </div>
      </section>

      {/* Main Registration Content */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Guidance & Instructions (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871]">
                  Candidate Advisory
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  Application & Verification Notice
                </h2>
              </div>

              <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-xs space-y-3 text-xs sm:text-sm text-slate-700">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0A3871]" />
                  <span>How Candidate Selection Works</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600 pt-1">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#0A3871] shrink-0">1.</span>
                    <span>Submit your trade experience, contact details, and resume using this official portal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#0A3871] shrink-0">2.</span>
                    <span>Our document controllers review submitted credentials against active employer demand letters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#0A3871] shrink-0">3.</span>
                    <span>Shortlisted candidates are invited for technical trade testing or direct interviews at our facility.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#0A3871] shrink-0">4.</span>
                    <span>Final selections undergo medical testing, protector stamping, and flight dispatch.</span>
                  </li>
                </ul>
              </div>

              {/* Ethical Warning Box */}
              <div className="p-5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
                <div className="font-bold flex items-center gap-2 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Important Candidate Notice</span>
                </div>
                <p className="leading-relaxed text-[11px] text-amber-900">
                  AL-MANNAN ENTERPRISES operates strictly within Pakistani legal frameworks. Do not pay any money to unauthorized agents or intermediaries. Official interviews and trade tests are conducted directly at our verified facility.
                </p>
              </div>
            </div>

            {/* Right: Registration Form (7 cols) */}
            <div className="lg:col-span-7">
              <CandidateForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
