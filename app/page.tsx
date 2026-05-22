"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  fadeUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import CTABanner from "@/components/ui/CTABanner";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Mail,
  MessageCircle,
  FileText,
  Brain,
  Sheet,
  Eye,
  Clock,
  TrendingUp,
  Shield,
  Users,
  Briefcase,
  Wrench,
  Building2,
  ChevronRight,
} from "lucide-react";

// ── Animated Counter Hook ──────────────────────────────────────────────────
function useCounter(target: number, duration = 1.5) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

// ── Audience segment data ─────────────────────────────────────────────────
const audiences = [
  {
    id: "accounting",
    label: "Accounting Firms",
    icon: Building2,
    headline: "Stop retyping what the AI can read.",
    subtext:
      "Invoice PDFs hit your inbox and land in a Xero-ready Google Sheet automatically — every field, every time. Flag-and-review for anything uncertain.",
    features: [
      "Email or Telegram PDF ingest",
      "Xero & MYOB-ready column headers",
      "BAS prep checklist reviewer (add-on)",
      "Per-client usage reports",
    ],
    image: "/images/demo-accountants.png",
  },
  {
    id: "bookkeepers",
    label: "Bookkeepers",
    icon: Briefcase,
    headline: "Handle more clients without more hours.",
    subtext:
      "Manage invoice extraction across multiple client accounts from a single workflow. Receipt categorisation and email triage available as add-ons.",
    features: [
      "Multi-client support out of the box",
      "Receipt categorisation learner (Premium)",
      "Client email triage (+$97/mo)",
      "Sender allowlist for security",
    ],
    image: "/images/demo-accountants.png",
  },
  {
    id: "tradies",
    label: "Trades Businesses",
    icon: Wrench,
    headline: "You quote the job. We handle the paperwork.",
    subtext:
      "Forward quotes and supplier invoices via your phone. Data lands in your sheet — no retyping, no chasing receipts at month end.",
    features: [
      "Mobile-first: forward from your phone",
      "Scanned & image PDFs supported",
      "Quote data extraction (coming soon)",
      "Works with any accounting software",
    ],
    image: "/images/demo-tradies.png",
  },
  {
    id: "smallbiz",
    label: "Small Business Owners",
    icon: Users,
    headline: "Your time is worth more than data entry.",
    subtext:
      "No IT team needed. Forward supplier invoices by email — your spreadsheet updates within minutes. Cancel any time.",
    features: [
      "Dead simple: just forward your PDFs",
      "No subscriptions to complex software",
      "2-week free trial with real invoices",
      "Human-in-the-loop — no silent errors",
    ],
    image: "/images/demo-email-forward.png",
  },
];

// ── Flow steps data ──────────────────────────────────────────────────────
const flowSteps = [
  {
    num: "01",
    icon: Mail,
    title: "Send your PDFs",
    desc: "Forward invoices to a dedicated email address or Telegram bot.",
  },
  {
    num: "02",
    icon: Brain,
    title: "AI extracts data",
    desc: "Every field captured — supplier, amount, GST, due date and more.",
  },
  {
    num: "03",
    icon: Sheet,
    title: "Sheet updated",
    desc: "Data lands in your Google Sheet, Xero-ready, within minutes.",
  },
];

