"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface CTABannerProps {
  headline?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  headline = "Two weeks, free. No contracts, no lock-in.",
  subtext = "Join Brisbane accounting firms saving 10+ hours per week on invoice data entry.",
  primaryLabel = "Book a Free Call",
  primaryHref = "/contact",
  secondaryLabel = "See Pricing",
  secondaryHref = "/pricing",
}: CTABannerProps) {
  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: "var(--navy)" }}
    >
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid-bg opacity-40" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2
          className="display-lg text-white mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <span className="gradient-text">{headline.split(".")[0]}.</span>
          {headline.includes(".") && headline.split(".").slice(1).join(".")}
        </motion.h2>

        <motion.p
          className="text-white/60 text-lg mb-10 max-w-xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {subtext}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <motion.a
            href={primaryHref}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-navy text-base transition-all"
            style={{ backgroundColor: "var(--cyan)" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Calendar className="w-5 h-5" />
            {primaryLabel}
          </motion.a>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={secondaryHref}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
            >
              {secondaryLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
