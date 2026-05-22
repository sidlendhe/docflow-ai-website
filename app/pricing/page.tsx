"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  fadeIn,
  viewportOnce,
} from "@/lib/animations";
import CTABanner from "@/components/ui/CTABanner";
import PageHero from "@/components/ui/PageHero";
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  Lock,
  ArrowRight,
  Tag,
  Zap,
  TrendingUp,
  MessageSquare,
  FileCheck,
  Clock,
} from "lucide-react";

const plans = [
  {
    name: "Early Access",
    monthlyPrice: 297,
    annualPrice: 248,
    docs: "500 docs/mo",
    support: "Email (next business day)",
    features: [
      { label: "Core extraction agent", included: true },
      { label: "Google Sheets output", included: true },
      { label: "Email & Telegram ingest", included: true },
      { label: "Human-in-the-loop review flags", included: true },
      { label: "Setup included", included: true },
      { label: "2-week free trial", included: true },
      { label: "Monthly usage report", included: false },
      { label: "Priority 4hr fixes", included: false },
      { label: "Add-on agents", included: false },
    ],
    highlight: false,
    badge: null,
  },
  {
    name: "Standard",
    monthlyPrice: 497,
    annualPrice: 414,
    docs: "2,000 docs/mo",
    support: "Priority (within 4 hrs)",
    features: [
      { label: "Core extraction agent", included: true },
      { label: "Google Sheets output", included: true },
      { label: "Email & Telegram ingest", included: true },
      { label: "Human-in-the-loop review flags", included: true },
      { label: "Setup included", included: true },
      { label: "2-week free trial", included: true },
      { label: "Monthly usage report", included: true },
      { label: "Priority 4hr fixes", included: true },
      { label: "Add-on agents", included: false },
    ],
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Premium",
    monthlyPrice: 697,
    annualPrice: 581,
    docs: "High volume",
    support: "Dedicated check-ins",
    features: [
      { label: "Core extraction agent", included: true },
      { label: "Google Sheets output", included: true },
      { label: "Email & Telegram ingest", included: true },
      { label: "Human-in-the-loop review flags", included: true },
      { label: "Setup included", included: true },
      { label: "2-week free trial", included: true },
      { label: "Monthly usage report", included: true },
      { label: "Priority 4hr fixes", included: true },
      { label: "Add-on agents", included: true },
    ],
    highlight: false,
    badge: null,
  },
];

const addons = [
  {
    icon: Tag,
    name: "Receipt Categorisation",
    price: "Included in Premium",
    desc: "Auto-tags expense receipts by category. Learns your clients' patterns over time.",
    badge: null,
  },
  {
    icon: MessageSquare,
    name: "Client Email Triage",
    price: "+$97/mo",
    desc: "Automatically sorts and prioritises inbound client emails by urgency and type.",
    badge: null,
  },
  {
    icon: FileCheck,
    name: "BAS Prep Reviewer",
    price: "+$150/mo",
    desc: "Reviews your BAS prep checklist against extracted data and flags discrepancies.",
    badge: null,
  },
  {
    icon: Zap,
    name: "Quote Generator",
    price: "Coming soon",
    desc: "Converts job request PDFs and emails into structured quotes. Ideal for trades.",
    badge: "Coming soon",
  },
];

const billingFaqs = [
  {
    q: "Is there a free trial?",
    a: "Yes — every plan starts with a 2-week free trial using your real invoices. No credit card required to start. We'll test the extraction against your actual PDFs and tune it before you pay anything.",
  },
  {
    q: "Is GST included in the prices?",
    a: "No GST is charged at this stage. DocFlow AI is currently below the $75,000/yr GST registration threshold. We will notify all clients before adding GST to invoices if and when we cross that threshold.",
  },
  {
    q: "What if I go over my monthly document cap?",
    a: "We'll notify you before your cap is reached. Overages are charged at $0.20/doc above your limit, or we can discuss upgrading your plan. There are no surprise bills — you'll always see it coming.",
  },
  {
    q: "How do I cancel?",
    a: "Email us any time. There's no lock-in contract — cancel before your next billing date and you won't be charged again. Your Google Sheet data is yours to keep.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Stripe (credit/debit card) and bank transfer via invoice. Annual clients can pay by bank transfer for an additional discount. Zoho Books handles invoicing and receipts.",
  },
];

function BillingFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {billingFaqs.map((faq, i) => (
        <motion.div
          key={i}
          className="rounded-xl overflow-hidden bg-white"
          style={{ border: "1px solid #e2e8f0" }}
          layout
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
          >
            <span
              className="font-semibold text-sm"
              style={{ color: "var(--navy-mid)", fontFamily: "var(--font-sora)" }}
            >
              {faq.q}
            </span>
            <motion.div
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </motion.div>
          </button>
          {open === i && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-4"
              style={{ borderLeft: "3px solid var(--cyan)" }}
            >
              <p className="text-slate-600 text-sm leading-relaxed pt-2">{faq.a}</p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <PageHero
        headline="Honest pricing. Cancel any time."
        subtext="Every plan starts with a 2-week free trial using your real invoices. No lock-in. No surprises."
        breadcrumb="Pricing"
        accentWord="Honest pricing."
      />

      {/* ── BILLING TOGGLE ────────────────────────────────────────────── */}
      <section
        className="py-6 px-4 flex justify-center"
        style={{ backgroundColor: "var(--navy)" }}
      >
        <div
          className="flex items-center gap-3 p-1 rounded-xl"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={() => setAnnual(false)}
            className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={
              !annual
                ? { backgroundColor: "var(--cyan)", color: "var(--navy)" }
                : { color: "rgba(255,255,255,0.6)" }
            }
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className="px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
            style={
              annual
                ? { backgroundColor: "var(--cyan)", color: "var(--navy)" }
                : { color: "rgba(255,255,255,0.6)" }
            }
          >
            Annual
            <AnimatePresence>
              {annual && (
                <motion.span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "var(--navy)", color: "var(--cyan)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  Save 16%
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </section>

      {/* ── PRICING CARDS ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                className="rounded-2xl p-7 relative flex flex-col"
                style={
                  plan.highlight
                    ? {
                        backgroundColor: "var(--navy-mid)",
                        color: "white",
                        boxShadow: "0 20px 60px rgba(10,22,40,0.25)",
                      }
                    : {
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                      }
                }
                variants={scaleIn}
              >
                {plan.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "var(--cyan)", color: "var(--navy)" }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className="font-bold text-xl mb-3"
                    style={{
                      fontFamily: "var(--font-sora)",
                      color: plan.highlight ? "var(--cyan)" : "var(--navy-mid)",
                    }}
                  >
                    {plan.name}
                  </h3>

                  <div className="flex items-end gap-2 mb-1">
                    <span
                      className="text-4xl font-bold"
                      style={{
                        fontFamily: "var(--font-sora)",
                        color: plan.highlight ? "white" : "var(--navy-mid)",
                      }}
                    >
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span
                      className="text-sm mb-1"
                      style={{ color: plan.highlight ? "rgba(255,255,255,0.5)" : "#94a3b8" }}
                    >
                      /mo{annual ? " (billed annually)" : ""}
                    </span>
                  </div>

                  {annual && (
                    <motion.p
                      className="text-xs font-medium"
                      style={{ color: "var(--cyan)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr
                    </motion.p>
                  )}

                  <p
                    className="text-xs mt-2"
                    style={{ color: plan.highlight ? "rgba(255,255,255,0.4)" : "#94a3b8" }}
                  >
                    {plan.docs} · {plan.support}
                  </p>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-center gap-2.5 text-sm"
                      style={{
                        color: f.included
                          ? plan.highlight
                            ? "rgba(255,255,255,0.85)"
                            : "#475569"
                          : plan.highlight
                          ? "rgba(255,255,255,0.25)"
                          : "#cbd5e1",
                      }}
                    >
                      {f.included ? (
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: "var(--cyan)" }}
                        />
                      ) : (
                        <XCircle className="w-4 h-4 shrink-0 text-slate-300" />
                      )}
                      {f.label}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="block text-center py-3 rounded-xl font-semibold text-sm transition-all"
                  style={
                    plan.highlight
                      ? { backgroundColor: "var(--cyan)", color: "var(--navy)" }
                      : {
                          border: "2px solid var(--cyan)",
                          color: "var(--cyan-dark)",
                        }
                  }
                >
                  Start 2-week free trial
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* What's in every plan */}
          <motion.div
            className="mt-12 rounded-2xl p-8"
            style={{
              backgroundColor: "var(--off-white)",
              border: "1px solid #e2e8f0",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <h3
              className="font-bold text-lg mb-5 text-center"
              style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
            >
              What&apos;s included in every plan
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "2-week free trial",
                "No lock-in contract",
                "Google Sheets output",
                "Xero & MYOB-ready columns",
                "Human-in-the-loop flags",
                "Telegram notifications",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--cyan)" }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ADD-ON AGENTS ─────────────────────────────────────────────── */}
      <section
        className="py-16 px-4 section-diagonal-top"
        style={{ backgroundColor: "var(--off-white)" }}
      >
        <div className="max-w-5xl mx-auto">
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
              Expand with{" "}
              <span className="gradient-text">add-on agents</span>
            </h2>
            <p className="text-slate-500">
              Bolt on more automation as your needs grow.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {addons.map((addon) => (
              <motion.div
                key={addon.name}
                className="p-6 rounded-2xl bg-white relative"
                style={{ border: "1px solid #e2e8f0" }}
                variants={fadeUp}
                whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
                transition={{ duration: 0.2 }}
              >
                {addon.badge && (
                  <span
                    className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "var(--cyan-light)", color: "var(--cyan-dark)" }}
                  >
                    {addon.badge}
                  </span>
                )}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--cyan-light)" }}
                >
                  <addon.icon className="w-5 h-5" style={{ color: "var(--cyan-dark)" }} />
                </div>
                <h3
                  className="font-bold mb-1"
                  style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
                >
                  {addon.name}
                </h3>
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--cyan-dark)" }}
                >
                  {addon.price}
                </p>
                <p className="text-sm text-slate-500">{addon.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CUSTOM / HIGH VOLUME ──────────────────────────────────────── */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ backgroundColor: "var(--cyan-light)", border: "1px solid rgba(0,194,203,0.3)" }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div>
              <h3
                className="font-bold text-xl mb-1"
                style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
              >
                Processing 2,000+ docs/month?
              </h3>
              <p className="text-slate-600 text-sm">
                Custom field extraction and integrations from $2,500 setup + lower MRR.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shrink-0"
              style={{ backgroundColor: "var(--navy-mid)", color: "var(--cyan)" }}
            >
              Get a custom quote <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ANNUAL PREPAY ─────────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="rounded-xl px-6 py-4 flex items-center gap-4"
            style={{ border: "1px solid #e2e8f0", backgroundColor: "var(--off-white)" }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeIn}
          >
            <Lock className="w-5 h-5 shrink-0" style={{ color: "var(--cyan-dark)" }} />
            <p className="text-sm text-slate-600">
              <strong className="font-semibold" style={{ color: "var(--navy-mid)" }}>
                Pay annually, get 2 months free.
              </strong>{" "}
              Lock in 12 months on any plan and save 16.7%. Standard plan: pay $4,968/yr instead of $5,964/yr.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BILLING FAQ ───────────────────────────────────────────────── */}
      <section
        className="py-16 px-4 section-diagonal-top"
        style={{ backgroundColor: "var(--off-white)" }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <h2
              className="display-md mb-2"
              style={{ color: "var(--navy-mid)" }}
            >
              Billing questions
            </h2>
          </motion.div>
          <BillingFAQ />
          <motion.p
            className="text-center mt-6 text-sm text-slate-500"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            More questions?{" "}
            <Link
              href="/faqs"
              className="font-semibold hover:underline"
              style={{ color: "var(--cyan-dark)" }}
            >
              View all FAQs →
            </Link>
          </motion.p>
        </div>
      </section>

      <CTABanner
        headline="Start free. Pay only when it's working."
        subtext="Two weeks to test DocFlow AI against your real invoices. If it doesn't save you time, you don't pay."
        primaryLabel="Start Your Free Trial"
        secondaryLabel="View FAQs"
        secondaryHref="/faqs"
      />
    </>
  );
}
