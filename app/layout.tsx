import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DocFlow AI — AI Document Extraction for Australian Accounting Firms",
  description:
    "Automatically extract data from PDF invoices and deliver it straight to your Google Sheet — ready for Xero or MYOB. No IT team needed. Starting from $297/mo.",
  keywords: [
    "invoice extraction",
    "AI accounting automation",
    "PDF to Google Sheets",
    "Xero automation",
    "MYOB automation",
    "Brisbane accounting",
    "bookkeeper tools",
    "document extraction AI",
  ],
  authors: [{ name: "DocFlow AI" }],
  openGraph: {
    title: "DocFlow AI — AI Document Extraction for Australian Accounting Firms",
    description:
      "Automatically extract data from PDF invoices and deliver it straight to your Google Sheet.",
    url: "https://docflowai.com.au",
    siteName: "DocFlow AI",
    locale: "en_AU",
    type: "website",
  },
  metadataBase: new URL("https://docflowai.com.au"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${sora.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
