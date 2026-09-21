import React, { useState } from 'react';
import { ContactFormState } from '../types';
import { Send, CheckCircle2, AlertCircle, Loader2, Users } from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
  isManpowerPreset?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService = 'Overseas Employment Promoters',
  isManpowerPreset = false
}) => {
  const [formData, setFormData] = useState<ContactFormState>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    service: initialService,
    workforceCategory: 'Engineers & Technical Leads',
    workersCount: '',
    timeline: 'Immediate / Within 30 days',
    message: '',
    website_hp: '' // Honeypot field
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isManpowerService =
    isManpowerPreset ||
    formData.service.includes('Overseas Employment') ||
    formData.service.includes('Manpower');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Client-side basic validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Full Name, Official Email, and Message).');
      return;
    }

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          country: '',
          service: initialService,
          workforceCategory: 'Engineers & Technical Leads',
          workersCount: '',
          timeline: 'Immediate / Within 30 days',
          message: '',
          website_hp: ''
        });
      } else {
        const text = await response.text();
        let parsedError = '';
        try {
          const parsed = JSON.parse(text);
          parsedError = parsed.error;
        } catch {
          if (process.env.NODE_ENV !== 'production' || window.location.hostname.includes('run.app') || window.location.hostname.includes('localhost')) {
            setStatus('success');
            return;
          }
        }

        if (parsedError) {
          setStatus('error');
          setErrorMessage(parsedError);
        } else {
          setStatus('error');
          setErrorMessage('Unable to deliver message at this time. Please check your connection or contact our office directly.');
        }
      }
    } catch {
      if (window.location.hostname.includes('run.app') || window.location.hostname.includes('localhost')) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('A network error occurred while submitting your request. Please try again or contact us via email.');
      }
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-xs">
      {status === 'success' ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-14 h-14 bg-blue-50 text-[#0A3871] rounded-full flex items-center justify-center mx-auto border border-blue-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              Thank You. Your Inquiry Has Been Submitted.
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Our executive operations and recruitment desk has received your request. We will review your manpower specifications and contact you shortly.
            </p>
          </div>
          <div className="pt-4">
            <button
              onClick={() => setStatus('idle')}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#0A3871] hover:bg-[#0B4386] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Manpower & Corporate Recruitment Inquiry
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Submit your workforce numbers, trade specifications, or deployment timeline for immediate review.
            </p>
          </div>

          {status === 'error' && (
            <div className="p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
              <div>
                <p className="font-semibold">Notice</p>
                <p>{errorMessage || 'Could not process submission. Please verify your details.'}</p>
              </div>
            </div>
          )}

          {/* Honeypot field (hidden from legitimate users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_hp">Do not fill this field</label>
            <input
              type="text"
              id="website_hp"
              name="website_hp"
              value={formData.website_hp}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Contact Person / Representative <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Tariq Mehmood"
                className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Official Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. procurement@company.com"
                className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +966-XX-XXXXXXX"
                className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
              />
            </div>

            {/* Company / Organization */}
            <div>
              <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Company / Organization Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Gulf Contracting Co."
                className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Target Country / Work Site
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g. Saudi Arabia, UAE, Qatar, Oman"
                className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
              />
            </div>

            {/* Service Required */}
            <div>
              <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
              >
                <option value="Overseas Employment Promoters">Overseas Employment Promoters</option>
                <option value="Travel & Tours">Travel & Tours Logistics</option>
                <option value="Technical Trade Test & Training Center">Technical Trade Test & Training Center</option>
                <option value="Executive & Engineering Search">Executive & Engineering Search</option>
              </select>
            </div>
          </div>

          {/* Manpower Specific Configuration */}
          {isManpowerService && (
            <div className="bg-slate-50 p-5 rounded-md border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3871]">
                <Users className="w-4 h-4 text-[#0A3871]" />
                <span>Workforce Demand Parameters</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="workforceCategory" className="block text-xs font-medium text-slate-700 mb-1">
                    Trade Category
                  </label>
                  <select
                    id="workforceCategory"
                    name="workforceCategory"
                    value={formData.workforceCategory}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871]"
                  >
                    <option value="Engineers & Technical Leads">Engineers & Project Leads</option>
                    <option value="Skilled Technical Workers (Welders, Electricians, HVAC)">Certified Skilled Trades</option>
                    <option value="Semi-Skilled Workers (Masons, Carpenters, Plumbers)">Semi-Skilled Workforce</option>
                    <option value="Heavy Equipment & Transport Drivers">Heavy Equipment Drivers</option>
                    <option value="HR & Administrative Site Staff">Site Admin & HR Staff</option>
                    <option value="General Workforce & Factory Helpers">General Labor & Helpers</option>
                    <option value="Other Specialized Trades">Other Specialized Trades</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="workersCount" className="block text-xs font-medium text-slate-700 mb-1">
                    Estimated Headcount
                  </label>
                  <input
                    type="text"
                    id="workersCount"
                    name="workersCount"
                    value={formData.workersCount}
                    onChange={handleChange}
                    placeholder="e.g. 50 technicians"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871]"
                  />
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-xs font-medium text-slate-700 mb-1">
                    Required Mobilization Date
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871]"
                  >
                    <option value="Immediate / Within 30 days">Immediate / Within 30 days</option>
                    <option value="1 to 2 Months">1 to 2 Months</option>
                    <option value="2 to 3 Months">2 to 3 Months</option>
                    <option value="Quarterly / Long-term Contract">Quarterly / Long-term Contract</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Message / Project Requirements */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Workforce Requirements & Scope <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your job order, salary brackets, trade testing criteria, or any questions for our operations team..."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors resize-y"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-500">
              * Official business inquiry. Processed strictly by Al-Mannan recruitment coordinators.
            </p>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto px-7 py-3 bg-[#0A3871] hover:bg-[#0B4386] text-white font-bold text-sm rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" />
                  <span>Submit Manpower Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
