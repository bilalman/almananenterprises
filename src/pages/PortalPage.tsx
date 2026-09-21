import React from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO } from '../data/companyData';
import {
  Lock,
  Phone,
  Mail,
  ArrowLeft,
  FileCheck2
} from 'lucide-react';

export const PortalPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full py-16 sm:py-24 bg-slate-50 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-8 sm:p-10 space-y-6 text-center">
          {/* Icon */}
          <div className="w-14 h-14 rounded-md bg-[#0A3871] text-white flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0A3871] text-xs font-bold border border-blue-100 uppercase tracking-wider">
              Digital Operations Advisory
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Client & Candidate Portal
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed max-w-lg mx-auto">
              Our enterprise digital tracking system for real-time candidate mobilization status, visa processing milestones, and employer demand letters is in active deployment.
            </p>
          </div>

          {/* How to track files currently */}
          <div className="p-5 rounded-md bg-slate-50 border border-slate-200 text-left space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-[#0A3871]" />
              <span>Current Inquiries & File Status Tracking</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For immediate file status, visa endorsements, Protector of Emigrants clearance, or candidate interview arrangements, please contact our processing department directly:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-medium text-slate-800">
              <div className="p-3 rounded-md bg-white border border-slate-200 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0A3871] shrink-0" />
                <span>{COMPANY_INFO.placeholders.phonePrimary}</span>
              </div>
              <div className="p-3 rounded-md bg-white border border-slate-200 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0A3871] shrink-0" />
                <span className="truncate">{COMPANY_INFO.placeholders.emailRecruitment}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#0A3871] hover:bg-[#0B4386] text-white font-bold text-xs rounded-md transition-colors cursor-pointer"
            >
              Contact Operations Desk
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Homepage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
