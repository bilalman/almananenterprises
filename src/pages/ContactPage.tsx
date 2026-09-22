import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { InteractiveGoogleMap } from '../components/InteractiveGoogleMap';
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
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                      <MapPin className="w-4 h-4 text-[#0A3871]" />
                      <span>Head Office Location</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Lahore, Pakistan
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                      {COMPANY_INFO.placeholders.address}
                    </p>
                    <p className="text-xs text-slate-500">
                      Near Suzuki Showroom, Main GT Road, Baghbanpura, Lahore (Punjab), Pakistan
                    </p>
                  </div>

                  <div className="pt-1">
                    <a
                      href={COMPANY_INFO.placeholders.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0A3871] hover:bg-[#071E3D] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-300" />
                      <span>Open in Google Maps / Directions ↗</span>
                    </a>
                  </div>
                </div>

                {/* Telephone / WhatsApp */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <Phone className="w-4 h-4 text-[#0A3871]" />
                    <span>Official Helplines & WhatsApp</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Primary Hotline
                      </div>
                      <div className="text-base font-black text-slate-900">
                        {COMPANY_INFO.placeholders.phonePrimary}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`tel:${COMPANY_INFO.placeholders.phonePrimary.replace(/[^0-9]/g, '')}`}
                          className="text-[11px] font-bold text-[#0A3871] hover:underline"
                        >
                          Direct Call
                        </a>
                        <span className="text-slate-300">•</span>
                        <a
                          href={`https://wa.me/${COMPANY_INFO.placeholders.phonePrimaryRaw}?text=Hello%20AL%20MANNAN%20ENTERPRISES,%20I%20have%20an%20inquiry`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-emerald-600 hover:underline"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Operations Desk
                      </div>
                      <div className="text-base font-black text-slate-900">
                        {COMPANY_INFO.placeholders.phoneSecondary}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`tel:${COMPANY_INFO.placeholders.phoneSecondary.replace(/[^0-9]/g, '')}`}
                          className="text-[11px] font-bold text-[#0A3871] hover:underline"
                        >
                          Direct Call
                        </a>
                        <span className="text-slate-300">•</span>
                        <a
                          href={`https://wa.me/${COMPANY_INFO.placeholders.phoneSecondaryRaw}?text=Hello%20AL%20MANNAN%20ENTERPRISES,%20I%20have%20an%20inquiry`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-emerald-600 hover:underline"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">
                    Direct recruitment desk, client coordination, and trade testing inquiries.
                  </p>
                </div>

                {/* Official Emails & Website */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <Mail className="w-4 h-4 text-[#0A3871]" />
                    <span>Official Email & Web Portal</span>
                  </div>
                  <div className="space-y-1.5 text-sm font-semibold pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-normal">Official Inquiries:</span>
                      <a
                        href={`mailto:${COMPANY_INFO.placeholders.emailInquiries}`}
                        className="text-[#0A3871] hover:underline font-bold"
                      >
                        {COMPANY_INFO.placeholders.emailInquiries}
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-normal">Official Domain:</span>
                      <a
                        href={COMPANY_INFO.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-900 hover:text-[#0A3871] font-bold"
                      >
                        {COMPANY_INFO.domain}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
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

      {/* Interactive Google Map & Location Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3871] mb-1">
                <MapPin className="w-4 h-4" />
                <span>Geographic Coordinates & Directions</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Visit Our Office on Main GT Road, Lahore
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Conveniently located at Akhri Mint College Stop, Near Suzuki Showroom, Main GT Road, Baghbanpura, Lahore. Accessible for both foreign employer delegations and candidate trade evaluations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={COMPANY_INFO.placeholders.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-[#0A3871] hover:bg-[#071E3D] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>Open in Google Maps App ↗</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.placeholders.phonePrimary.replace(/[^0-9]/g, '')}`}
                className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors border border-slate-200"
              >
                <Phone className="w-4 h-4 text-[#0A3871]" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Component */}
          <InteractiveGoogleMap />
        </div>
      </section>
    </div>
  );
};
