import React from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Building2,
  Cpu,
  Truck,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers
} from 'lucide-react';

interface TrustedPartnersProps {
  onContactClick?: () => void;
}

interface IndustrySector {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  disciplines: string[];
}

const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    id: 'oil-gas',
    name: 'Oil, Gas & Petrochemical',
    icon: Flame,
    description: 'Specialized workforce sourcing for refinery expansions, pipelines, and offshore energy infrastructure.',
    disciplines: ['6G Pipe Welders (TIG/MIG/SMAW)', 'Pipe Fabricators & Fitters', 'Certified Riggers & Scaffolders']
  },
  {
    id: 'civil',
    name: 'Civil & Infrastructure',
    icon: Building2,
    description: 'Technical and skilled personnel for commercial developments, highway corridors, and foundations.',
    disciplines: ['Shuttering & Finishing Carpenters', 'Steel Fixers & Rod Benders', 'Heavy Plant & Crane Operators']
  },
  {
    id: 'mep',
    name: 'MEP & Electro-Mechanical',
    icon: Cpu,
    description: 'Skilled electrical, instrumentation, and climate control technicians for complex facility grids.',
    disciplines: ['Industrial HV/LV Electricians', 'HVAC & Chiller Specialists', 'Ductmen & Plumbers']
  },
  {
    id: 'logistics',
    name: 'Logistics & Heavy Transport',
    icon: Truck,
    description: 'Licensed heavy vehicle operators, terminal staff, and fleet maintenance technicians.',
    disciplines: ['Heavy Trailer (HTV) Drivers', 'Forklift & Crane Operators', 'Diesel & Plant Mechanics']
  },
  {
    id: 'maintenance',
    name: 'Plant & Industrial Maintenance',
    icon: Wrench,
    description: 'Mechanical maintenance teams for scheduled plant turnarounds, overhauls, and factory operations.',
    disciplines: ['Millwright Fitters', 'Machinists & Lathe Operators', 'Industrial Maintenance Techs']
  },
  {
    id: 'governance',
    name: 'Professional & HR Support',
    icon: Layers,
    description: 'Administrative, supervisory, and safety personnel supporting overseas camp and project operations.',
    disciplines: ['Site Safety (HSE) Officers', 'Camp & Catering Supervisors', 'Technical Foremen']
  }
];

export const TrustedPartners: React.FC<TrustedPartnersProps> = ({ onContactClick }) => {
  return (
    <section className="py-14 sm:py-20 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-badge-light text-xs font-semibold text-slate-700 font-outfit">
              <Layers className="w-3.5 h-3.5 text-[#0A3871]" />
              <span>Technical Sourcing Scope</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Key Industry Sectors & Workforce Specializations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-jakarta">
              Al-Mannan Enterprises sources, evaluates, and mobilizes qualified Pakistani manpower across diverse industrial, engineering, and logistics domains.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-4 shrink-0 glass-card-light p-3.5 rounded-xl shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A3871] flex items-center justify-center font-black text-sm font-outfit">
              OEP
            </div>
            <div className="text-xs font-jakarta">
              <span className="font-bold text-slate-900 block font-outfit">Regulated Overseas Employment</span>
              <span className="text-slate-500">Bureau of Emigration Compliance</span>
            </div>
          </div>
        </div>

        {/* Industry Sector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {INDUSTRY_SECTORS.map((sector, idx) => {
            const Icon = sector.icon;

            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                className="group relative p-6 rounded-xl glass-card-light hover:bg-white border border-slate-200/90 hover:border-[#0A3871]/40 shadow-xs hover:shadow-lg transition-smooth flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-[#0A3871] group-hover:bg-[#0A3871] group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0A3871] transition-colors leading-snug font-outfit mb-2">
                    {sector.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-jakarta mb-4">
                    {sector.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 font-jakarta">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-outfit">
                    Key Trades:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {sector.disciplines.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0A3871] shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Contact / Inquiry Ribbon */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 font-jakarta">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#0A3871]" />
              <span>Government of Pakistan Licensed (BEOE Regulated)</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0A3871]" />
              <span>Practical Trade Test Evaluation Facility</span>
            </span>
          </div>

          {onContactClick && (
            <button
              onClick={onContactClick}
              className="text-[#0A3871] hover:text-[#082C59] font-bold inline-flex items-center gap-1.5 hover:underline cursor-pointer font-outfit"
            >
              <span>Submit Manpower Demand Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
