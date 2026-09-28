import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_KEY;

if (!apiKey) {
  console.warn(
    "Warning: Neither RESEND_API_KEY nor RESEND_KEY environment variable is configured.",
  );
}

export const resend = new Resend(apiKey);

export const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Scrunity <onboarding@resend.dev>";
