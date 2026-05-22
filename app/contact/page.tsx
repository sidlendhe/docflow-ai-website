"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, shakeAnimation, viewportOnce } from "@/lib/animations";
import PageHero from "@/components/ui/PageHero";
import {
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Building2,
  User,
  FileText,
  AlertCircle,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Please enter your company or firm name"),
  software: z.enum(["xero", "myob", "quickbooks", "other", "none"]).refine(
    (val) => val !== undefined,
    { message: "Please select your accounting software" }
  ),
  volume: z.enum(["under50", "50to200", "200to500", "over500"]).refine(
    (val) => val !== undefined,
    { message: "Please select your monthly invoice volume" }
  ),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const softwareOptions = [
  { value: "xero", label: "Xero" },
  { value: "myob", label: "MYOB" },
  { value: "quickbooks", label: "QuickBooks" },
  { value: "other", label: "Other" },
  { value: "none", label: "I don't use any accounting software" },
];

const volumeOptions = [
  { value: "under50", label: "Under 50 invoices/month" },
  { value: "50to200", label: "50–200 invoices/month" },
  { value: "200to500", label: "200–500 invoices/month" },
  { value: "over500", label: "Over 500 invoices/month" },
];

const whatHappensNext = [
  {
    step: "1",
    title: "We receive your message",
    desc: "You'll get an automatic confirmation. We read every submission personally.",
  },
  {
    step: "2",
    title: "We review your setup",
    desc: "Based on your software and volume, we prepare a tailored demo for your workflow.",
  },
  {
    step: "3",
    title: "10-minute call",
    desc: "We test DocFlow AI against your real invoices. You see results before any commitment.",
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const [_shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmittedName(data.name.split(" ")[0]);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm border bg-white transition-all duration-200 focus:outline-none placeholder:text-slate-400";
  const inputStyle = { borderColor: "#e2e8f0", color: "var(--navy-mid)" };

  return (
    <>
      <PageHero
        headline="Let's talk."
        subtext="No hard sell. Just a 10-minute conversation to see if we're a fit for your workflow."
        breadcrumb="Contact"
        accentWord="talk."
      />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* ── CONTACT FORM (left / 3 col) ── */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-2xl"
                    style={{ backgroundColor: "var(--cyan-light)", border: "1px solid rgba(0,194,203,0.3)" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                      style={{ backgroundColor: "var(--cyan)" }}
                    >
                      <CheckCircle2 className="w-8 h-8" style={{ color: "var(--navy)" }} />
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
                    >
                      Thanks{submittedName ? `, ${submittedName}` : ""}!
                    </h3>
                    <p className="text-slate-600">
                      I&apos;ll be in touch within 1 business day to set up a time.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-2xl p-8"
                    style={{ border: "1px solid #e2e8f0" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2
                      className="text-xl font-bold mb-6"
                      style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
                    >
                      Send a message
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      {/* Name */}
                      <div>
                        <label className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                          <User className="w-3.5 h-3.5" />
                          Full Name *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Jane Smith"
                          className={inputClass}
                          style={{
                            ...inputStyle,
                            borderColor: errors.name ? "#ef4444" : "#e2e8f0",
                          }}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                          <Mail className="w-3.5 h-3.5" />
                          Email Address *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="jane@yourfirm.com.au"
                          className={inputClass}
                          style={{
                            ...inputStyle,
                            borderColor: errors.email ? "#ef4444" : "#e2e8f0",
                          }}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company */}
                    <div className="mb-5">
                      <label className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                        <Building2 className="w-3.5 h-3.5" />
                        Company / Firm Name *
                      </label>
                      <input
                        {...register("company")}
                        placeholder="Precision Accounts & Bookkeeping"
                        className={inputClass}
                        style={{
                          ...inputStyle,
                          borderColor: errors.company ? "#ef4444" : "#e2e8f0",
                        }}
                      />
                      {errors.company && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.company.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      {/* Accounting software */}
                      <div>
                        <label className="text-xs font-semibold text-slate-500 mb-1.5 block uppercase tracking-wide">
                          Accounting Software *
                        </label>
                        <select
                          {...register("software")}
                          className={inputClass}
                          style={{
                            ...inputStyle,
                            borderColor: errors.software ? "#ef4444" : "#e2e8f0",
                          }}
                        >
                          <option value="">Select...</option>
                          {softwareOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.software && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.software.message}
                          </p>
                        )}
                      </div>

                      {/* Volume */}
                      <div>
                        <label className="text-xs font-semibold text-slate-500 mb-1.5 block uppercase tracking-wide">
                          Monthly Invoice Volume *
                        </label>
                        <select
                          {...register("volume")}
                          className={inputClass}
                          style={{
                            ...inputStyle,
                            borderColor: errors.volume ? "#ef4444" : "#e2e8f0",
                          }}
                        >
                          <option value="">Select...</option>
                          {volumeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.volume && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.volume.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                        <FileText className="w-3.5 h-3.5" />
                        Message (optional)
                      </label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Tell us about your current invoice workflow, any specific pain points, or questions..."
                        className={inputClass}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 rounded-xl font-semibold text-navy flex items-center justify-center gap-2 disabled:opacity-70"
                      style={{ backgroundColor: "var(--cyan)" }}
                      whileHover={{ scale: status !== "loading" ? 1.02 : 1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === "loading" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    {status === "error" && (
                      <p className="text-red-500 text-sm mt-3 text-center flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Something went wrong. Please try again or email directly.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* ── RIGHT COLUMN (2 col) ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Calendly card */}
              <motion.div
                className="rounded-2xl p-6"
                style={{ backgroundColor: "var(--navy-mid)" }}
                initial="hidden"
                animate="visible"
                variants={scaleIn}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,194,203,0.15)" }}
                  >
                    <Calendar className="w-5 h-5" style={{ color: "var(--cyan)" }} />
                  </div>
                  <h3
                    className="font-bold text-white"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    Prefer a direct booking?
                  </h3>
                </div>
                <p className="text-white/60 text-sm mb-5">
                  Book a time directly in the calendar — pick whatever slot works for you.
                </p>
                {/* Calendly placeholder — replace CALENDLY_URL in .env */}
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-navy transition-all"
                  style={{ backgroundColor: "var(--cyan)" }}
                  onClick={(e) => {
                    if (!process.env.NEXT_PUBLIC_CALENDLY_URL) {
                      e.preventDefault();
                      alert("Calendly URL not configured. Please contact us by email.");
                    }
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  Book a time in my calendar
                </a>
                <p className="text-center text-xs text-white/30 mt-3">
                  — or send a message using the form —
                </p>
              </motion.div>

              {/* Contact details card */}
              <motion.div
                className="rounded-2xl p-6"
                style={{ border: "1px solid #e2e8f0", backgroundColor: "var(--off-white)" }}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <h3
                  className="font-bold mb-4"
                  style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
                >
                  Contact details
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 shrink-0" style={{ color: "var(--cyan-dark)" }} />
                    <a
                      href="mailto:sid@docflowai.com.au"
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      sid@docflowai.com.au
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 shrink-0" style={{ color: "var(--cyan-dark)" }} />
                    <span className="text-sm text-slate-600">Brisbane, QLD, Australia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 shrink-0" style={{ color: "var(--cyan-dark)" }} />
                    <span className="text-sm text-slate-600">Reply within 1 business day</span>
                  </div>
                  <div
                    className="pt-3 mt-1"
                    style={{ borderTop: "1px solid #e2e8f0" }}
                  >
                    <p className="text-xs text-slate-400">
                      ABN: 99 465 716 115 · Siddhesh Lendhe
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* What happens next */}
              <motion.div
                className="rounded-2xl p-6 bg-white"
                style={{ border: "1px solid #e2e8f0" }}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <h3
                  className="font-bold mb-5"
                  style={{ fontFamily: "var(--font-sora)", color: "var(--navy-mid)" }}
                >
                  What happens next
                </h3>
                <div className="flex flex-col gap-0">
                  {whatHappensNext.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ backgroundColor: "var(--cyan)", color: "var(--navy)" }}
                        >
                          {item.step}
                        </div>
                        {i < whatHappensNext.length - 1 && (
                          <div
                            className="w-0.5 h-8 my-1"
                            style={{ backgroundColor: "rgba(0,194,203,0.25)" }}
                          />
                        )}
                      </div>
                      <div className="pb-4">
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "var(--navy-mid)", fontFamily: "var(--font-sora)" }}
                        >
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALENDLY EMBED SECTION ─────────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: "var(--off-white)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <h2
              className="display-md mb-3"
              style={{ color: "var(--navy-mid)" }}
            >
              Book a time{" "}
              <span className="gradient-text">directly</span>
            </h2>
            <p className="text-slate-500 mb-8">
              Pick a slot that works for you — calls are 10 minutes, held over Google Meet.
            </p>
          </motion.div>

          {/*
            CALENDLY EMBED PLACEHOLDER
            To enable: set NEXT_PUBLIC_CALENDLY_URL in your .env file
            e.g. NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/10min
            Then replace the placeholder div below with a Calendly inline widget
          */}
          <div
            className="rounded-2xl p-12 flex flex-col items-center justify-center"
            style={{ border: "2px dashed rgba(0,194,203,0.3)", backgroundColor: "white" }}
          >
            <Calendar className="w-12 h-12 mb-4 opacity-30" style={{ color: "var(--cyan)" }} />
            <p className="text-slate-500 text-sm mb-4">
              Calendar booking widget will appear here once your Calendly URL is configured.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || "mailto:sid@docflowai.com.au"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-navy"
              style={{ backgroundColor: "var(--cyan)" }}
            >
              <Calendar className="w-4 h-4" />
              Open booking calendar
            </a>
            <p className="text-xs text-slate-400 mt-3">
              Opens in a new tab · No account required
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
