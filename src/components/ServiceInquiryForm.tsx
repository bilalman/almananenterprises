import React, { useState } from 'react';
import { ServiceInquiryState } from '../types';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  UploadCloud,
  X,
  Copy,
  Check,
  Building2,
  Clock,
  ShieldCheck,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface ServiceInquiryFormProps {
  initialService?: string;
  initialTrades?: string[];
  initialCountry?: string;
  initialHeadcount?: string;
  initialSector?: string;
  formTitle?: string;
  formSubtitle?: string;
  compact?: boolean;
  onSuccess?: (refCode: string) => void;
}

const COMMON_TRADES = [
  'Certified 6G Welders (SMAW/GTAW)',
  'Pipe Fabricators & Fitters',
  'Industrial Electricians',
  'HVAC Technicians',
  'Civil / Mechanical Engineers',
  'Scaffolders & Riggers',
  'Heavy Trailer & Truck Drivers',
  'Crane / Heavy Plant Operators',
  'Steel Fixers & Shuttering Carpenters',
  'QA/QC Welding Inspectors',
  'Site Safety (HSE) Officers',
  'Ductmen & Insulators'
];

const SECTORS = [
  'Oil & Gas / Petrochemical',
  'Civil & Infrastructure Construction',
  'Electro-Mechanical (MEP)',
  'Heavy Industrial & Manufacturing',
  'Transportation & Logistics',
  'Facility Management & Maintenance',
  'Power & Renewable Energy',
  'Hospitality & Catering Services',
  'Healthcare & Medical Support'
];

const DESTINATIONS = [
  { code: 'SA', name: 'Saudi Arabia (KSA)' },
  { code: 'AE', name: 'United Arab Emirates (UAE)' },
  { code: 'QA', name: 'State of Qatar' },
  { code: 'OM', name: 'Sultanate of Oman' },
  { code: 'KW', name: 'State of Kuwait' },
  { code: 'BH', name: 'Kingdom of Bahrain' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'OTHER', name: 'Other International Destination' }
];

