import React, { useState } from 'react';
import {
  X,
  Server,
  FileCheck,
  Code2,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyHtaccess = () => {
    const text = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_URI} ^/api/ [NC,OR]
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-blue-900 flex items-center justify-center text-amber-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">GoDaddy cPanel & Shared Hosting Deployment</h3>
              <p className="text-xs text-slate-400">Production Checklist & Placeholder Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-950 text-xs flex items-center justify-center font-bold">1</span>
              <span>Generate Production Static Build</span>
            </h4>
            <p className="text-xs text-slate-600 pl-8">
              Run <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-950 font-mono">npm run build</code>. This compiles all React and Tailwind code into optimized static HTML, CSS, and JS inside the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-950 font-mono">dist/</code> directory.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-950 text-xs flex items-center justify-center font-bold">2</span>
              <span>Upload to GoDaddy <code className="text-blue-950">public_html</code></span>
            </h4>
            <div className="pl-8 space-y-1.5 text-xs text-slate-600">
              <p>• In your GoDaddy account, go to <strong>cPanel Admin &gt; File Manager</strong>.</p>
              <p>• Navigate into <strong><code className="text-slate-900">public_html/</code></strong>.</p>
              <p>• Click <strong>Settings</strong> in top right &gt; Check <strong>"Show Hidden Files (dotfiles)"</strong> &gt; Save. (Important for <code className="text-blue-950">.htaccess</code>).</p>
              <p>• Upload all contents of <code className="text-slate-900">dist/</code> directly into <code className="text-slate-900">public_html/</code>.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-950 text-xs flex items-center justify-center font-bold">3</span>
              <span>Verify <code className="text-blue-950">.htaccess</code> for SPA Routing</span>
            </h4>
            <div className="pl-8 space-y-2">
              <p className="text-xs text-slate-600">
                A pre-configured <code className="text-slate-900 font-mono">.htaccess</code> file is included in your build so refreshing sub-pages like <code className="text-slate-900 font-mono">/services/overseas-employment</code> or <code className="text-slate-900 font-mono">/apply</code> loads seamlessly without 404 errors:
              </p>
              <div className="relative bg-slate-900 text-slate-200 text-xs p-3 rounded-lg font-mono">
                <button
                  onClick={copyHtaccess}
                  className="absolute top-2 right-2 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] rounded text-amber-400 flex items-center gap-1"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Rules'}</span>
                </button>
                <pre className="overflow-x-auto pr-20">
{`<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_URI} ^/api/ [NC,OR]
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>`}
                </pre>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-950 text-xs flex items-center justify-center font-bold">4</span>
              <span>Configure Email Handlers in <code className="text-blue-950">public_html/api/</code></span>
            </h4>
            <div className="pl-8 space-y-1.5 text-xs text-slate-600">
              <p>• Edit <strong><code className="text-slate-900">api/contact.php</code></strong>: Set <code className="text-blue-950 font-mono">$RECIPIENT_EMAIL = "your-email@yourdomain.com"</code>.</p>
              <p>• Edit <strong><code className="text-slate-900">api/apply.php</code></strong>: Set <code className="text-blue-950 font-mono">$RECIPIENT_EMAIL = "recruitment@yourdomain.com"</code>.</p>
              <p>• Both scripts automatically execute standard GoDaddy cPanel sendmail with zero Node.js server dependencies.</p>
            </div>
          </div>

          {/* Section 5: Placeholders Summary */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Active Verified Corporate Coordinates</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-emerald-950">
              <li><strong>Office Address:</strong> PLAZA 315/A, 3rd Floor, Akhri Mint college Stop Near Suzuki Showroom Main GT Road, Baghbanpura, Lahore</li>
              <li><strong>Hotlines:</strong> 0325-5556672 / 0325-5556671</li>
              <li><strong>Primary Domain:</strong> almannanenterprises.com (info@almannanenterprises.com)</li>
              <li><strong>Google Maps:</strong> https://g.co/kgs/VmhCp9s (linked throughout site)</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            A full copy is stored in <code className="text-slate-700">/public/DEPLOYMENT_GUIDE.md</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold rounded-lg"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
