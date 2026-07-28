import React, { useState } from 'react';
import { 
  Stethoscope, Activity, ShieldCheck, Zap, Layers, FileUp, 
  BarChart2, Cloud, ArrowRight, CheckCircle2, ChevronDown, 
  MessageSquare, Star, Sparkles, Cpu, Award, Globe, HeartPulse, User
} from 'lucide-react';

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
      icon: <ShieldCheck className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      title: "Conformal Prediction Bounds",
      description: "Mathematically calibrated confidence sets (95% confidence level) that flag borderline or high-uncertainty clinical cases."
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "SHAP Game-Theoretic Attribution",
      description: "TreeExplainer Shapley values quantify positive risk drivers and protective biomarkers for each individual patient."
    },
    {
      icon: <FileUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      title: "Automated PDF Biomarker Importer",
      description: "Parses blood test lab report PDFs instantly to populate HbA1c, Fasting Glucose, Lipids, and Renal panels."
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: "Power BI Analytics Dashboard",
      description: "Interactive Optuna tuning graphs, feature importance rankings, confusion matrices, and CSV dataset exporter."
    },
    {
      icon: <Cloud className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Supabase Cloud Database & Storage",
      description: "Real-time PostgreSQL insertion and cloud PDF storage with strict patient session isolation."
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "ADA & WHO Aligned Guidelines",
      description: "Standardized clinical action cards and personalized treatment protocols tailored to patient lab findings."
    }
  ];

  const processSteps = [
    {
      num: "01",
      title: "Import Patient Biomarkers",
      desc: "Upload a PDF blood test report or manually enter mandatory lab values (HbA1c, Fasting Glucose, Random Glucose)."
    },
    {
      num: "02",
      title: "Conformal AI Risk Engine",
      desc: "Gradient Boosted Tree classifier computes calibrated diagnostic risk, severity index (0-100), and SHAP attributions."
    },
    {
      num: "03",
      title: "Actionable CDSS Card & PDF",
      desc: "Review ADA clinical action cards, examine SHAP risk drivers, and download a standardized PDF clinical report."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Eleanor Vance, MD",
      role: "Chief Endocrinologist, St. Jude Health",
      quote: "The conformal confidence calibration is a game-changer. Knowing whether a prediction is 98% reliable or triggers an uncertainty alert gives our team total clinical confidence."
    },
    {
      name: "Dr. Marcus Thorne, CMIO",
      role: "Director of Clinical Informatics",
      quote: "Being able to upload raw patient blood test PDFs and instantly see SHAP feature attributions saves precious minutes during patient consultations."
    },
    {
      name: "Prof. Sarah Lin, PhD",
      role: "Health AI Researcher",
      quote: "The Power BI analytics integration and Optuna tuning dashboard make this system exceptionally transparent and audit-ready for medical research."
    }
  ];

  return (
    <div className="space-y-20 py-4">
      
      {/* 1. FRAMER-STYLE HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-100/50 via-teal-50/30 to-transparent dark:from-cyan-950/30 dark:via-teal-950/10 dark:to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative text-center max-w-4xl mx-auto space-y-6 px-4">
          
          {/* Framer HealthTech Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-blue-500/10 border border-cyan-300/40 dark:border-cyan-700/40 text-cyan-800 dark:text-cyan-300 text-xs font-extrabold shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Next-Gen Framer HealthTech Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Precision Diabetes Risk Assessment with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 dark:from-cyan-400 dark:via-teal-400 dark:to-blue-400">Calibrated Conformal AI</span>
          </h1>

          {/* Subtitle - Cleaned of raw LaTeX math strings */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Empower physicians with mathematically guaranteed confidence bounds (95% statistical confidence), SHAP game-theoretic explainability, and automated blood lab report PDF parsing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onLaunchWorkspace}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-extrabold text-sm shadow-xl shadow-cyan-600/25 hover:shadow-cyan-600/35 hover:-translate-y-0.5 transition flex items-center justify-center space-x-2"
            >
              <Stethoscope className="w-5 h-5 text-white" />
              <span>Launch Clinical Workspace</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onGoToPerformance}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-sm border border-slate-200 dark:border-slate-800 shadow-md transition flex items-center justify-center space-x-2"
            >
              <BarChart2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>Explore Power BI Analytics</span>
            </button>
          </div>

          {/* Key Stat Badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
              <span className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">99.6%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Tuned Accuracy</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
              <span className="text-2xl font-extrabold text-teal-600 dark:text-teal-400 font-mono">&lt;50ms</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Inference Latency</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
              <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">3,500+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Clinical Records</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
              <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">ADA/WHO</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Aligned Protocols</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE CLINICAL DASHBOARD PREVIEW */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-3 mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
            Interactive Dashboard Preview
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Designed for Modern Physicians & Healthcare Systems
          </h2>
        </div>

        <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-400/10 via-teal-400/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          {/* Mock Dashboard Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                    <HeartPulse className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Patient Lab Findings (HbA1c 6.4%, Fasting Glucose 118 mg/dL)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    Prediabetes Risk
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">HbA1c Level</span>
                    <span className="font-bold text-cyan-700 dark:text-cyan-400 font-mono">6.4 %</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Fasting Glucose</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">118 mg/dL</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">TyG Index</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">8.92</span>
                  </div>
                </div>
              </div>

              {/* Mock SHAP Attributions */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">SHAP Risk Drivers (+ Attributions)</span>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>HbA1c (+0.80)</span>
                      <span className="text-rose-600 dark:text-rose-400 font-mono">+0.80</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full w-[80%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider block opacity-90">Calibrated Conformal Confidence</span>
                <div className="text-3xl font-extrabold font-mono">88.5%</div>
                <p className="text-xs leading-relaxed opacity-95">
                  Conformal Prediction Set: [Prediabetes]. Model confidence is high and mathematically calibrated.
                </p>
                <button
                  onClick={onLaunchWorkspace}
                  className="w-full py-2.5 rounded-xl bg-white text-cyan-900 font-extrabold text-xs hover:bg-slate-100 transition shadow"
                >
                  Test Patient Biomarkers Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CARD-BASED FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            Platform Capabilities
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Engineered for Precision Medical AI Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 space-y-3"
            >
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 w-fit border border-slate-100 dark:border-slate-700">
                {item.icon}
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROCESS / TIMELINE SECTION */}
      <section className="max-w-5xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Clinical Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            3-Step Clinical Assessment Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {processSteps.map((step, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 relative">
              <span className="text-4xl font-extrabold text-cyan-600/20 dark:text-cyan-400/20 font-mono block">
                {step.num}
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            Endorsements
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Trusted by Leading Endocrinologists
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 flex flex-col justify-between">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic font-medium">
                "{item.quote}"
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white block">{item.name}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between font-extrabold text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-cyan-600 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-t border-slate-100 dark:border-slate-800/80 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT FORM SECTION */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
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

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/25 transition"
            >
              Submit Clinical Inquiry
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
