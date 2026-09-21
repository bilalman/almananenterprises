import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  FileCheck,
  Building2,
  Users,
  ShieldCheck,
  Plane,
  ArrowRight,
  Calculator,
  Layers,
  Sparkles
} from 'lucide-react';

interface DeploymentCalculatorProps {
  onApplyToInquiry?: (plan: {
    sector: string;
    headcount: string;
    country: string;
    timeline: string;
  }) => void;
}

const SECTOR_CONFIGS: Record<
  string,
  {
    name: string;
    defaultTrades: string[];
    testingFocus: string;
    leadTimeVariance: number; // in days
  }
> = {
  'oil-gas': {
    name: 'Oil & Gas / Petrochemical',
    defaultTrades: ['6G TIG/ARC Welders (ASME IX)', 'Pipe Fabricators', 'Hydrotest Techs', 'Safety Officers'],
    testingFocus: 'ASME Sec IX coupon testing, NDT visual inspection & radiographic spot check',
    leadTimeVariance: 6
  },
  construction: {
    name: 'Civil Infrastructure & High-Rise',
    defaultTrades: ['Steel Fixers', 'Shuttering Carpenters', 'Scaffolders (TUV/CITB)', 'Masonry Teams'],
    testingFocus: 'Structural mockup fabrication, blueprint reading, rapid formwork assembly trials',
    leadTimeVariance: 0
  },
  mep: {
    name: 'Electro-Mechanical (MEP)',
    defaultTrades: ['Industrial Electricians', 'HVAC Duct Fabricators', 'Plumbers', 'Cable Jointers'],
    testingFocus: 'Circuit diagnosis, 3-phase motor connections, duct layout alignment & pressure tests',
    leadTimeVariance: 3
  },
  logistics: {
    name: 'Heavy Transport & Plant Operations',
    defaultTrades: ['Heavy Trailer Drivers (Articulated)', 'Crane Operators (50T+)', 'Forklift Drivers', 'Diesel Mechanics'],
    testingFocus: 'Maneuvering precision trials, pre-trip vehicle inspections & load-chart comprehension',
    leadTimeVariance: 4
  }
};

const COUNTRY_REQUIREMENTS: Record<
  string,
  {
    countryName: string;
    legalSystem: string;
    mandatoryDocs: string[];
    visaProcessingTime: string;
  }
> = {
  KSA: {
    countryName: 'Kingdom of Saudi Arabia (KSA)',
    legalSystem: 'Musaned / Qiwa Electronic Platform & GAMCA',
    mandatoryDocs: [
      'Electronic Wakala (Power of Attorney) addressed to Al-Mannan Enterprises (OEP License No.)',
      'Demand Letter certified by Chamber of Commerce and Ministry of Foreign Affairs (MOFA)',
      'Standard Emigration Employment Agreement with approved wage rate & accommodation terms'
    ],
    visaProcessingTime: '10 - 14 Days (via Saudi Visa Bio/Tashir & Embassy)'
  },
  UAE: {
    countryName: 'United Arab Emirates (UAE)',
    legalSystem: 'MOHRE Electronic Work Permit & GAMCA',
    mandatoryDocs: [
      'Demand Letter attested by UAE Chamber of Commerce & Pakistan Embassy Abu Dhabi / Dubai',
      'Power of Attorney in favor of Al-Mannan Enterprises',
      'MOHRE Entry Work Permit Quota Copy'
    ],
    visaProcessingTime: '8 - 12 Days'
  },
  QATAR: {
    countryName: 'State of Qatar',
    legalSystem: 'Qatar Visa Center (QVC) & MADLSA',
    mandatoryDocs: [
      'Demand Letter attested by Ministry of Foreign Affairs, Doha',
      'Power of Attorney authorizing Al-Mannan Enterprises for candidate endorsement',
      'Block Visa / Approval Letter from Ministry of Administrative Development'
    ],
    visaProcessingTime: '12 - 15 Days (QVC biometric & medical flow in Islamabad)'
  },
  OMAN: {
    countryName: 'Sultanate of Oman',
    legalSystem: 'Ministry of Manpower & ROP Visa System',
    mandatoryDocs: [
      'Demand Letter attested by Oman Chamber of Commerce & Industry (OCCI)',
      'Power of Attorney issued by sponsor',
      'Approved Labor Clearance / Visa Slip copy'
    ],
    visaProcessingTime: '10 - 14 Days'
  },
  KUWAIT: {
    countryName: 'State of Kuwait',
    legalSystem: 'Public Authority for Manpower (PAM)',
    mandatoryDocs: [
      'Original Work Permit (Idne Amal) issued by Ministry of Social Affairs',
      'Commercial Chamber attested Demand Letter & Power of Attorney',
      'Kuwait Embassy authorized medical & police clearance (PCC)'
    ],
    visaProcessingTime: '14 - 18 Days'
  }
};

