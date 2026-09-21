import React from 'react';
import { useRouter } from '../context/RouterContext';
import { motion } from 'motion/react';
import { RECRUITMENT_PROCESS } from '../data/companyData';
import {
  ShieldCheck,
  ClipboardList,
  CheckCircle2,
  FileCheck2,
  ArrowRight
} from 'lucide-react';

export const RecruitmentPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full bg-white text-slate-900">
      {/* Hero Banner */}
      <section className="bg-[#071E3D] text-white py-16 sm:py-24 border-b border-[#0A2A54] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(#60A5FA 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-900/60 border border-blue-500/30 text-xs font-semibold text-blue-200">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>International Client Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Overseas Recruitment Process
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed font-normal">
            A compliant, structured, and timely recruitment methodology connecting international projects with verified Pakistani workforce categories.
          </p>
        </motion.div>
      </section>

      {/* Process Walkthrough */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3871]"></span>
              <span>End-To-End Mobilization</span>
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mt-1.5">
              From Job Order to On-Site Deployment
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
              We guide employers through every step of Pakistani emigration, trade verification, and overseas employment promoter compliance.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl">
            {RECRUITMENT_PROCESS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 hover:border-[#0A3871]/30 transition-all shadow-xs"
              >
                <div className="w-12 h-12 rounded-lg bg-[#0A3871] text-white flex items-center justify-center shrink-0 font-bold text-base shadow-sm">
                  {item.step}
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="text-xs text-slate-500 pt-2 border-t border-slate-200/80">
                    {idx === 0 && 'Includes Demand Letter, Power of Attorney, and Service Agreement alignment according to Ministry of Overseas Pakistanis standards.'}
                    {idx === 1 && 'Nationwide mobilization via provincial skill registries, targeted headhunting, and candidate shortlisting.'}
                    {idx === 2 && 'Hands-on trade testing at our partner Technical Trade Test Center in Pakistan with verifiable evaluation sheets.'}
                    {idx === 3 && 'Direct client interview delegations hosted in Pakistan, live digital video conferences, or delegated authority.'}
                    {idx === 4 && 'GAMCA medical certification, visa stamping, Protector of Emigrants approval, and scheduled flight dispatch.'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Regulatory Standards */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3871]"></span>
              <span>Legal & Institutional Assurance</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1.5">
              Regulatory Compliance & Documents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A3871] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900">
                Government of Pakistan OEP
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                All overseas recruitment operations are carried out strictly under the regulatory framework of the Bureau of Emigration and Overseas Employment (BEOE), Pakistan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A3871] flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900">
                Standard Documents Required
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Employers furnish a Demand Letter, Power of Attorney, and Inter-Agency Agreement attested by the Pakistani Embassy in the host country.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A3871] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900">
                Transparent Processing
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Weekly recruitment status reports, biometric confirmation, and direct candidate flight tracking provided to client operations teams.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Action Strip */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">
            Ready to Initiate a Workforce Demand?
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Contact our operations team to review your trade specifications or receive sample documentation templates.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-[#0A3871] hover:bg-[#0B4386] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Submit Manpower Requirements
            </button>
            <button
              onClick={() => navigate('/services/training-center')}
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Learn About Trade Testing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