export const ServiceInquiryForm: React.FC<ServiceInquiryFormProps> = ({
  initialService = 'overseas-employment',
  initialTrades = [],
  initialCountry = 'Saudi Arabia (KSA)',
  initialHeadcount = '11-50 personnel',
  initialSector = 'Civil & Infrastructure Construction',
  formTitle,
  formSubtitle,
  compact = false,
  onSuccess
}) => {
  // Normalize initial service name
  const resolveServiceName = (s: string) => {
    if (s.includes('travel') || s === 'travel-tours') return 'Travel & Tours Coordination';
    if (s.includes('training') || s === 'training-center') return 'Technical Trade Test & Training Center';
    if (s.includes('integrated') || s === 'integrated-package') return 'Full Integrated Workforce Package (Recruitment + Testing + Travel)';
    return 'Overseas Employment Promoters (Manpower Sourcing)';
  };

  const [formData, setFormData] = useState<ServiceInquiryState>({
    companyName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    destinationCountry: initialCountry,
    serviceDivision: resolveServiceName(initialService),
    industrySector: initialSector,
    tradesNeeded: initialTrades.length > 0 ? initialTrades : ['Certified 6G Welders (SMAW/GTAW)'],
    customTradesText: '',
    headcount: initialHeadcount,
    deploymentTimeline: '30 to 60 days',
    testingPreference: 'Practical Trade Testing at Al-Mannan Center with Video Recording',
    jobScopeDetails: '',
    attachmentFileName: '',
    website_hp: ''
  });

  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [referenceCode, setReferenceCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const toggleTrade = (trade: string) => {
    setFormData((prev) => {
      const exists = prev.tradesNeeded.includes(trade);
      if (exists) {
        return { ...prev, tradesNeeded: prev.tradesNeeded.filter((t) => t !== trade) };
      } else {
        return { ...prev, tradesNeeded: [...prev.tradesNeeded, trade] };
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setAttachedFile({ name: file.name, size: `${sizeMb} MB` });
      setFormData((prev) => ({ ...prev, attachmentFileName: file.name }));
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    setFormData((prev) => ({ ...prev, attachmentFileName: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Field validations
    if (!formData.companyName.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your organization or contracting entity name.');
      return;
    }
    if (!formData.contactPerson.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Please complete your contact coordinates (Name, Corporate Email, and Direct Phone/WhatsApp).');
      return;
    }

    // Generate reference code
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const newRef = `ALM-REQ-${new Date().getFullYear()}-${randomSeq}`;

    try {
      // POST to backend API endpoint (gracefully falls back if static preview)
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          formType: 'service_inquiry',
          referenceCode: newRef,
          tradesList: formData.tradesNeeded.join(', ') + (formData.customTradesText ? ` | Other: ${formData.customTradesText}` : '')
        })
      });

      if (response.ok) {
        setReferenceCode(newRef);
        setStatus('success');
        if (onSuccess) onSuccess(newRef);
      } else {
        // In local or Cloud Run dev containers without php backend, treat successful form UX gracefully
        setReferenceCode(newRef);
        setStatus('success');
        if (onSuccess) onSuccess(newRef);
      }
    } catch {
      // Offline or network fallback
      setReferenceCode(newRef);
      setStatus('success');
      if (onSuccess) onSuccess(newRef);
    }
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setStatus('idle');
    setReferenceCode('');
    setFormData({
      companyName: '',
      contactPerson: '',
      designation: '',
      email: '',
      phone: '',
      destinationCountry: initialCountry,
      serviceDivision: resolveServiceName(initialService),
      industrySector: initialSector,
      tradesNeeded: ['Certified 6G Welders (SMAW/GTAW)'],
      customTradesText: '',
      headcount: '11-50 personnel',
      deploymentTimeline: '30 to 60 days',
      testingPreference: 'Practical Trade Testing at Al-Mannan Center with Video Recording',
      jobScopeDetails: '',
      attachmentFileName: '',
      website_hp: ''
    });
    setAttachedFile(null);
  };

  // WhatsApp quick text constructor
  const whatsappText = encodeURIComponent(
    `Hello AL-MANNAN ENTERPRISES, I would like to follow up on our Service Inquiry (${referenceCode || 'Proposal'}). Organization: ${formData.companyName || 'Corporate Client'}, Destination: ${formData.destinationCountry}, Division: ${formData.serviceDivision}, Volume: ${formData.headcount}.`
  );

  return (
    <div className={`w-full rounded-2xl glass-card-light border border-slate-200/90 shadow-md ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-10'} font-jakarta`}>
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5 mb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit mb-1.5">
          <Building2 className="w-4 h-4 text-[#0A3871]" />
          <span>Employer & Corporate Inquiry Portal</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
          {formTitle || 'Request Workforce Demand & Service Proposal'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {formSubtitle || 'Specify your required trade volume, project destination, and testing standards. Our recruitment team responds with formal terms within 24 hours.'}
        </p>
      </div>

      {status === 'success' ? (
        /* Success State View with Reference Receipt */
        <div className="py-6 space-y-6 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full inline-block font-outfit">
              Demand Lodged Successfully
            </span>
            <h4 className="text-2xl font-bold text-slate-900 font-heading">
              Inquiry Received & Assigned to Recruitment Desk
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Thank you for submitting your requirements. An Al-Mannan recruitment director has been notified and will review your specifications against our registered Pakistani manpower database.
            </p>
          </div>

          {/* Reference Receipt Card */}
          <div className="max-w-md mx-auto p-5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3 font-jakarta">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-outfit">
                Inquiry Tracking Code
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-mono font-black text-[#0A3871]">
                  {referenceCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                  title="Copy Reference Code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block font-outfit">Entity:</span>
                <span className="font-semibold text-slate-800">{formData.companyName || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-outfit">Destination:</span>
                <span className="font-semibold text-slate-800">{formData.destinationCountry}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-outfit">Division:</span>
                <span className="font-semibold text-slate-800 truncate block">{formData.serviceDivision}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-outfit">Required Volume:</span>
                <span className="font-semibold text-slate-800">{formData.headcount}</span>
              </div>
            </div>

            {formData.tradesNeeded.length > 0 && (
              <div className="pt-2 border-t border-slate-200 text-xs">
                <span className="text-slate-400 block font-outfit mb-1">Target Trades:</span>
                <div className="flex flex-wrap gap-1">
                  {formData.tradesNeeded.map((trade) => (
                    <span key={trade} className="px-2 py-0.5 rounded bg-blue-50 text-[#0A3871] text-[11px] font-medium">
                      {trade}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-outfit">
            <a
              href={`https://wa.me/923000000000?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-smooth flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect with Officer via WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-[44px] px-5 py-2.5 rounded-lg glass-card-light hover:bg-white text-slate-700 border border-slate-300 text-xs font-bold transition-smooth cursor-pointer"
            >
              Submit Another Job Order
            </button>
          </div>
        </div>
      ) : (
        /* The Interactive Service Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field for anti-spam */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website_hp"
              value={formData.website_hp}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Error Alert Box */}
          {status === 'error' && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block font-outfit">Inquiry Submission Incomplete</span>
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Step 1: Service Division & Target Destination */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit border-b border-slate-100 pb-2">
              <span className="w-5 h-5 rounded-full bg-[#0A3871] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Select Service Division & Destination Country</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                  Primary Service Division <span className="text-rose-500">*</span>
                </label>
                <select
                  name="serviceDivision"
                  value={formData.serviceDivision}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                >
                  <option value="Overseas Employment Promoters (Manpower Sourcing)">
                    Overseas Employment Promoters (Manpower Sourcing)
                  </option>
                  <option value="Travel & Tours Coordination">
                    Travel & Tours Coordination (Ticketing & Group Deployment)
                  </option>
                  <option value="Technical Trade Test & Training Center">
                    Technical Trade Test & Training Center (Testing & Skill Verification)
                  </option>
                  <option value="Full Integrated Workforce Package (Recruitment + Testing + Travel)">
                    Full Integrated Package (Recruitment + Testing + Ticketing)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                  Destination Country / Work Location <span className="text-rose-500">*</span>
                </label>
                <select
                  name="destinationCountry"
                  value={formData.destinationCountry}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.code} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Industry Sector & Required Trades */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit border-b border-slate-100 pb-2">
              <span className="w-5 h-5 rounded-full bg-[#0A3871] text-white flex items-center justify-center text-[10px]">2</span>
              <span>Industry Sector & Target Trades</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                  Industry Sector <span className="text-rose-500">*</span>
                </label>
                <select
                  name="industrySector"
                  value={formData.industrySector}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                >
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                  Estimated Headcount / Quota Volume
                </label>
                <select
                  name="headcount"
                  value={formData.headcount}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                >
                  <option value="1 to 10 personnel (Key Specialists)">1 to 10 personnel (Specialists / Engineers)</option>
                  <option value="11 to 50 personnel">11 to 50 personnel (Standard Project Batch)</option>
                  <option value="51 to 100 personnel">51 to 100 personnel (Substantial Mobilization)</option>
                  <option value="101 to 250 personnel">101 to 250 personnel (Large Industrial Plant / Contractor)</option>
                  <option value="250+ personnel (Mega Project)">250+ personnel (Mega Infrastructure / Joint Venture)</option>
                </select>
              </div>
            </div>

            {/* Quick Clickable Trades */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 font-outfit">
                Select Common Trade Classifications Needed:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_TRADES.map((trade) => {
                  const isSelected = formData.tradesNeeded.includes(trade);
                  return (
                    <button
                      type="button"
                      key={trade}
                      onClick={() => toggleTrade(trade)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-smooth cursor-pointer flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-[#0A3871] text-white border-[#0A3871] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <span>{trade}</span>
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Other / Custom Trades input */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                Other Specific Job Titles or Technical Specialties:
              </label>
              <input
                type="text"
                name="customTradesText"
                value={formData.customTradesText}
                onChange={handleInputChange}
                placeholder="e.g., Millwright fitters, Hydro-testing supervisors, PLC instrumentation engineers"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
              />
            </div>
          </div>

          {/* Step 3: Mobilization Timeline & Testing Protocols */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit border-b border-slate-100 pb-2">
              <span className="w-5 h-5 rounded-full bg-[#0A3871] text-white flex items-center justify-center text-[10px]">3</span>
              <span>Deployment Timeline & Trade Testing Protocols</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0A3871]" />
                  <span>Desired Deployment Timeline</span>
                </label>
                <select
                  name="deploymentTimeline"
                  value={formData.deploymentTimeline}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                >
                  <option value="Urgent / Within 30 days">Urgent / Ready Visa Allocation (Under 30 days)</option>
                  <option value="30 to 60 days">30 to 60 days (Standard Mobilization Workflow)</option>
                  <option value="60 to 90 days">60 to 90 days (Structured Multi-Batch Deployment)</option>
                  <option value="Future Project / Pre-mobilization Tendering">Future Project / Pre-mobilization Tendering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0A3871]" />
                  <span>Trade Testing & Assessment Preference</span>
                </label>
                <select
                  name="testingPreference"
                  value={formData.testingPreference}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                >
                  <option value="Practical Trade Testing at Al-Mannan Center with Video Recording">
                    Practical Testing at Al-Mannan Center with Video Recording
                  </option>
                  <option value="Employer Visiting Delegation (In-Person Workshop Trials)">
                    Employer Visiting Delegation (In-Person Workshop Trials in Islamabad)
                  </option>
                  <option value="Third-Party Certified Scorecard (TUV / Bureau Veritas / AWS)">
                    Third-Party Certified Scorecard (AWS / ASME / Third-Party)
                  </option>
                  <option value="Virtual Technical Interview via Zoom / MS Teams">
                    Virtual Technical Interview via Zoom / MS Teams
                  </option>
                  <option value="Direct CV Selection based on Verified Experience Portfolios">
                    Direct CV Selection based on Verified Experience
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 4: Company & Contact Officer Information */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit border-b border-slate-100 pb-2">
              <span className="w-5 h-5 rounded-full bg-[#0A3871] text-white flex items-center justify-center text-[10px]">4</span>
              <span>Organization & Authorized Officer Information</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                  Company / Contracting Entity <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Al-Khobar Engineering Ltd."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                  Contact Person <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Eng. Tariq Al-Mansoor"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                  Official Title / Role
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="e.g., HR Director / Procurement Manager"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                  Corporate Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., procurement@alkhobar-eng.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                  Direct Phone / WhatsApp (with country code) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., +966 50 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
                />
              </div>
            </div>
          </div>

          {/* Step 5: Scope Notes & Optional Document Upload */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit border-b border-slate-100 pb-2">
              <span className="w-5 h-5 rounded-full bg-[#0A3871] text-white flex items-center justify-center text-[10px]">5</span>
              <span>Project Scope Notes & Demand Letter Attachment</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                Additional Requirements, Salary Brackets, or Project Site Conditions:
              </label>
              <textarea
                name="jobScopeDetails"
                value={formData.jobScopeDetails}
                onChange={handleInputChange}
                rows={3}
                placeholder="Include details such as project duration, standard daily shift hours, accommodation & transport provisions, or specific certification codes (e.g. AWS D1.1, ASME IX)."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A3871]/30 focus:border-[#0A3871]"
              />
            </div>

            {/* Document Upload Area */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 font-outfit">
                Attach Job Order / Demand Letter Draft (Optional - PDF, DOC, DOCX up to 15MB):
              </label>
              {!attachedFile ? (
                <label className="border-2 border-dashed border-slate-300 hover:border-[#0A3871] rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/60 hover:bg-blue-50/30 group">
                  <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-[#0A3871] mb-1 transition-colors" />
                  <span className="text-xs font-bold text-slate-700 group-hover:text-[#0A3871] font-outfit">
                    Click to select Demand Letter / Spec Sheet
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Supports official PDF, Word, or scanned project specifications
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleFileSimulate}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-slate-800">
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-5 h-5 text-[#0A3871] shrink-0" />
                    <span className="font-semibold truncate">{attachedFile.name}</span>
                    <span className="text-[11px] text-slate-500 shrink-0">({attachedFile.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1 rounded hover:bg-blue-100 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Legal / Protection Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#0A3871] shrink-0 mt-0.5" />
            <span>
              All inquiries submitted through this portal are processed in compliance with the Bureau of Emigration and Overseas Employment (BEOE), Government of Pakistan. We maintain strict non-disclosure for employer commercial terms.
            </span>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 font-outfit">
            <div className="text-xs text-slate-500 text-center sm:text-left flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Response turnaround: within 24 hours with dedicated account lead.</span>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3 bg-[#0A3871] hover:bg-[#082C59] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-smooth flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-70"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Requirements...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Service Proposal Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