export const DeploymentCalculator: React.FC<DeploymentCalculatorProps> = ({
  onApplyToInquiry
}) => {
  const [sectorKey, setSectorKey] = useState<string>('oil-gas');
  const [countryCode, setCountryCode] = useState<string>('KSA');
  const [headcountTier, setHeadcountTier] = useState<number>(45);
  const [testProtocol, setTestProtocol] = useState<'standard' | 'delegation' | 'certified'>('delegation');

  const sector = SECTOR_CONFIGS[sectorKey] || SECTOR_CONFIGS['oil-gas'];
  const country = COUNTRY_REQUIREMENTS[countryCode] || COUNTRY_REQUIREMENTS['KSA'];

  // Calculate timeline phases mathematically
  const baseSourcing = headcountTier > 100 ? 12 : headcountTier > 50 ? 9 : 6;
  const testingDays = testProtocol === 'delegation' ? 6 : testProtocol === 'certified' ? 8 : 4;
  const medicalAndVisa = sector.leadTimeVariance + 14;
  const protectorAndTicketing = 7;
  const totalDays = baseSourcing + testingDays + medicalAndVisa + protectorAndTicketing;

  const handleApply = () => {
    if (onApplyToInquiry) {
      onApplyToInquiry({
        sector: sector.name,
        headcount: `${headcountTier} personnel`,
        country: country.countryName,
        timeline: `${totalDays} calendar days (${Math.ceil(totalDays / 7)} weeks)`
      });
    }
  };

  return (
    <div className="w-full rounded-2xl glass-card-light border border-slate-200/90 shadow-md p-6 sm:p-10 font-jakarta">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5 mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3871] font-outfit mb-1">
          <Calculator className="w-4 h-4 text-[#0A3871]" />
          <span>Interactive Employer Planning Engine</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
          Overseas Manpower Mobilization & Lead-Time Estimator
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Model your prospective workforce recruitment campaign. Calculate realistic sourcing lead-times, trade testing schedules, government clearances (Protector of Emigrants), and mandatory host-country legal prerequisites.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Sector Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#0A3871]" />
              <span>1. Select Project Sector:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {Object.entries(SECTOR_CONFIGS).map(([key, item]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setSectorKey(key)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-smooth cursor-pointer ${
                    sectorKey === key
                      ? 'bg-[#0A3871] text-white border-[#0A3871] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="block">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Destination Country */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-[#0A3871]" />
              <span>2. Destination Country / Host Jurisdiction:</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(COUNTRY_REQUIREMENTS).map(([code, item]) => (
                <button
                  type="button"
                  key={code}
                  onClick={() => setCountryCode(code)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-smooth cursor-pointer border ${
                    countryCode === code
                      ? 'bg-[#0A3871] text-white border-[#0A3871] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {item.countryName.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Headcount Volume Slider */}
          <div className="space-y-3 p-4.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-700 font-outfit flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#0A3871]" />
                <span>3. Target Workforce Volume:</span>
              </span>
              <span className="text-sm font-black text-[#0A3871] font-mono px-2.5 py-0.5 rounded bg-blue-100/70">
                {headcountTier} Candidates
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={300}
              step={5}
              value={headcountTier}
              onChange={(e) => setHeadcountTier(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0A3871]"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-outfit">
              <span>10 Specialists</span>
              <span>50 Batch</span>
              <span>150 Medium</span>
              <span>300+ Mega Contract</span>
            </div>
          </div>

          {/* 4. Trade Testing Protocol */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-outfit flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0A3871]" />
              <span>4. Technical Testing Protocol:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTestProtocol('standard')}
                className={`p-3 rounded-lg border text-left transition-smooth cursor-pointer ${
                  testProtocol === 'standard'
                    ? 'bg-[#0A3871] text-white border-[#0A3871]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="font-bold block">Internal Center Trial</span>
                <span className="text-[11px] opacity-80 block mt-0.5">Recorded HD Video</span>
              </button>

              <button
                type="button"
                onClick={() => setTestProtocol('delegation')}
                className={`p-3 rounded-lg border text-left transition-smooth cursor-pointer ${
                  testProtocol === 'delegation'
                    ? 'bg-[#0A3871] text-white border-[#0A3871]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="font-bold block">Employer Delegation</span>
                <span className="text-[11px] opacity-80 block mt-0.5">In-Person at Islamabad</span>
              </button>

              <button
                type="button"
                onClick={() => setTestProtocol('certified')}
                className={`p-3 rounded-lg border text-left transition-smooth cursor-pointer ${
                  testProtocol === 'certified'
                    ? 'bg-[#0A3871] text-white border-[#0A3871]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="font-bold block">Third-Party Certified</span>
                <span className="text-[11px] opacity-80 block mt-0.5">AWS / TUV Scorecard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Projection & Legal Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Projection Card */}
          <div className="p-6 rounded-2xl bg-[#071E3D] text-white border border-[#0A2A54] shadow-xl space-y-4 font-jakarta">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300 font-outfit">
                Calculated Mobilization SLA
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-500/30">
                Turnaround Estimate
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white font-heading">
                {totalDays}
              </span>
              <span className="text-sm font-semibold text-slate-300 font-outfit">
                Calendar Days (~{Math.ceil(totalDays / 7)} Weeks)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Complete end-to-end turnaround from signed Demand Letter accreditation to candidate touchdown in {country.countryName.split('(')[0].trim()}.
            </p>

            {/* Timeline Breakdown Steps */}
            <div className="space-y-2.5 pt-2 text-xs border-t border-white/10">
              <div className="flex items-center justify-between text-slate-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  <span>1. National Roster Sourcing:</span>
                </span>
                <span className="font-mono font-semibold text-white">{baseSourcing} Days</span>
              </div>

              <div className="flex items-center justify-between text-slate-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <span>2. Trade Testing & Delegation Selection:</span>
                </span>
                <span className="font-mono font-semibold text-white">{testingDays} Days</span>
              </div>

              <div className="flex items-center justify-between text-slate-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>3. GAMCA Medical & Visa Endorsement:</span>
                </span>
                <span className="font-mono font-semibold text-white">{medicalAndVisa} Days</span>
              </div>

              <div className="flex items-center justify-between text-slate-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>4. Protector Stamping & Flight Ticketing:</span>
                </span>
                <span className="font-mono font-semibold text-white">{protectorAndTicketing} Days</span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleApply}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#0A3871] text-xs font-bold uppercase tracking-wider transition-smooth flex items-center justify-center gap-2 cursor-pointer shadow-sm font-outfit"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0A3871]" />
                <span>Apply Plan to Inquiry Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Legal Document Checklist Box */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs space-y-3 font-jakarta shadow-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 font-heading">
              <FileCheck className="w-4 h-4 text-[#0A3871]" />
              <span>Mandatory Legal Instruments for {country.countryName.split('(')[0].trim()}:</span>
            </div>
            <ul className="space-y-2 text-slate-600">
              {country.mandatoryDocs.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700">Platform Requirement: </span>
              {country.legalSystem}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
