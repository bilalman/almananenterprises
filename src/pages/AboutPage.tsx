import React from 'react';
import { useRouter } from '../context/RouterContext';
import { motion } from 'motion/react';
import { COMPANY_INFO, TEAM_MEMBERS } from '../data/companyData';
import {
  ShieldCheck,
  Building2,
  Users,
  Target,
  HeartHandshake,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg glass-badge-dark text-xs font-bold uppercase tracking-wider text-blue-200 font-outfit">
            <Building2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Corporate Background & Governance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-cinzel">
            About AL-MANNAN ENTERPRISES
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed font-normal font-jakarta">
            Overseas employment promoters, international manpower recruitment, and technical workforce training facilitators based in Pakistan.
          </p>
        </motion.div>
      </section>

      {/* 1. Who We Are */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
                  Who We Are
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
                  Bridging International Demand With Pakistani Competence
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-jakarta">
                <p>
                  <strong className="font-cinzel text-slate-900 font-semibold">AL-MANNAN ENTERPRISES</strong> provides manpower across different professional and technical categories, ranging from qualified engineers to highly skilled technical, semi-skilled workers, and HR specialists.
                </p>
                <p>
                  {COMPANY_INFO.coreMessage}
                </p>
                <p>
                  As an established manpower organization in Pakistan, we maintain an active database of candidates across all provinces. We specialize in understanding our clients' operational requirements, verifying candidates' technical capabilities through practical testing, and ensuring seamless deployment across international destinations.
                </p>
              </div>

              <div className="pt-2">
                <div className="p-4.5 rounded-2xl glass-card-light border border-slate-200/90 text-xs text-slate-700 flex items-start gap-3.5 shadow-xs font-jakarta">
                  <ShieldCheck className="w-5 h-5 text-[#0A3871] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900 mb-0.5 font-heading text-sm">
                      Established Pakistani Network
                    </span>
                    <span className="leading-relaxed">
                      Our nationwide sourcing capability allows us to fulfill large-volume workforce mobilizations across short lead times while maintaining strict verification criteria.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                  alt="Engineering and construction team on site"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Approach & What We Do */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Approach */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="glass-card-light hover:bg-white p-8 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-smooth space-y-4 font-jakarta"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A3871] flex items-center justify-center font-bold border border-blue-100">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Our Recruitment Approach
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The company focuses on understanding client requirements, providing suitable manpower, and supporting clients in achieving their workforce targets.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-jakarta">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0A3871] shrink-0 mt-0.5" />
                  <span>Comprehensive job order analysis before sourcing commences</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0A3871] shrink-0 mt-0.5" />
                  <span>Rigorous vetting of professional credentials and technical trade experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0A3871] shrink-0 mt-0.5" />
                  <span>Strict adherence to client timelines and contractual commitments</span>
                </li>
              </ul>
            </motion.div>

            {/* What We Do */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="glass-card-light hover:bg-white p-8 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-smooth space-y-4 font-jakarta"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A3871] flex items-center justify-center font-bold border border-blue-100">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Core Operating Divisions
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We operate across three unified divisions to deliver an integrated overseas recruitment and staffing experience:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-jakarta">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#0A3871] shrink-0 font-outfit">1.</span>
                  <span><strong>Overseas Employment Promoters:</strong> Mobilizing qualified Pakistani personnel for global industry contracts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#0A3871] shrink-0 font-outfit">2.</span>
                  <span><strong>Travel & Tours:</strong> Coordinating group air ticketing, visa logistics, and departure arrangements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#0A3871] shrink-0 font-outfit">3.</span>
                  <span><strong>Technical Trade Testing:</strong> Practical trade assessment and skill verification in workshop environments.</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* 3. Our Responsibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card-dark text-white p-8 sm:p-10 rounded-2xl border border-white/10 space-y-4 shadow-2xl font-jakarta"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg glass-badge-dark text-blue-200 text-xs font-bold font-outfit">
              <HeartHandshake className="w-3.5 h-3.5 text-sky-400" />
              <span>Ethical Human Resources Commitment</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-heading">
              Social Responsibility & Candidate Welfare
            </h3>
            <blockquote className="text-base italic text-slate-200 font-medium leading-relaxed border-l-4 border-blue-400 pl-4 py-1 font-jakarta">
              "{COMPANY_INFO.socialResponsibility}"
            </blockquote>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-jakarta">
              We believe that manpower recruitment is fundamentally about human potential. We treat candidate welfare, safety briefings, fair employment representation, and clear contract communication as core institutional obligations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Leadership & Operations Team */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
              Management & Operations
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mt-1 font-heading">
              Our Professional Team
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mt-2 font-jakarta">
              The operational and executive team members managing client coordination, documentation, processing, and mobilization at <strong className="font-cinzel text-slate-800 font-semibold">AL-MANNAN ENTERPRISES</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="glass-card-light rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-smooth group"
              >
                <div className="h-60 bg-slate-100 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-xs font-semibold text-blue-200 block font-outfit">
                      {member.department}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-1.5 font-jakarta">
                  <h3 className="font-bold text-slate-900 text-base font-heading">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit">
                    {member.role}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card-light rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-4 shadow-xs">
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Partner With AL-MANNAN ENTERPRISES
            </h3>
            <p className="text-slate-600 text-sm max-w-xl mx-auto font-jakarta">
              Contact our executive team to discuss your overseas manpower requirements or trade testing schedules.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3 font-outfit">
              <button
                onClick={() => navigate('/contact')}
                className="min-h-[44px] px-6 py-3 bg-[#0A3871] hover:bg-[#082C59] text-white text-xs font-bold rounded-lg transition-smooth cursor-pointer shadow-xs"
              >
                Request Manpower Consultation
              </button>
              <button
                onClick={() => navigate('/apply')}
                className="min-h-[44px] px-6 py-3 glass-card-light hover:bg-white text-slate-800 border border-slate-300 text-xs font-semibold rounded-lg transition-smooth cursor-pointer"
              >
                Candidate Registration
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
