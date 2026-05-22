import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

const footerLinks = {
  product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQs", href: "/faqs" },
    { label: "Guides", href: "/guides" },
  ],
  company: [
    { label: "Contact Us", href: "/contact" },
    { label: "Book a Call", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--navy)" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="DocFlow AI"
                width={160}
                height={44}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              AI-powered document extraction for Australian accounting firms,
              bookkeepers, and small businesses. From $297/mo. No lock-in.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: "var(--cyan)" }} />
                <a
                  href="mailto:sid@docflowai.com.au"
                  className="hover:text-white transition-colors"
                >
                  sid@docflowai.com.au
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: "var(--cyan)" }} />
                <span>Brisbane, QLD, Australia</span>
              </div>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4
              className="font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ color: "var(--cyan)", fontFamily: "var(--font-sora)" }}
            >
              Product
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4
              className="font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ color: "var(--cyan)", fontFamily: "var(--font-sora)" }}
            >
              Get Started
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className="mt-6 p-3 rounded-lg"
              style={{ backgroundColor: "rgba(0,194,203,0.1)", border: "1px solid rgba(0,194,203,0.2)" }}
            >
              <p className="text-xs text-white/50 mb-1">2-week free trial</p>
              <a
                href="/contact"
                className="text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: "var(--cyan)" }}
              >
                Start for free →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} DocFlow AI · Siddhesh Lendhe ·{" "}
            <span>ABN 99 465 716 115</span>
          </p>
          <p className="text-xs text-white/40">
            Brisbane, QLD, Australia · docflowai.com.au
          </p>
        </div>
      </div>
    </footer>
  );
}
