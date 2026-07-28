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
    <div className="space-y-12 py-4 relative z-10">
      
      {/* HERO SECTION CENTERED LAYOUT */}
      <section className="relative overflow-hidden pt-6 pb-6">
        
        {/* Apple Vision Pro Ambient Light Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-gradient-to-b from-cyan-200/40 via-sky-100/30 to-transparent dark:from-cyan-950/25 dark:via-sky-950/20 dark:to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative text-center max-w-4xl mx-auto space-y-6 px-4 z-10">
          
          {/* Feature Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-100/70 dark:bg-cyan-950/70 border border-cyan-300/60 dark:border-cyan-700/60 text-cyan-800 dark:text-cyan-300 text-xs font-extrabold shadow-sm backdrop-blur-md animate-fade-rise">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-spin-slow" />
            <span>Next-Gen Framer HealthTech Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] animate-fade-rise stagger-1">
            Precision Diabetes Risk Assessment with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 dark:from-cyan-400 dark:via-teal-400 dark:to-blue-400">Calibrated Conformal AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium animate-fade-rise stagger-2">
            Empower physicians with mathematically guaranteed confidence bounds (95% statistical confidence), SHAP game-theoretic explainability, and automated blood lab report PDF parsing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 animate-fade-rise stagger-3">
            <MagneticButton
              onClick={onLaunchWorkspace}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl liquid-btn-primary font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-cyan-600/25"
            >
              <Stethoscope className="w-5 h-5 text-white icon-nudge" />
              <span>Launch Clinical Workspace</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </MagneticButton>

            <MagneticButton
              onClick={onGoToPerformance}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs sm:text-sm border border-slate-200 dark:border-slate-800 shadow-sm transition flex items-center justify-center space-x-2"
            >
              <BarChart2 className="w-5 h-5 text-amber-600 dark:text-amber-400 icon-nudge" />
              <span>Explore Power BI Analytics</span>
            </MagneticButton>
          </div>

        </div>

        {/* 5 HORIZONTALLY FLOATING PILL METRIC CARDS */}
        <div className="mt-10 max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {pillMetrics.map((item, idx) => (
            <AntiGravityCard key={idx} floatDelay={`${idx * 0.15}s`} depth={0.5}>
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-md flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                  {item.icon}
                </div>
                <div>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono block leading-tight">
                    {item.title}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block whitespace-nowrap">
                    {item.desc}
                  </span>
                </div>
              </div>
            </AntiGravityCard>
          ))}
        </div>

      </section>

      {/* ADVANCED FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 space-y-6 pt-2">
        <div className="text-center space-y-1.5">
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
      <section className="max-w-6xl mx-auto px-4 space-y-4 pt-0">
        <div className="text-left border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">How It Works</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {processSteps.map((step, idx) => (
            <AntiGravityCard key={idx} floatDelay={`${idx * 0.15}s`} depth={0.5}>
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
      <section className="max-w-4xl mx-auto px-4 space-y-4 pt-2">
        <div className="text-center space-y-1.5">
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-7 shadow-xl space-y-5 glass-panel">
            <div className="text-center space-y-1.5">
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
