import React from 'react';
import { useRouter } from '../context/RouterContext';
import {
  GraduationCap,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  HardHat,
  ArrowRight,
  Flame,
  Zap,
  Gauge
} from 'lucide-react';

export const TrainingPage: React.FC = () => {
  const { navigate } = useRouter();

  const tradeTests = [
    {
      title: 'Welding & Pipe Fabrication',
      icon: <Flame className="w-5 h-5 text-[#0A3871]" />,
      desc: 'Hands-on evaluation in 6G/3G positions, SMAW, GTAW, TIG, MIG, and pipe fitting under calibrated conditions.'
    },
    {
      title: 'Industrial & Building Electrical',
      icon: <Zap className="w-5 h-5 text-[#0A3871]" />,
      desc: 'Testing wiring, panel board assembly, conduit installation, motor controls, and diagnostic troubleshooting.'
    },
    {
      title: 'HVAC & Refrigeration',
      icon: <Gauge className="w-5 h-5 text-[#0A3871]" />,
      desc: 'Evaluation of central chillers, ductwork fabrication, compressor maintenance, and refrigerant charging.'
    },
    {
      title: 'Mechanical & Heavy Equipment',
      icon: <Wrench className="w-5 h-5 text-[#0A3871]" />,
      desc: 'Inspection of diesel engines, hydraulic systems, plant machinery maintenance, and industrial mechanics.'
    },
    {
      title: 'Civil Construction Trades',
      icon: <HardHat className="w-5 h-5 text-[#0A3871]" />,
      desc: 'Masonry, steel fixing, rod bending, shuttering carpentry, plastering, and blueprint reading.'
    },
    {
      title: 'Workplace HSE & Safety Training',
      icon: <ShieldCheck className="w-5 h-5 text-[#0A3871]" />,
      desc: 'Pre-deployment orientation on personal protective equipment (PPE), hazard awareness, and site protocol.'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <section className="bg-[#0A3871] text-white py-16 sm:py-24 border-b border-[#071E3D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-900/60 border border-blue-500/30 text-xs font-semibold text-blue-200">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Technical Trade Testing & Training Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Workforce Development & Skill Verification
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            Supporting workforce development through technical trade testing and training designed to help candidates meet professional and industry requirements.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871]">
                  Precision Assessment
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Practical Evaluation for Overseas Project Readiness
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our Technical Trade Test & Training Center ensures that every technician, craftsman, and operator deployed overseas possesses verified, practical competency. We provide employers with full transparency into each candidate's technical skills before departure.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700">
                    <strong>Customized Trade Rubrics:</strong> Tests tailored to the employer's specific construction drawings, equipment brands, and project blueprints.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700">
                    <strong>Direct Employer Testing:</strong> Facilities and workshop bays available for visiting employer delegation recruitment drives in Pakistan.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0A3871] shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700">
                    <strong>Pre-Departure HSE:</strong> Safety orientation covering GCC worksite protocols, emergency procedures, and protective gear usage.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                  alt="Industrial trade testing workshop"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trade Testing Capabilities */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A3871]">
              Workshop Infrastructure
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mt-1">
              Evaluated Trades & Test Benches
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mt-2">
              Our trade test center features calibrated instrumentation and testing rigs conforming to international ISO and industry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradeTests.map((trade, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center">
                  {trade.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900">{trade.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{trade.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">
            Schedule a Technical Trade Test Session
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Book test bays for your upcoming recruitment campaign or request customized practical testing criteria for your technical vacancies.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-[#0A3871] hover:bg-[#0B4386] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
            >
              Contact Trade Center Coordinator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
