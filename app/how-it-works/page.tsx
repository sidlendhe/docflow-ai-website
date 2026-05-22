"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  fadeUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  drawLine,
  viewportOnce,
} from "@/lib/animations";
import CTABanner from "@/components/ui/CTABanner";
import PageHero from "@/components/ui/PageHero";
import {
  Mail,
  MessageCircle,
  Brain,
  Sheet,
  Eye,
  CheckCircle2,
  Shield,
  Lock,
  Database,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const extractedFields = [
  "Invoice Date",
  "Invoice Number",
  "Supplier Name",
  "Supplier ABN",
  "Amount (ex-GST)",
  "GST Amount",
  "Total (inc-GST)",
  "Due Date",
  "Payment Terms",
];

const audienceWorkflows = [
  {
    id: "accounting",
    label: "Accounting Firms",
    content:
      "Set up a dedicated email label in Gmail. Instruct clients to forward invoices to your unique DocFlow email address. Every PDF is processed within minutes and appears in your Xero-ready Google Sheet. Uncertain rows are flagged — you review in seconds, not minutes. Monthly usage reports keep you informed.",
  },
  {
    id: "bookkeepers",
    label: "Bookkeepers",
    content:
      "Manage multiple client accounts from a single DocFlow AI subscription. Each client gets their own Google Sheet. Sender allowlists ensure only authorised emails trigger extraction. The receipt categorisation add-on auto-tags expenses — saving even more time at month end.",
  },
  {
    id: "tradies",
    label: "Trades Businesses",
    content:
      "On the job site and get a supplier invoice? Photograph it, forward it via Telegram or email. DocFlow AI handles scanned and image-only PDFs using OCR — messy documents included. Your spreadsheet is updated before you're back at the office.",
  },
  {
    id: "smallbiz",
    label: "Small Business Owners",
    content:
      "No setup required beyond forwarding an email. We send you a unique address. You forward invoices to it. That's it. No subscriptions to learn, no dashboards to manage. Just check your Google Sheet at month end — everything's there.",
  },
];

function WorkflowAccordion() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {audienceWorkflows.map((item) => (
        <motion.div
          key={item.id}
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #e2e8f0" }}
          layout
        >
          <button
            onClick={() => setOpen(open === item.id ? null : item.id)}
            className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-slate-50 transition-colors text-left"
          >
            <span
              className="font-semibold"
              style={{
                fontFamily: "var(--font-sora)",
                color: "var(--navy-mid)",
              }}
            >
              {item.label}
            </span>
            <motion.div
              animate={{ rotate: open === item.id ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          </button>
          {open === item.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-6 pb-5 bg-white"
              style={{ borderLeft: "3px solid var(--cyan)" }}
            >
              <p className="text-slate-600 leading-relaxed pt-2">{item.content}</p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        headline="From inbox to spreadsheet — automatically."
        subtext="DocFlow AI handles the full extraction pipeline so you don't have to touch a single cell manually."
        breadcrumb="How It Works"
        accentWord="automatically"
      />

      {/* ── PIPELINE OVERVIEW ─────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
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
              The complete{" "}
              <span className="gradient-text">pipeline</span>
            </h2>
          </motion.div>

          {/* Flow diagram */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {[
              { icon: Mail, label: "Your Inbox", sublabel: "Email / Telegram" },
              { icon: Brain, label: "AI Engine", sublabel: "Extract + validate" },
              { icon: Sheet, label: "Google Sheet", sublabel: "Structured data" },
              { icon: Eye, label: "Your Review", sublabel: "Flagged rows only" },
            ].map((node, i) => (
              <div key={node.label} className="flex items-center">
                <motion.div
                  className="flex flex-col items-center text-center"
                  variants={fadeUp}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 pulse-node"
                    style={{ backgroundColor: "var(--navy-mid)" }}
                  >
                    <node.icon className="w-7 h-7" style={{ color: "var(--cyan)" }} />
                  </div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "var(--navy-mid)", fontFamily: "var(--font-sora)" }}
                  >
                    {node.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{node.sublabel}</p>
                </motion.div>

                {i < 3 && (
                  <div className="hidden md:flex items-center mx-4">
                    <svg width="48" height="16" viewBox="0 0 48 16">
                      <motion.path
                        d="M0 8 L38 8"
                        stroke="var(--cyan)"
                        strokeWidth="2"
                        strokeDasharray="4 3"
                        fill="none"
                        variants={drawLine}
                      />
                      <path d="M38 4 L46 8 L38 12" fill="var(--cyan)" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STEP 1 ────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 section-diagonal-top"
        style={{ backgroundColor: "var(--off-white)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInLeft}
            >
              <span className="section-number absolute -left-4 top-0 leading-none select-none pointer-events-none">01</span>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: "var(--cyan-light)", color: "var(--cyan-dark)" }}
              >
                Step 1 — Send
              </div>
              <h2
                className="display-md mb-4"
                style={{ color: "var(--navy-mid)" }}
              >
                Forward your PDFs —{" "}
                <span className="gradient-text">that&apos;s it.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Send invoice PDFs to your dedicated DocFlow AI email address or
                Telegram bot. From any device — phone, desktop, or accounting
                software.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div
                  className="flex items-center gap-3 px-5 py-4 rounded-xl flex-1"
                  style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--cyan-light)" }}
                  >
                    <Mail className="w-5 h-5" style={{ color: "var(--cyan-dark)" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--navy-mid)" }}>
                      Email
                    </p>
                    <p className="text-xs text-slate-400">Forward or attach</p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-3 px-5 py-4 rounded-xl flex-1"
                  style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--cyan-light)" }}
                  >
                    <MessageCircle className="w-5 h-5" style={{ color: "var(--cyan-dark)" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--navy-mid)" }}>
                      Telegram
                    </p>
                    <p className="text-xs text-slate-400">Send to bot</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInRight}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-lg"
                style={{ border: "1px solid #e2e8f0" }}
              >
                <Image
                  src="/images/demo-email-forward.png"
                  alt="Forwarding an invoice by email to DocFlow AI"
                  width={560}
                  height={420}
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STEP 2 ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-2 order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInLeft}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-lg"
                style={{ border: "1px solid #e2e8f0" }}
              >
                <Image
                  src="/images/hero-dashboard.png"
                  alt="AI extracting invoice data — field detection and processing"
                  width={560}
                  height={420}
                  className="w-full"
                />
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-3 order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInRight}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: "var(--cyan-light)", color: "var(--cyan-dark)" }}
              >
                Step 2 — Extract
              </div>
              <h2
                className="display-md mb-4"
                style={{ color: "var(--navy-mid)" }}
              >
                AI reads every{" "}
                <span className="gradient-text">field precisely.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Our AI engine reads the document — text-layer PDFs or fully
                scanned images — and extracts all the fields you need. Anything
                below confidence threshold is flagged for your 30-second review.
              </p>
              <div>
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--navy-mid)", fontFamily: "var(--font-sora)" }}
                >
                  Fields we extract:
                </p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={staggerContainer}
                >
                  {extractedFields.map((field) => (
                    <motion.span
                      key={field}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: "var(--cyan-light)",
                        color: "var(--cyan-dark)",
                      }}
                      variants={fadeIn}
                    >
                      {field}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STEP 3 ────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 section-diagonal-top"
        style={{ backgroundColor: "var(--off-white)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInLeft}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: "var(--cyan-light)", color: "var(--cyan-dark)" }}
              >
                Step 3 — Deliver
              </div>
              <h2
                className="display-md mb-4"
                style={{ color: "var(--navy-mid)" }}
              >
                Data in your sheet,{" "}
                <span className="gradient-text">Xero-ready.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Extracted data populates your Google Sheet using columns
                formatted for Xero or MYOB import. Each row has a status:
                &ldquo;OK&rdquo; (confident extraction) or &ldquo;REVIEW&rdquo; (needs a quick
                look). You get a Telegram notification when the batch is done.
              </p>
              <div className="flex gap-4">
                <div
                  className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
                  style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#16a34a" }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  OK — confident extraction
                </div>
                <div
                  className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
                  style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#d97706" }}
                >
                  <Eye className="w-4 h-4" />
                  REVIEW — check this row
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInRight}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-lg"
                style={{ border: "1px solid #e2e8f0" }}
              >
                <Image
                  src="/images/demo-sheet-populated.png"
                  alt="Google Sheet with extracted invoice data and OK/REVIEW status"
                  width={560}
                  height={420}
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STEP 4 ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-2 order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInLeft}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-lg"
                style={{ border: "1px solid #e2e8f0" }}
              >
                <Image
                  src="/images/demo-telegram-notification.png"
                  alt="Telegram notification showing batch processing results"
                  width={560}
                  height={420}
                  className="w-full"
                />
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-3 order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={slideInRight}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: "var(--cyan-light)", color: "var(--cyan-dark)" }}
              >
                Step 4 — Review
              </div>
              <h2
                className="display-md mb-4"
                style={{ color: "var(--navy-mid)" }}
              >
                Your 30-second{" "}
                <span className="gradient-text">quality check.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                We flag anything below our confidence threshold — a blurry scan,
                an unusual format, a partially cut-off field. You review only
                what needs attention. Everything else is already done.
              </p>
              <p className="text-slate-500">
                This human-in-the-loop approach means no silent errors reach
                your accounting software. You stay in control without staying
                in the data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WORKS FOR EVERY WORKFLOW ──────────────────────────────────── */}
      <section
        className="py-20 px-4 section-diagonal-top"
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
              className="display-md mb-3"
              style={{ color: "var(--navy-mid)" }}
            >
              Works for{" "}
              <span className="gradient-text">every workflow</span>
            </h2>
            <p className="text-slate-500 text-lg">
              The same AI, adapted to how you work.
            </p>
          </motion.div>
          <WorkflowAccordion />
        </div>
      </section>

      {/* ── SECURITY & PRIVACY ────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="rounded-2xl p-8"
            style={{
              border: "2px solid rgba(0,194,203,0.25)",
              backgroundColor: "var(--cyan-light)",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div className="flex items-center gap-3 mb-5">
              <Shield className="w-7 h-7" style={{ color: "var(--cyan-dark)" }} />
              <h3
                className="font-bold text-xl"
                style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
              >
                Security & privacy
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Database, text: "Data lands in your Google Sheet under your own account — we never retain it" },
                { icon: Lock, text: "Processing only — PDF content is used for extraction and immediately discarded" },
                { icon: Shield, text: "Sender allowlist: only authorised email addresses can trigger extraction" },
                { icon: CheckCircle2, text: "Data processing addendum available on request for compliance needs" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--cyan-dark)" }} />
                  <p className="text-sm text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        headline="Ready to see it with your own invoices?"
        subtext="Book a free 10-minute call. We'll test DocFlow AI against your real PDFs during the trial."
        primaryLabel="Book a Free Call"
        secondaryLabel="View Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
