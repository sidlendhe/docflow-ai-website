"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import CTABanner from "@/components/ui/CTABanner";
import PageHero from "@/components/ui/PageHero";
import {
  ChevronDown,
  Rocket,
  Mail,
  MessageCircle,
  Sheet,
  Eye,
  BarChart3,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

type GuideCategory = "all" | "setup" | "email" | "telegram" | "sheets" | "reporting";

interface Guide {
  id: string;
  icon: React.ElementType;
  title: string;
  readTime: string;
  summary: string;
  category: GuideCategory;
  content: React.ReactNode;
}

const guides: Guide[] = [
  {
    id: "getting-started",
    icon: Rocket,
    title: "Getting Started",
    readTime: "4 min read",
    summary: "Complete setup checklist from free trial to going live with your real invoices.",
    category: "setup",
    content: (
      <div className="prose-guide">
        <h3>Step 1 — Book your setup call</h3>
        <p>
          After signing up for your free trial, you&apos;ll receive a calendar link to book a 30-minute
          setup call. During this call we configure your forwarding email address, set up your Google
          Sheet template, and run a test batch with 5–10 of your real invoices.
        </p>
        <h3>Step 2 — Receive your forwarding address</h3>
        <p>
          You&apos;ll receive a unique email address in the format{" "}
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">
            yourname+invoices@docflowai.com.au
          </code>
          . This is the address you forward PDFs to.
        </p>
        <h3>Step 3 — Set up your Google Sheet</h3>
        <p>
          We&apos;ll share a pre-configured Google Sheet template with you. The columns are already
          formatted for Xero or MYOB import. You accept the share request — that&apos;s it.
        </p>
        <h3>Step 4 — Run your first test batch</h3>
        <p>
          Forward 5–10 real invoices to your new address during the setup call. We&apos;ll watch the
          extraction together in real time and tune any fields that need adjustment before you go live.
        </p>
        <h3>Step 5 — Go live</h3>
        <p>
          Once you&apos;re happy with the extraction quality, switch your regular invoice forwarding
          workflow to use your new DocFlow AI address. Your sheet will update within minutes of each
          batch.
        </p>
        <ol>
          <li>Book setup call via calendar link (sent after signup)</li>
          <li>Receive your unique forwarding email address</li>
          <li>Accept the shared Google Sheet</li>
          <li>Run test batch — tune if needed</li>
          <li>Go live — forward all invoices to your new address</li>
        </ol>
      </div>
    ),
  },
  {
    id: "email-forwarding",
    icon: Mail,
    title: "Forwarding Invoices by Email",
    readTime: "3 min read",
    summary: "Step-by-step: set up Gmail forwarding so invoices reach DocFlow AI automatically.",
    category: "email",
    content: (
      <div className="prose-guide">
        <h3>Method 1: Manual forwarding</h3>
        <p>
          The simplest method — open the email with the invoice attachment, click Forward, and enter
          your DocFlow AI address. The PDF attachment is automatically included.
        </p>
        <h3>Method 2: Gmail filter (automatic)</h3>
        <p>
          For emails that arrive regularly from known suppliers, set up a Gmail filter to auto-forward
          them:
        </p>
        <ol>
          <li>In Gmail, click Settings → See all settings → Filters and blocked addresses</li>
          <li>Click &ldquo;Create a new filter&rdquo;</li>
          <li>Enter the supplier email address in the &ldquo;From&rdquo; field</li>
          <li>Click &ldquo;Create filter&rdquo; and select &ldquo;Forward it to&rdquo;</li>
          <li>Enter your DocFlow AI forwarding address</li>
          <li>Save — all future invoices from that supplier auto-forward</li>
        </ol>
        <h3>Tips for reliable extraction</h3>
        <p>
          Ensure the PDF is attached (not just embedded in the email body). Files named clearly
          (e.g. &ldquo;invoice-2024.pdf&rdquo;) process more reliably than generic names like &ldquo;document.pdf&rdquo;.
          Each email should contain one invoice PDF for best results.
        </p>
      </div>
    ),
  },
  {
    id: "telegram-bot",
    icon: MessageCircle,
    title: "Using the Telegram Bot",
    readTime: "2 min read",
    summary: "How to send invoices via Telegram — ideal for tradespeople and mobile workflows.",
    category: "telegram",
    content: (
      <div className="prose-guide">
        <h3>Finding your bot</h3>
        <p>
          During setup, you&apos;ll receive a link to your dedicated DocFlow AI Telegram bot. Open the link
          on your phone or desktop to start the chat. The bot username will be shared in your setup
          confirmation email.
        </p>
        <h3>Sending an invoice</h3>
        <ol>
          <li>Open the DocFlow AI bot in Telegram</li>
          <li>Attach a PDF (tap the paperclip icon)</li>
          <li>Send the message — no caption required</li>
          <li>The bot confirms receipt with a &ldquo;Queued for processing&rdquo; message</li>
          <li>Within 5 minutes you&apos;ll receive a batch summary notification</li>
        </ol>
        <h3>What the confirmation looks like</h3>
        <p>
          After processing, the bot sends: &ldquo;✅ Batch processed — X invoices extracted. Y marked OK, Z
          marked REVIEW. Your Google Sheet has been updated.&rdquo;
        </p>
        <h3>Accepted formats</h3>
        <p>
          PDF files up to 20MB. Scanned invoices are supported via OCR. Photographed invoices should
          be exported as PDF before sending for best results.
        </p>
      </div>
    ),
  },
  {
    id: "google-sheet",
    icon: Sheet,
    title: "Understanding Your Google Sheet",
    readTime: "3 min read",
    summary: "A complete guide to the column structure, status flags, and how to correct rows.",
    category: "sheets",
    content: (
      <div className="prose-guide">
        <h3>Column reference</h3>
        <p>Your sheet has the following columns in order:</p>
        <ol>
          <li>Date — Invoice date (DD/MM/YYYY)</li>
          <li>Invoice # — Supplier&apos;s invoice number</li>
          <li>Supplier Name — Company or trading name</li>
          <li>ABN — Australian Business Number (if present)</li>
          <li>Amount (ex-GST) — Amount before GST</li>
          <li>GST — GST component</li>
          <li>Total (inc-GST) — Full invoice total</li>
          <li>Due Date — Payment due date</li>
          <li>Payment Terms — e.g. &ldquo;Net 30&rdquo;</li>
          <li>Status — OK or REVIEW</li>
          <li>Processed — Timestamp of extraction</li>
        </ol>
        <h3>Status: OK vs REVIEW</h3>
        <p>
          <strong>OK</strong> means the AI extracted all fields with high confidence. No action needed
          unless you spot something unusual.
        </p>
        <p>
          <strong>REVIEW</strong> means one or more fields had lower confidence — typically due to a
          blurry scan, an unusual invoice format, or a partially cut-off field. Check those rows before
          importing to Xero or MYOB.
        </p>
        <h3>Correcting a row</h3>
        <p>
          Simply edit the cell directly in Google Sheets. Change the Status from REVIEW to OK once
          you&apos;re happy. There&apos;s no system to update — your sheet is the source of truth.
        </p>
      </div>
    ),
  },
  {
    id: "flagged-rows",
    icon: Eye,
    title: "Reviewing Flagged Rows",
    readTime: "2 min read",
    summary: "What REVIEW means, when to edit, and when to contact support.",
    category: "sheets",
    content: (
      <div className="prose-guide">
        <h3>What triggers a REVIEW flag?</h3>
        <p>A row is flagged REVIEW when the AI&apos;s confidence score for one or more fields falls below
          our threshold. Common causes:</p>
        <ol>
          <li>Low-resolution or blurry scan</li>
          <li>Handwritten additions on a printed invoice</li>
          <li>Unusual invoice layout not seen before</li>
          <li>Partially cut-off fields at page edges</li>
          <li>Non-standard date formats (e.g. US-style MM/DD/YYYY)</li>
        </ol>
        <h3>How to review a flagged row</h3>
        <ol>
          <li>Open the original PDF (it&apos;s still in your email inbox)</li>
          <li>Check the highlighted fields against the PDF</li>
          <li>Correct any errors directly in the sheet</li>
          <li>Change the Status cell from REVIEW to OK</li>
        </ol>
        <h3>When to contact support</h3>
        <p>
          If the same supplier&apos;s invoices are consistently flagged, it likely means their PDF format
          is unusual and can be tuned. Email us with an example PDF and we&apos;ll adjust the extraction
          within 1 business day.
        </p>
      </div>
    ),
  },
  {
    id: "usage-report",
    icon: BarChart3,
    title: "Your Monthly Usage Report",
    readTime: "2 min read",
    summary: "What the monthly report contains and how to use it for planning.",
    category: "reporting",
    content: (
      <div className="prose-guide">
        <h3>What&apos;s in the report?</h3>
        <p>
          On the Standard and Premium plans, you receive a monthly usage report delivered by email in
          the first week of each month. It contains:
        </p>
        <ol>
          <li>Total documents processed in the period</li>
          <li>OK vs REVIEW split (extraction quality indicator)</li>
          <li>Volume vs your monthly cap (so you know if you&apos;re near an upgrade)</li>
          <li>Estimated API processing cost (for transparency)</li>
          <li>Any errors or failed extractions with reasons</li>
        </ol>
        <h3>How to use it</h3>
        <p>
          The report helps you track whether your invoice volume is growing (a sign you might need to
          upgrade), whether any supplier PDFs are consistently causing REVIEW flags (which we can fix),
          and what you&apos;re getting for your subscription.
        </p>
        <h3>Exporting your data</h3>
        <p>
          Your Google Sheet can be downloaded as CSV or Excel at any time via File → Download. There&apos;s
          no data locked in DocFlow AI — everything lives in your Sheet.
        </p>
      </div>
    ),
  },
];

const filterCategories: { id: GuideCategory; label: string }[] = [
  { id: "all", label: "All Guides" },
  { id: "setup", label: "Setup" },
  { id: "email", label: "Email" },
  { id: "telegram", label: "Telegram" },
  { id: "sheets", label: "Google Sheets" },
  { id: "reporting", label: "Reporting" },
];

function GuideCard({ guide }: { guide: Guide }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden bg-white"
      style={{ border: open ? "1px solid rgba(0,194,203,0.4)" : "1px solid #e2e8f0" }}
      layout
    >
      {/* Card header */}
      <div
        className="h-1.5"
        style={{ backgroundColor: "var(--cyan)" }}
      />
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--cyan-light)" }}
          >
            <guide.icon className="w-6 h-6" style={{ color: "var(--cyan-dark)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3
                className="font-bold"
                style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
              >
                {guide.title}
              </h3>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{ backgroundColor: "var(--off-white)", color: "#94a3b8" }}
              >
                <Clock className="w-3 h-3" />
                {guide.readTime}
              </span>
            </div>
            <p className="text-sm text-slate-500">{guide.summary}</p>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="mt-4 flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color: open ? "var(--cyan-dark)" : "var(--navy-mid)" }}
        >
          {open ? "Close guide" : "Open guide"}
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      {/* Expanded content */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
          className="px-6 pb-6"
          style={{ borderTop: "1px solid #f1f5f9", borderLeft: "3px solid var(--cyan)" }}
        >
          <div className="pt-5">{guide.content}</div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState<GuideCategory>("all");

  const filtered =
    activeCategory === "all"
      ? guides
      : guides.filter((g) => g.category === activeCategory);

  return (
    <>
      <PageHero
        headline="Everything you need to get started."
        subtext="Step-by-step guides for new and existing DocFlow AI clients. No IT knowledge required."
        breadcrumb="Guides"
        accentWord="get started."
      />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Category pills */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center mb-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {filterCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: "var(--cyan)", color: "var(--navy)" }
                    : {
                        backgroundColor: "var(--off-white)",
                        color: "var(--navy-mid)",
                        border: "1px solid #e2e8f0",
                      }
                }
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Guide cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Custom setup CTA strip */}
          <motion.div
            className="mt-12 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ backgroundColor: "var(--cyan)", }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div>
              <p
                className="font-bold"
                style={{ fontFamily: "var(--font-sora)", color: "var(--navy)" }}
              >
                Need a custom setup?
              </p>
              <p className="text-sm" style={{ color: "rgba(10,22,40,0.7)" }}>
                Book a 10-minute call and we&apos;ll configure everything for you.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shrink-0"
              style={{ backgroundColor: "var(--navy)", color: "var(--cyan)" }}
            >
              Book a call <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABanner
        headline="Ready to automate your invoice workflow?"
        subtext="Start your 2-week free trial. Setup takes 30 minutes."
        primaryLabel="Book a Free Call"
        secondaryLabel="View Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
