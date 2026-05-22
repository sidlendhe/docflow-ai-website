import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

const softwareLabels: Record<string, string> = {
  xero: "Xero",
  myob: "MYOB",
  quickbooks: "QuickBooks",
  other: "Other",
  none: "None / Not using accounting software",
};

const volumeLabels: Record<string, string> = {
  under50: "Under 50 invoices/month",
  "50to200": "50–200 invoices/month",
  "200to500": "200–500 invoices/month",
  over500: "Over 500 invoices/month",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, software, volume, message } = body;

    if (!name || !email || !company || !software || !volume) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_EMAIL || "siddhesh.automate@gmail.com";

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "DocFlow AI Contact <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `New enquiry from ${name} — ${company}`,
      html: `
        <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f6f9fc; border-radius: 16px;">
          <div style="background: #0f2557; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h1 style="color: #00c2cb; font-size: 20px; margin: 0; font-family: Sora, system-ui, sans-serif;">
              New Contact Form Submission
            </h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">DocFlow AI Website</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 40%;">Name</td>
                <td style="padding: 10px 0; color: #0f2557; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; color: #0f2557; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #00c2cb;">${email}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Company</td>
                <td style="padding: 10px 0; color: #0f2557; font-size: 14px; font-weight: 600;">${company}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Accounting Software</td>
                <td style="padding: 10px 0; color: #0f2557; font-size: 14px;">${softwareLabels[software] || software}</td>
              </tr>
              <tr style="border-bottom: ${message ? "1px solid #f1f5f9" : "none"};">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Invoice Volume</td>
                <td style="padding: 10px 0; color: #0f2557; font-size: 14px;">${volumeLabels[volume] || volume}</td>
              </tr>
              ${
                message
                  ? `<tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">Message</td>
                  <td style="padding: 10px 0; color: #475569; font-size: 14px; line-height: 1.6;">${message}</td>
                </tr>`
                  : ""
              }
            </table>
          </div>

          <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
            Sent from docflowai.com.au contact form
          </div>
        </div>
      `,
    });

    // Send confirmation to the enquirer
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "DocFlow AI <onboarding@resend.dev>",
      to: [email],
      subject: "Got your message — I'll be in touch soon",
      html: `
        <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="background: #0f2557; border-radius: 12px; padding: 28px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #00c2cb; font-size: 22px; margin: 0 0 8px; font-family: Sora, system-ui, sans-serif;">
              DocFlow AI
            </h1>
            <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 15px;">Message received ✅</p>
          </div>

          <p style="color: #1a1a2e; font-size: 15px; line-height: 1.7;">Hi ${name.split(" ")[0]},</p>

          <p style="color: #475569; font-size: 15px; line-height: 1.7;">
            Thanks for reaching out. I&apos;ve received your message and will get back to you within
            1 business day to set up a 10-minute call.
          </p>

          <p style="color: #475569; font-size: 15px; line-height: 1.7;">
            During the call, we&apos;ll test DocFlow AI against your real invoices — no pitch, just
            a live demo with your actual documents. You&apos;ll know by the end of the call whether
            it&apos;s a fit.
          </p>

          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin-top: 24px;">
            — Siddhesh<br/>
            <span style="color: #94a3b8; font-size: 13px;">DocFlow AI · Brisbane, QLD · sid@docflowai.com.au</span>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