// ── Pricing snapshot data ───────────────────────────────────────────────
const plans = [
  {
    name: "Early Access",
    price: 297,
    docs: "500 docs/mo",
    features: ["Core extraction agent", "Email support", "Setup included"],
    highlight: false,
  },
  {
    name: "Standard",
    price: 497,
    docs: "2,000 docs/mo",
    features: [
      "Priority fixes (4hr SLA)",
      "Monthly usage report",
      "Core extraction agent",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: 697,
    docs: "High volume",
    features: [
      "Core agent + one add-on",
      "Dedicated check-ins",
      "Custom field extraction",
    ],
    highlight: false,
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("accounting");
  const { count: hrCount, ref: hrRef } = useCounter(10);
  const { count: secCount, ref: secRef } = useCounter(60);
  const { count: marginCount, ref: marginRef } = useCounter(80);
  const activeAudience = audiences.find((a) => a.id === activeTab)!;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="min-h-screen flex items-center pt-16 pb-12 px-4 relative overflow-hidden"
        style={{ backgroundColor: "var(--navy)" }}
      >
        <div className="absolute inset-0 dot-grid-bg opacity-50" />

        {/* Subtle radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--cyan) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left column (60%) */}
            <div className="lg:col-span-3">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
                style={{
                  backgroundColor: "rgba(0,194,203,0.12)",
                  border: "1px solid rgba(0,194,203,0.25)",
                  color: "var(--cyan)",
                }}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" style={{ backgroundColor: "var(--cyan)" }} />
                AI document automation · Brisbane, Australia
              </motion.div>

              <motion.h1
                className="display-xl text-white mb-6"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                Your invoices,{" "}
                <span className="gradient-text">extracted.</span>
                <br />
                Your time,{" "}
                <span className="gradient-text">reclaimed.</span>
              </motion.h1>

              <motion.p
                className="text-white/65 text-lg leading-relaxed mb-8 max-w-xl"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                DocFlow AI reads your PDF invoices and delivers structured data
                straight to your Google Sheet — ready for Xero or MYOB. No IT
                team. No setup headaches. Just forward your PDFs.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <motion.a
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-navy text-base"
                  style={{ backgroundColor: "var(--cyan)" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book a Free 10-min Call
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/how-it-works"
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                  >
                    See How It Works
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.p
                className="mt-5 text-sm text-white/35"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                2-week free trial · No credit card required · Cancel any time
              </motion.p>
            </div>

            {/* Right column (40%) — hero image */}
            <motion.div
              className="lg:col-span-2 relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="float-animation">
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl"
                  style={{ border: "1px solid rgba(0,194,203,0.2)" }}
                >
                  <Image
                    src="/images/hero-dashboard.png"
                    alt="DocFlow AI dashboard showing invoice extraction workflow"
                    width={680}
                    height={460}
                    className="w-full"
                    priority
                  />
                </div>
              </div>
              {/* Glow under image */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl opacity-30 pointer-events-none"
                style={{ backgroundColor: "var(--cyan)" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--off-white)" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div ref={hrRef}>
              <p
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
              >
                {hrCount}+{" "}
                <span className="text-2xl" style={{ color: "var(--cyan)" }}>
                  hrs/week
                </span>
              </p>
              <p className="text-sm text-slate-500">saved on data entry</p>
            </div>
            <div ref={secRef}>
              <p
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
              >
                {"<"}{secCount}{" "}
                <span className="text-2xl" style={{ color: "var(--cyan)" }}>
                  seconds
                </span>
              </p>
              <p className="text-sm text-slate-500">per invoice extracted</p>
            </div>
            <div ref={marginRef}>
              <p
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
              >
                {marginCount}%+{" "}
              </p>
              <p className="text-sm text-slate-500">gross margin for your firm</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS MARQUEE ─────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto mb-4 text-center">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">
            Works seamlessly with your existing tools
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="marquee-track">
            {[
              "Xero",
              "MYOB",
              "QuickBooks",
              "Google Sheets",
              "Telegram",
              "Gmail",
              "Xero",
              "MYOB",
              "QuickBooks",
              "Google Sheets",
              "Telegram",
              "Gmail",
            ].map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-2 mx-10 text-slate-400 font-semibold text-sm whitespace-nowrap"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--cyan)" }}
                />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OLD WAY VS DOCFLOW AI WAY ────────────────────────────────────── */}
      <section
        className="py-20 px-4 section-diagonal-top"
        style={{ backgroundColor: "var(--off-white)" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <h2
              className="display-md mb-3"
              style={{ color: "var(--navy-mid)" }}
            >
              The old way. <span className="gradient-text">The better way.</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Manual invoice entry drains time and introduces errors. DocFlow AI
              eliminates both.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Old way */}
            <motion.div
              className="rounded-2xl p-8 bg-white"
              style={{ border: "1px solid #e2e8f0" }}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInLeft}
            >
              <h3
                className="font-bold text-lg mb-6 flex items-center gap-2"
                style={{ fontFamily: "var(--font-sora)", color: "#ef4444" }}
              >
                <XCircle className="w-5 h-5" />
                The manual way
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  "Open each PDF invoice one by one",
                  "Manually type every field into a spreadsheet",
                  "Chase down scanned or image-only PDFs",
                  "Discover typos and errors at BAS time",
                  "10–15 hours per week lost to data entry",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* DocFlow way */}
            <motion.div
              className="rounded-2xl p-8 bg-white"
              style={{
                border: "1px solid rgba(0,194,203,0.3)",
                boxShadow: "0 0 0 1px rgba(0,194,203,0.1), 0 8px 32px rgba(0,194,203,0.08)",
              }}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInRight}
            >
              <h3
                className="font-bold text-lg mb-6 flex items-center gap-2"
                style={{ fontFamily: "var(--font-sora)", color: "var(--cyan-dark)" }}
              >
                <CheckCircle2 className="w-5 h-5" style={{ color: "var(--cyan)" }} />
                The DocFlow AI way
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  "Forward PDFs by email or Telegram — done",
                  "AI extracts every field in under 60 seconds",
                  "Scanned & image PDFs? Handled with OCR",
                  "Low-confidence rows flagged for quick review",
                  "Hours saved every week, consistently",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--cyan)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS TEASER ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <h2
              className="display-md mb-3"
              style={{ color: "var(--navy-mid)" }}
            >
              Up and running in{" "}
              <span className="gradient-text">3 simple steps</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              No developers needed. No complex setup. Just forward your PDFs.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {flowSteps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative p-8 rounded-2xl bg-white card-accent group hover:shadow-lg transition-all duration-300"
                style={{ border: "1px solid #e2e8f0" }}
                variants={fadeUp}
              >
                <span className="section-number absolute -top-4 -right-2 leading-none">
                  {step.num}
                </span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "var(--cyan-light)" }}
                >
                  <step.icon className="w-6 h-6" style={{ color: "var(--cyan-dark)" }} />
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-500">{step.desc}</p>

                {i < flowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
              style={{ color: "var(--cyan-dark)" }}
            >
              See the full walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── BUILT FOR YOUR INDUSTRY (AUDIENCE TABS) ──────────────────────── */}
      <section
        className="py-20 px-4 section-diagonal-top"
        style={{ backgroundColor: "var(--off-white)" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <h2
              className="display-md mb-3"
              style={{ color: "var(--navy-mid)" }}
            >
              Built for{" "}
              <span className="gradient-text">your industry</span>
            </h2>
            <p className="text-slate-500 text-lg">
              One platform, tailored for the way you work.
            </p>
          </motion.div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {audiences.map((a) => (
              <button
                key={a.id}
                onClick={() => setActiveTab(a.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={
                  activeTab === a.id
                    ? {
                        backgroundColor: "var(--cyan)",
                        color: "var(--navy)",
                      }
                    : {
                        backgroundColor: "white",
                        color: "var(--navy-mid)",
                        border: "1px solid #e2e8f0",
                      }
                }
              >
                <a.icon className="w-4 h-4" />
                {a.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="lg:col-span-3">
                <h3
                  className="display-md mb-4"
                  style={{ color: "var(--navy-mid)" }}
                >
                  {activeAudience.headline}
                </h3>
                <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                  {activeAudience.subtext}
                </p>
                <ul className="flex flex-col gap-3">
                  {activeAudience.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2
                        className="w-5 h-5 shrink-0"
                        style={{ color: "var(--cyan)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-navy text-sm"
                    style={{ backgroundColor: "var(--cyan)" }}
                  >
                    Start your free trial <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div
                  className="rounded-2xl overflow-hidden shadow-xl"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <Image
                    src={activeAudience.image}
                    alt={activeAudience.headline}
                    width={600}
                    height={420}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── DEMO SPOTLIGHT ───────────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "var(--navy-mid)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <h2 className="display-md text-white mb-3">
              See the{" "}
              <span className="gradient-text">difference</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Human-in-the-loop review means nothing slips through — uncertain
              rows are flagged, not silently posted.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={scaleIn}
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: "1px solid rgba(0,194,203,0.2)" }}
            >
              <Image
                src="/images/demo-before-after.png"
                alt="Before and after DocFlow AI — manual entry vs automated extraction"
                width={1000}
                height={560}
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING SNAPSHOT ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <h2
              className="display-md mb-3"
              style={{ color: "var(--navy-mid)" }}
            >
              Simple, honest{" "}
              <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-slate-500 text-lg">
              No lock-in. Cancel any time. 2-week free trial on all plans.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                className="rounded-2xl p-7 relative"
                style={
                  plan.highlight
                    ? {
                        backgroundColor: "var(--navy-mid)",
                        color: "white",
                        transform: "scale(1.03)",
                        boxShadow: "0 20px 60px rgba(10,22,40,0.3)",
                      }
                    : {
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                      }
                }
                variants={scaleIn}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-navy"
                    style={{ backgroundColor: "var(--cyan)" }}
                  >
                    Most popular
                  </div>
                )}
                <h3
                  className="font-bold text-lg mb-1"
                  style={{
                    fontFamily: "var(--font-sora)",
                    color: plan.highlight ? "var(--cyan)" : "var(--navy-mid)",
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-3xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-sora)",
                    color: plan.highlight ? "white" : "var(--navy-mid)",
                  }}
                >
                  ${plan.price}
                  <span className="text-sm font-normal opacity-60">/mo</span>
                </p>
                <p
                  className="text-xs mb-5"
                  style={{ color: plan.highlight ? "rgba(255,255,255,0.5)" : "#94a3b8" }}
                >
                  {plan.docs}
                </p>
                <ul className="flex flex-col gap-2 mb-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: plan.highlight ? "rgba(255,255,255,0.7)" : "#64748b" }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0"
                        style={{ color: "var(--cyan)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block text-center py-3 rounded-xl font-semibold text-sm transition-all"
                  style={
                    plan.highlight
                      ? { backgroundColor: "var(--cyan)", color: "var(--navy)" }
                      : { border: "1px solid var(--cyan)", color: "var(--cyan-dark)" }
                  }
                >
                  Start free trial
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ color: "var(--cyan-dark)" }}
            >
              View full pricing details <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <CTABanner
        headline="Two weeks, free. No contracts, no lock-in."
        subtext="Join Australian accounting firms saving hours every week with DocFlow AI."
        primaryLabel="Book a Free 10-min Call"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
