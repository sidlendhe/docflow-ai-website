"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, viewportOnce } from "@/lib/animations";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface PageHeroProps {
  headline: string;
  subtext?: string;
  breadcrumb?: string;
  accentWord?: string;
}

export default function PageHero({
  headline,
  subtext,
  breadcrumb,
  accentWord,
}: PageHeroProps) {
  const renderHeadline = () => {
    if (!accentWord) return headline;
    const parts = headline.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="gradient-text">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section
      className="pt-28 pb-16 px-4 relative overflow-hidden"
      style={{ backgroundColor: "var(--navy)" }}
    >
      <div className="absolute inset-0 dot-grid-bg opacity-30" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.div
            className="flex items-center justify-center gap-2 text-sm text-white/40 mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Link href="/" className="hover:text-white/60 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "var(--cyan)" }}>{breadcrumb}</span>
          </motion.div>
        )}

        <motion.h1
          className="display-lg text-white mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {renderHeadline()}
        </motion.h1>

        {subtext && (
          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {subtext}
          </motion.p>
        )}
      </div>
    </section>
  );
}
