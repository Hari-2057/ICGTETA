import React, { useState } from 'react';
import { 
  Stethoscope, Activity, ShieldCheck, Zap, Layers, FileUp, 
  BarChart2, Cloud, ArrowRight, CheckCircle2, ChevronDown, 
  Sparkles, HeartPulse, Dna, Atom, UserCheck, PieChart, TrendingUp, Users, Clock
} from 'lucide-react';
import { AntiGravityCard } from '../components/AntiGravityCard';
import { MagneticButton } from '../components/MagneticButton';

export const LandingPage = ({ onLaunchWorkspace, onGoToPerformance }) => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', institution: '', message: '' });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
    setContactForm({ name: '', email: '', institution: '', message: '' });
  };

  const pillMetrics = [
    { icon: <TargetIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />, title: "98.7%", desc: "Prediction Accuracy" },
    { icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />, title: "95%", desc: "Confidence Reliability" },
    { icon: <TestTubeIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />, title: "50+", desc: "Blood Parameters" },
    { icon: <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />, title: "1000+", desc: "Test Records" },
    { icon: <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />, title: "24/7", desc: "AI Analysis" }
  ];

  const faqs = [
    {
      q: "What makes Conformal Prediction different from standard AI models?",
      a: "Standard AI models often output uncalibrated probabilities that lead to false overconfidence. Our system applies MAPIE Conformal Prediction bounds (95% confidence level) to output mathematically guaranteed confidence sets and flag uncertain cases for secondary medical review."
    },
    {
      q: "How does the automated PDF blood lab report importer work?",
      a: "Our built-in biomarker parser reads uploaded patient blood test PDF reports (including HbA1c, Fasting Glucose, Lipid profile, and Kidney panels) and auto-populates the workspace fields. The model does NOT run automatically on upload—you maintain full clinical control."
    },
    {
      q: "Is patient evaluation data stored securely?",
      a: "Yes. Evaluation records and generated clinical reports are integrated with Supabase PostgreSQL and Supabase Storage with patient session isolation. Each device session receives a unique token ensuring patient privacy."
    },
    {
      q: "Can I export performance metrics for Power BI reporting?",
      a: "Absolutely. The Model Performance tab includes Optuna hyperparameter convergence graphs, feature attributions, confusion matrix heatmaps, and a 1-click exporter for model_performance_powerbi_dataset.csv."
    },
    {
      q: "Which clinical guidelines are implemented?",
      a: "The system enforces diagnostic thresholds and actionable intervention cards aligned with American Diabetes Association (ADA) and World Health Organization (WHO) standards."
    }
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-teal-400 icon-nudge" />,
      title: "Conformal Prediction",
      description: "95% confidence guarantees and calibrated uncertainty bounds."
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400 icon-nudge" />,
      title: "SHAP Explainability",
      description: "Game-theoretic feature attributions for transparent diagnostics."
    },
    {
      icon: <FileUp className="w-6 h-6 text-cyan-600 dark:text-cyan-400 icon-nudge" />,
      title: "Auto PDF Parsing",
      description: "Extract data from raw patient lab report PDFs automatically."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400 icon-nudge" />,
      title: "Risk Stratification",
      description: "Multi-class diabetes risk assessment and severity index."
    },
    {
      icon: <Cloud className="w-6 h-6 text-amber-600 dark:text-amber-400 icon-nudge" />,
      title: "Privacy & Security",
      description: "HIPAA ready, session-isolated encrypted cloud storage."
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400 icon-nudge" />,
      title: "ADA Guidelines",
      description: "Standardized intervention protocols for diabetes care."
    }
  ];

  const processSteps = [
    { num: "1", title: "Upload Lab Report", desc: "Secure PDF upload or manual entry" },
    { num: "2", title: "AI Parses & Extracts", desc: "Auto extract biomarker values" },
    { num: "3", title: "Risk Assessment", desc: "AI calculates calibrated risk score" },
    { num: "4", title: "Confidence Estimation", desc: "95% confidence bounds calculated" },
    { num: "5", title: "Clinical Insights", desc: "Actionable recommendations" }
  ];

  return (
    <div className="space-y-20 py-4 relative z-10">
      
      {/* HERO SECTION WITH BALANCED 2-COLUMN LAYOUT */}
      <section className="relative overflow-hidden pt-6 pb-12">
        
        {/* Apple Vision Pro Ambient Light Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-cyan-200/40 via-sky-100/30 to-transparent dark:from-cyan-950/25 dark:via-sky-950/20 dark:to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 px-4 max-w-7xl mx-auto">
          
          {/* LEFT COLUMN: HERO TEXT & CTAS */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Feature Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-100/70 dark:bg-cyan-950/70 border border-cyan-300/60 dark:border-cyan-700/60 text-cyan-800 dark:text-cyan-300 text-xs font-extrabold shadow-sm backdrop-blur-md animate-fade-rise">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-spin-slow" />
              <span>Next-Gen Framer HealthTech Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] animate-fade-rise stagger-1">
              Precision Diabetes Risk Assessment with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 dark:from-cyan-400 dark:via-teal-400 dark:to-blue-400">Calibrated Conformal AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium animate-fade-rise stagger-2">
              Empower physicians with mathematically guaranteed confidence bounds (95% statistical confidence), SHAP game-theoretic explainability, and automated blood lab report PDF parsing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 animate-fade-rise stagger-3">
              <MagneticButton
                onClick={onLaunchWorkspace}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl liquid-btn-primary font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-600/25"
              >
                <Stethoscope className="w-4 h-4 text-white icon-nudge" />
                <span>Launch Clinical Workspace</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>

              <MagneticButton
                onClick={onGoToPerformance}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs border border-slate-200 dark:border-slate-800 shadow-sm transition flex items-center justify-center space-x-2"
              >
                <BarChart2 className="w-4 h-4 text-amber-600 dark:text-amber-400 icon-nudge" />
                <span>Explore Power BI Analytics</span>
              </MagneticButton>
            </div>

          </div>

          {/* RIGHT COLUMN: CLINICAL DASHBOARD PREVIEW CARD */}
          <div className="lg:col-span-6">
            <AntiGravityCard depth={0.6} floatDelay="0.2s">
              <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl glass-panel space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 border border-cyan-200 dark:border-cyan-800">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">Clinical Dashboard</span>
                    <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>Live</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">Last 30 Days</span>
                </div>

                {/* Score & Donut Charts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Diabetes Risk Score */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 block">Diabetes Risk Score</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">0.28</span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Low Risk
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[28%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 pt-1">
                      <span>95% Confidence Interval</span>
                      <span className="font-mono">0.18 – 0.38</span>
                    </div>
                  </div>

                  {/* Risk Distribution Donut */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 block">Risk Distribution</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-amber-500 border-r-rose-500 animate-spin-slow"></div>
                      <div className="text-[10px] space-y-1 font-bold">
                        <div className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span>Low Risk 65%</span></div>
                        <div className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span>Med Risk 25%</span></div>
                        <div className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span><span>High Risk 10%</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Contributing Factors & Recent Patients */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                  {/* Top Contributing Factors */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">Top Contributing Factors</span>
                    <div className="space-y-1.5">
                      <div>
                        <div className="flex justify-between font-semibold mb-0.5"><span>Glucose</span><span className="font-mono">0.42</span></div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full"><div className="bg-cyan-500 h-full w-[84%] rounded-full"></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold mb-0.5"><span>BMI</span><span className="font-mono">0.21</span></div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full"><div className="bg-blue-500 h-full w-[42%] rounded-full"></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold mb-0.5"><span>Age</span><span className="font-mono">0.15</span></div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full"><div className="bg-purple-500 h-full w-[30%] rounded-full"></div></div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Patients Table */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">Recent Patients</span>
                    <div className="space-y-1.5 font-mono text-[10px]">
                      <div className="flex justify-between items-center p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                        <span>P00123</span><span className="text-emerald-600 font-bold">Low Risk</span><span className="text-slate-400">2m ago</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                        <span>P00124</span><span className="text-amber-600 font-bold">Med Risk</span><span className="text-slate-400">5m ago</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                        <span>P00125</span><span className="text-rose-600 font-bold">High Risk</span><span className="text-slate-400">8m ago</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </AntiGravityCard>
          </div>

        </div>

        {/* 5 HORIZONTALLY FLOATING PILL METRIC CARDS */}
        <div className="mt-8 max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {pillMetrics.map((item, idx) => (
            <AntiGravityCard key={idx} floatDelay={`${idx * 0.2}s`} depth={0.5}>
              <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-md flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                  {item.icon}
                </div>
                <div>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono block leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block whitespace-nowrap">
                    {item.desc}
                  </span>
                </div>
              </div>
            </AntiGravityCard>
          ))}
        </div>

      </section>

      {/* ADVANCED FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 space-y-8 pt-6">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
            Why Choose Our Platform
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Advanced Features for Better <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600">Clinical Decisions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {features.map((item, idx) => (
            <AntiGravityCard key={idx} floatDelay={`${idx * 0.15}s`} depth={0.6}>
              <div className="p-4 rounded-2xl glass-card space-y-2.5 h-full flex flex-col justify-between">
                <div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 w-fit border border-slate-100 dark:border-slate-700 mb-2">
                    {item.icon}
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium mt-1">{item.description}</p>
                </div>
              </div>
            </AntiGravityCard>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS PROCESS WORKFLOW */}
      <section className="max-w-6xl mx-auto px-4 space-y-6 pt-4">
        <div className="text-left border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">How It Works</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {processSteps.map((step, idx) => (
            <AntiGravityCard key={idx} floatDelay={`${idx * 0.2}s`} depth={0.5}>
              <div className="p-3.5 rounded-2xl glass-card space-y-1.5 h-full relative">
                <span className="text-xs font-extrabold text-cyan-600 font-mono block">
                  {step.num}. {step.title}
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-normal">{step.desc}</p>
              </div>
            </AntiGravityCard>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 space-y-6 pt-6">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-card overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between font-extrabold text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-teal-600 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-t border-slate-100 dark:border-slate-800/80 pt-3 animate-fade-rise">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="max-w-3xl mx-auto px-4">
        <AntiGravityCard floatDelay="0.2s" depth={0.5}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6 glass-panel">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Clinical Inquiry & Institutional Access
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Connect with our medical AI team for hospital deployments and research collaboration.
              </p>
            </div>

            {contactSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Thank you for your inquiry! Our clinical AI team will reach out within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Jane Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 liquid-input rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Professional Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane.doe@hospital.org"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 liquid-input rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Healthcare Institution</label>
                <input
                  type="text"
                  placeholder="St. Jude Health System"
                  value={contactForm.institution}
                  onChange={(e) => setContactForm({ ...contactForm, institution: e.target.value })}
                  className="w-full px-4 py-2.5 liquid-input rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message / Inquiry</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe your institutional requirements..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-2.5 liquid-input rounded-xl text-xs"
                ></textarea>
              </div>

              <MagneticButton
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl liquid-btn-primary font-extrabold text-xs uppercase tracking-wider shadow-lg transition"
              >
                Submit Clinical Inquiry
              </MagneticButton>
            </form>
          </div>
        </AntiGravityCard>
      </section>

    </div>
  );
};

// Helper SVG icons
function TargetIcon({ className }) {
  return <Sparkles className={className} />;
}

function TestTubeIcon({ className }) {
  return <Activity className={className} />;
}
