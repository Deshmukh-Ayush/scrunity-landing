import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_KEY;

if (!apiKey) {
  console.warn(
    "[Resend] Warning: Neither RESEND_API_KEY nor RESEND_KEY environment variable is configured.",
  );
}

export const resend = new Resend(apiKey);

export const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Scrunity <onboarding@resend.dev>";

export const RESEND_ADMIN_NOTIFICATION_EMAIL =
  process.env.RESEND_ADMIN_NOTIFICATION_EMAIL || "scrunityai@gmail.com";

/**
 * Returns true if Resend is operating with the default onboarding@resend.dev test domain.
 * With the test domain, Resend only allows sending to the account owner (scrunityai@gmail.com).
 */
export const isUsingTestDomain = RESEND_FROM_EMAIL.includes("@resend.dev");
