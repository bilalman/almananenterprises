import React, { useState } from 'react';
import { CandidateFormState } from '../types';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  FileText,
  X
} from 'lucide-react';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const ApplyPage: React.FC = () => {
  const [formData, setFormData] = useState<CandidateFormState>({
    fullName: '',
    email: '',
    phone: '',
    country: 'Pakistan',
    profession: '',
    experience: '1 - 3 Years',
    education: 'Matric / Intermediate',
    message: '',
    website_hp: '',
    cvFile: null
  });

  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [selectedFileSize, setSelectedFileSize] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Accept PDF, DOC, and DOCX files
      const allowedExts = ['.pdf', '.doc', '.docx'];
      const fileLower = file.name.toLowerCase();
      const hasValidExt = allowedExts.some((ext) => fileLower.endsWith(ext));
      const hasValidMime =
        file.type === 'application/pdf' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/octet-stream';

      if (!hasValidExt && !hasValidMime) {
        setErrorMessage('Invalid file format. Only PDF, DOC, and DOCX documents (.pdf, .doc, .docx) are accepted.');
        e.target.value = '';
        return;
      }

      // Implement file size validation (max 5MB)
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage('CV file size exceeds the 5MB limit. Please upload a document under 5MB.');
        e.target.value = '';
        return;
      }

      setFormData((prev) => ({ ...prev, cvFile: file }));
      setSelectedFileName(file.name);
      setSelectedFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
      setErrorMessage('');
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, cvFile: null }));
    setSelectedFileName('');
    setSelectedFileSize('');
    const fileInput = document.getElementById('cvUpload') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Client-side required fields validation
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.profession.trim()
    ) {
      setStatus('error');
      setErrorMessage('Please fill in all mandatory fields (Name, Email, Phone, and Profession/Trade).');
      return;
    }

    // Required CV file validation
    if (!formData.cvFile) {
      setStatus('error');
      setErrorMessage('Upload Your CV / Resume is required. Please upload a PDF, DOC, or DOCX document (Max 5MB).');
      return;
    }

    try {
      // Use FormData for multipart/form-data submission
      const payload = new FormData();
      payload.append('fullName', formData.fullName.trim());
      payload.append('email', formData.email.trim());
      payload.append('phone', formData.phone.trim());
      payload.append('country', formData.country);
      payload.append('profession', formData.profession.trim());
      payload.append('experience', formData.experience);
      payload.append('education', formData.education);
      payload.append('message', formData.message.trim());
      payload.append('website_hp', formData.website_hp || '');
      payload.append('cv', formData.cvFile);

      // Submit POST request to /api/apply.php using multipart/form-data
      const response = await fetch('/api/apply.php', {
        method: 'POST',
        body: payload
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          country: 'Pakistan',
          profession: '',
          experience: '1 - 3 Years',
          education: 'Matric / Intermediate',
          message: '',
          website_hp: '',
          cvFile: null
        });
        setSelectedFileName('');
        setSelectedFileSize('');
      } else {
        setStatus('error');
        setErrorMessage(
          result?.message ||
          result?.error ||
          'Unable to submit your application. Please verify your details and try again.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'A network error occurred while submitting your application. Please check your connection or contact our recruitment desk directly at info@almannanenterprises.com or 0325-5556671.'
      );
    }
  };

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
              <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
                {status === 'success' ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        Registration Received Successfully
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Your candidate profile and CV have been safely recorded in our recruitment database. When overseas opportunities matching your trade arise, our processing department will contact you directly for trade testing and document verification.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-[#0A3871] hover:bg-[#0B4386] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Submit Another Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-lg font-bold text-slate-900">Candidate Data Entry Form</h3>
                      <p className="text-xs text-slate-500">
                        Provide accurate personal and technical qualifications for employer review.
                      </p>
                    </div>

                    {status === 'error' && (
                      <div className="p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
                        <div>
                          <p className="font-semibold">Application Notice</p>
                          <p>{errorMessage || 'Could not submit candidate profile. Please verify your inputs.'}</p>
                        </div>
                      </div>
                    )}

                    {/* Hidden Honeypot field for bot protection */}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                          Full Legal Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="As written on your CNIC / Passport"
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. candidate@example.com"
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                          WhatsApp / Mobile Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +92 300 1234567"
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="profession" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                          Trade / Profession <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="profession"
                          name="profession"
                          required
                          value={formData.profession}
                          onChange={handleChange}
                          placeholder="e.g. 6G Welder, Electrician, Civil Engineer"
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="experience" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                          Total Experience
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871]"
                        >
                          <option value="Less than 1 Year">Less than 1 Year</option>
                          <option value="1 - 3 Years">1 - 3 Years</option>
                          <option value="3 - 5 Years">3 - 5 Years</option>
                          <option value="5 - 10 Years">5 - 10 Years</option>
                          <option value="10+ Years (Senior / Foreman)">10+ Years (Senior / Foreman)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="education" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                          Technical Education / Diploma
                        </label>
                        <select
                          id="education"
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871]"
                        >
                          <option value="DAE / Technical Diploma (3 Years)">DAE / Technical Diploma (3 Years)</option>
                          <option value="B.Sc / B.E Engineering Degree">B.Sc / B.E Engineering Degree</option>
                          <option value="Trade Test Certificate (NAVTTC / TEVTA)">Trade Test Certificate (NAVTTC / TEVTA)</option>
                          <option value="Matric / Intermediate">Matric / Intermediate</option>
                          <option value="Primary / Middle / Skilled by Experience">Skilled by Field Experience</option>
                        </select>
                      </div>
                    </div>

                    {/* CV Upload Field */}
                    <div>
                      <label htmlFor="cvUpload" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Upload Your CV / Resume <span className="text-rose-500">*</span>
                      </label>

                      <input
                        type="file"
                        id="cvUpload"
                        name="cv"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {selectedFileName ? (
                        <div className="flex items-center justify-between p-4 rounded-lg bg-sky-50 border border-sky-200 text-slate-800">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-[#0A3871] text-white flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {selectedFileName}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Size: {selectedFileSize} • Ready to submit
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <label
                              htmlFor="cvUpload"
                              className="px-3 py-1.5 text-xs font-bold text-[#0A3871] hover:bg-sky-100 rounded cursor-pointer transition-colors"
                            >
                              Replace
                            </label>
                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                              title="Remove file"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-5 text-center hover:bg-slate-50 transition-colors">
                          <label htmlFor="cvUpload" className="cursor-pointer min-h-[44px] flex flex-col items-center justify-center gap-1.5">
                            <Upload className="w-6 h-6 text-[#0A3871]" />
                            <span className="text-xs font-bold text-[#0A3871]">
                              Click to browse and upload your CV / Resume
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Accepted formats: PDF, DOC, or DOCX • Maximum file size: 5MB
                            </span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Summary / Notes */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Work Experience Summary / Trade Certifications
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Mention prior Gulf experience, specific welding or machinery codes, passport status, etc."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:border-[#0A3871] focus:ring-1 focus:ring-[#0A3871] transition-colors"
                      ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <p className="text-[11px] text-slate-500">
                        * Official registration. No fees are charged for candidate database submission.
                      </p>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full sm:w-auto px-7 py-3 bg-[#0A3871] hover:bg-[#0B4386] text-white font-bold text-sm rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Submitting Profile...</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-4 h-4 text-white" />
                            <span>Register Candidate Profile</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
