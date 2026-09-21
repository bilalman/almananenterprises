import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { COMPANY_INFO } from '../data/companyData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Building2,
  MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <section className="bg-[#0A3871] text-white py-16 sm:py-24 border-b border-[#071E3D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-200">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Corporate Coordination</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Contact & Manpower Inquiries
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            Connect with our recruitment operations desk, request custom manpower solutions, or arrange trade testing sessions at our facilities in Pakistan.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Information (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871]">
                  Head Office
                </span>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">
                  Direct Inquiries & Office Coordinates
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our operational team is available during standard business hours to assist employers and partners worldwide.
                </p>
              </div>

              {/* Verified Contact Details Cards */}
              <div className="space-y-4 pt-2">
                {/* Office Location */}
                <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <MapPin className="w-4 h-4 text-[#0A3871]" />
                    <span>Office Location</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 pt-1">
                    {COMPANY_INFO.placeholders.address}
                  </p>
                  <p className="text-xs text-slate-500">
                    {COMPANY_INFO.placeholders.cityCountry}
                  </p>
                </div>

                {/* Telephone / WhatsApp */}
                <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <Phone className="w-4 h-4 text-[#0A3871]" />
                    <span>Telephone Numbers</span>
                  </div>
                  <div className="space-y-0.5 text-sm font-semibold text-slate-900 pt-1">
                    <div>Primary: {COMPANY_INFO.placeholders.phonePrimary}</div>
                    <div>Operations: {COMPANY_INFO.placeholders.phoneSecondary}</div>
                  </div>
                  <p className="text-xs text-slate-500">
                    Direct recruitment desk & client coordination line
                  </p>
                </div>

                {/* Official Emails */}
                <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <Mail className="w-4 h-4 text-[#0A3871]" />
                    <span>Official Email Addresses</span>
                  </div>
                  <div className="space-y-0.5 text-sm font-semibold text-[#0A3871] pt-1">
                    <div>General Inquiries: {COMPANY_INFO.placeholders.emailInquiries}</div>
                    <div>Recruitment Desk: {COMPANY_INFO.placeholders.emailRecruitment}</div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <Clock className="w-4 h-4 text-[#0A3871]" />
                    <span>Working Hours</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 pt-1">
                    {COMPANY_INFO.placeholders.businessHours}
                  </p>
                  <p className="text-xs text-slate-500">
                    Pakistan Standard Time (GMT+5)
                  </p>
                </div>
              </div>

              {/* Regulatory Notice */}
              <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 mb-0.5">
                    Regulatory Compliance & Licensing
                  </span>
                  <span>{COMPANY_INFO.placeholders.licenseNote}</span>
                </div>
              </div>
            </div>

            {/* Right: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
