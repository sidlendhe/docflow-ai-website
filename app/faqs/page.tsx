"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import CTABanner from "@/components/ui/CTABanner";
import PageHero from "@/components/ui/PageHero";
import { ChevronDown, ArrowRight } from "lucide-react";

type Category = "all" | "general" | "technical" | "billing" | "security" | "competitors";

interface FAQ {
  q: string;
  a: string;
  category: Exclude<Category, "all">;
}

const faqs: FAQ[] = [
  // General
  {
    q: "What is DocFlow AI?",
    a: "DocFlow AI is an AI-powered document extraction service for Australian accounting firms, bookkeepers, and small businesses. You forward PDF invoices by email or Telegram, and we automatically extract the data into a structured Google Sheet — ready for Xero or MYOB import.",
    category: "general",
  },
  {
    q: "Who is DocFlow AI for?",
    a: "Primarily accounting firms and bookkeepers in Brisbane and across Australia who process PDF invoices regularly. We also serve small business owners and trades businesses that want to stop retyping supplier invoice data manually.",
    category: "general",
  },
  {
    q: "How quickly can I get started?",
    a: "Setup takes one short call — usually under 30 minutes. We configure your forwarding email, set up your Google Sheet template, and run a test batch with your real invoices. You'll be live before the end of the day.",
    category: "general",
  },
  {
    q: "Do I need any IT support or technical knowledge?",
    a: "None. If you can forward an email, you can use DocFlow AI. There's no software to install, no dashboards to manage. Your only job is forwarding PDFs — we handle everything else.",
    category: "general",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Every plan starts with a 2-week free trial using your real invoices. We tune the extraction to your specific document formats during the trial. You only pay if it's saving you time.",
    category: "general",
  },

  // Technical
  {
    q: "What file types do you support?",
    a: "PDF is the primary format. This includes text-layer PDFs (computer-generated), scanned PDF images, and photographed documents sent as PDF attachments. We do not currently support PNG/JPEG attachments directly — those should be converted to PDF first.",
    category: "technical",
  },
  {
    q: "What happens with scanned or image-only PDFs?",
    a: "Scanned and image PDFs are processed using OCR (optical character recognition) before the AI extraction step. Messy, low-resolution, or partially obscured documents are handled — anything the AI isn't confident about gets flagged for your review rather than being silently skipped.",
    category: "technical",
  },
  {
    q: "Can I send invoices via Telegram instead of email?",
    a: "Yes. We provide a Telegram bot — just forward or attach PDF documents and the bot queues them for extraction. You'll receive a confirmation notification when the batch is processed. This is especially useful for tradespeople who are on-site.",
    category: "technical",
  },
  {
    q: "Does it work with MYOB and Xero?",
    a: "Yes. The Google Sheet output uses column headers and data formats designed for direct Xero and MYOB import. Fields include: Date, Invoice #, Supplier Name, Supplier ABN, Amount ex-GST, GST, Total inc-GST, Due Date, and Payment Terms.",
    category: "technical",
  },
  {
    q: "What fields are extracted from each invoice?",
    a: "Standard fields: Invoice Date, Invoice Number, Supplier Name, Supplier ABN, Amount (ex-GST), GST Amount, Total (inc-GST), Due Date, and Payment Terms. Custom fields (e.g. cost centre, project code) are available on the Premium plan or via a custom setup engagement.",
    category: "technical",
  },
  {
    q: "What if a PDF contains multiple invoices?",
    a: "Our system processes each document as a single invoice. If your suppliers occasionally batch invoices into one PDF, we can configure a splitting step during setup — just mention this when we do your initial call.",
    category: "technical",
  },

  // Billing
  {
    q: "Is there a lock-in contract?",
    a: "No. DocFlow AI is month-to-month. Cancel any time before your next billing date and you won't be charged again. Annual prepay is available for a 16.7% discount (2 months free) but is not required.",
    category: "billing",
  },
  {
    q: "Do you charge GST?",
    a: "Not currently. DocFlow AI is below the $75,000/yr ATO GST registration threshold. We will notify all clients well in advance if and when GST is added to invoices.",
    category: "billing",
  },
  {
    q: "What happens when I exceed my monthly document cap?",
    a: "You'll receive a Telegram and email alert as you approach your cap. Overages are charged at $0.20 per document above the limit, or you can upgrade to the next plan mid-cycle. We never silently increase your bill.",
    category: "billing",
  },
  {
    q: "How do I cancel?",
    a: "Email sid@docflowai.com.au any time. Your subscription stops at the end of your current billing period. Your Google Sheet and all extracted data remain yours — we don't delete anything when you leave.",
    category: "billing",
  },

  // Security
  {
    q: "Where is my invoice data stored?",
    a: "Extracted data is written directly to your Google Sheet, which lives under your own Google account. We do not retain copies of your invoice data after extraction is complete. PDFs are processed in memory and discarded.",
    category: "security",
  },
  {
    q: "Who can access my invoices?",
    a: "Only you and anyone you grant access to your Google Sheet. DocFlow AI accesses your Sheet only to write extracted data — we do not read existing rows or share data with any third party.",
    category: "security",
  },
  {
    q: "Can we sign a data processing agreement (DPA)?",
    a: "Yes. We provide a straightforward data processing addendum for clients who need it for their own compliance requirements. Contact us and we'll send it through within 1 business day.",
    category: "security",
  },
  {
    q: "What happens to my data when I cancel?",
    a: "Your Google Sheet is yours — we don't delete it, and you retain full ownership. We revoke our write access to the sheet upon cancellation. Any local processing logs are purged within 30 days.",
    category: "security",
  },

  // Competitors
  {
    q: "How does this compare to Dext or Hubdoc?",
    a: "Dext and Hubdoc are great products with broad feature sets. DocFlow AI is narrower and faster to set up — it focuses specifically on getting data into a Google Sheet formatted for your accounting software. We also offer a human-in-the-loop review step and support Telegram ingest. If you want to compare, book a call and we'll run both tools against your worst 5 PDFs.",
    category: "competitors",
  },
  {
    q: "We already use Hubdoc — why would we switch?",
    a: "You might not need to. If Hubdoc is working well, keep it. But if you're finding that certain invoice types get missed, or you want a leaner monthly cost with direct Google Sheets output, DocFlow AI could be a better fit for your workflow. The free trial lets you test that risk-free.",
    category: "competitors",
  },
  {
    q: "Can I use DocFlow AI alongside my existing tools?",
    a: "Yes. DocFlow AI outputs to Google Sheets, which integrates with most accounting workflows. Some clients use it as a pre-processing layer before importing to Xero — others use it as their primary invoice log. It doesn't replace your accounting software, it feeds it.",
    category: "competitors",
  },
];

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "general", label: "General" },
  { id: "technical", label: "Technical" },
  { id: "billing", label: "Billing" },
  { id: "security", label: "Security" },
  { id: "competitors", label: "Competitors" },
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      <PageHero
        headline="Got questions? We've got answers."
        subtext="Can't find what you're looking for? Reach out directly — we reply within 1 business day."
        breadcrumb="FAQs"
        accentWord="answers."
      />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Category pills */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center mb-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
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
                <span
                  className="ml-1.5 text-xs opacity-60"
                >
                  ({cat.id === "all" ? faqs.length : faqs.filter((f) => f.category === cat.id).length})
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* FAQ accordion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((faq, i) => (
                <motion.div
                  key={`${activeCategory}-${i}`}
                  className="rounded-xl overflow-hidden bg-white"
                  style={{
                    border: openIndex === i
                      ? "1px solid rgba(0,194,203,0.4)"
                      : "1px solid #e2e8f0",
                    transition: "border-color 0.2s",
                  }}
                  layout
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span
                      className="font-semibold text-sm pr-4"
                      style={{ color: "var(--navy-mid)", fontFamily: "var(--font-sora)" }}
                    >
                      {faq.q}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="hidden sm:block text-xs font-medium px-2 py-0.5 rounded-full capitalize"
                        style={{ backgroundColor: "var(--cyan-light)", color: "var(--cyan-dark)" }}
                      >
                        {faq.category}
                      </span>
                      <motion.div
                        animate={{ rotate: openIndex === i ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </motion.div>
                    </div>
                  </button>

                  {openIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5"
                      style={{ borderLeft: "3px solid var(--cyan)" }}
                    >
                      <p className="text-slate-600 leading-relaxed pt-2 text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.div
            className="mt-12 text-center rounded-2xl p-8"
            style={{ backgroundColor: "var(--off-white)", border: "1px solid #e2e8f0" }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <p
              className="font-bold text-lg mb-2"
              style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
            >
              Still have a question?
            </p>
            <p className="text-slate-500 text-sm mb-5">
              Ask us directly — we reply within 1 business day.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-navy"
              style={{ backgroundColor: "var(--cyan)" }}
            >
              Ask us directly <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABanner
        headline="Ready to stop typing invoices manually?"
        subtext="Book a 10-minute call. No pitch — just a demo with your real documents."
        primaryLabel="Book a Free Call"
        secondaryLabel="View Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
