"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { formSchema, type JoinFormValues } from "@/utils/join-form";
import {
  resend,
  RESEND_FROM_EMAIL,
  RESEND_ADMIN_NOTIFICATION_EMAIL,
  isUsingTestDomain,
} from "@/lib/resend";
import { renderJoinConfirmationHtml } from "@/emails/join-confirmation";
import { renderAdminNotificationHtml } from "@/emails/admin-notification";

export type SubmitJoinResponse = {
  success: boolean;
  message?: string;
  error?: string;
  emailSent?: boolean;
};

export async function submitJoinRequest(
  values: JoinFormValues,
): Promise<SubmitJoinResponse> {
  // 1. Validate inputs
  const parsed = formSchema.safeParse(values);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: errorMsg };
  }

  const data = parsed.data;

  // 2. Save entry to Supabase waitlist table
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const payload: Record<string, unknown> = {
    first_name: data.firstName,
    last_name: data.lastName,
    company_name: data.companyName,
    work_email: data.workEmail,
    company_size: data.companySize,
    role: data.role,
    anything_else: data.anythingElse || null,
    phone_number: data.phoneNumber || null,
    country: data.country || null,
  };

  let { error: dbError } = await supabase.from("waitlist").insert([payload]);

  // Graceful fallback if the Supabase table does not yet have phone_number or country columns
  if (
    dbError &&
    dbError.message &&
    (dbError.message.toLowerCase().includes("phone_number") ||
      dbError.message.toLowerCase().includes("country") ||
      dbError.code === "PGRST204")
  ) {
    console.warn(
      "[Supabase] Table schema missing phone_number or country columns. Retrying standard insert:",
      dbError.message,
    );
    const fallbackPayload = {
      first_name: data.firstName,
      last_name: data.lastName,
      company_name: data.companyName,
      work_email: data.workEmail,
      company_size: data.companySize,
      role: data.role,
      anything_else: data.anythingElse || null,
    };
    const retry = await supabase.from("waitlist").insert([fallbackPayload]);
    dbError = retry.error;
  }

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return {
      success: false,
      error: dbError.message || "Failed to save submission. Please try again.",
    };
  }

  // 3. Dispatch internal admin alert via Resend (always delivered and logged in Resend dashboard)
  try {
    const adminHtml = renderAdminNotificationHtml({
      firstName: data.firstName,
      lastName: data.lastName,
      companyName: data.companyName,
      workEmail: data.workEmail,
      phoneNumber: data.phoneNumber,
      country: data.country,
      companySize: data.companySize,
      role: data.role,
      anythingElse: data.anythingElse,
    });

    const { data: adminData, error: adminError } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [RESEND_ADMIN_NOTIFICATION_EMAIL],
      subject: `[New Waitlist Lead] ${data.firstName} ${data.lastName} (${data.companyName})`,
      html: adminHtml,
    });

    if (adminError) {
      console.warn("[Resend] Admin notification error:", adminError);
    } else {
      console.log(
        "[Resend] Admin notification sent successfully:",
        adminData?.id,
      );
    }
  } catch (adminErr) {
    console.warn("[Resend] Failed to send admin notification:", adminErr);
  }

  // 4. Dispatch confirmation email to the user via Resend
  let emailSent = false;
  const isOwnerEmail =
    data.workEmail.trim().toLowerCase() ===
    RESEND_ADMIN_NOTIFICATION_EMAIL.trim().toLowerCase();

  // If using unverified test domain (onboarding@resend.dev), Resend strictly blocks external emails with 403
  if (isUsingTestDomain && !isOwnerEmail) {
    console.info(
      `[Resend Notice] User confirmation to <${data.workEmail}> skipped. ` +
        `RESEND_FROM_EMAIL is currently set to test domain "${RESEND_FROM_EMAIL}". ` +
        `To send confirmation emails to all users, verify a custom domain at https://resend.com/domains ` +
        `and set RESEND_FROM_EMAIL in your environment variables.`,
    );
  } else {
    try {
      const emailHtml = renderJoinConfirmationHtml({
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        workEmail: data.workEmail,
        phoneNumber: data.phoneNumber,
        country: data.country,
        role: data.role,
        companySize: data.companySize,
        anythingElse: data.anythingElse,
      });

      const { data: resendData, error: resendError } = await resend.emails.send(
        {
          from: RESEND_FROM_EMAIL,
          to: [data.workEmail],
          subject: `We've received your request, ${data.firstName} — Scrunity`,
          html: emailHtml,
        },
      );

      if (resendError) {
        console.warn("[Resend] User email delivery notice:", resendError);
      } else {
        emailSent = true;
        console.log(
          "[Resend] Confirmation email sent successfully:",
          resendData?.id,
        );
      }
    } catch (emailErr) {
      console.warn("[Resend] Failed to dispatch confirmation email:", emailErr);
    }
  }

  return {
    success: true,
    emailSent,
    message: emailSent
      ? "Your request has been successfully submitted! A confirmation has been sent to your email."
      : "Your request has been successfully submitted! Our team will review your submission and get in touch within 24 hours.",
  };
}
