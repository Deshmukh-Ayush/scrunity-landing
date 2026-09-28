"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { formSchema, type JoinFormValues } from "@/utils/join-form";
import { resend, RESEND_FROM_EMAIL } from "@/lib/resend";
import { renderJoinConfirmationHtml } from "@/emails/join-confirmation";

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

  const { error: dbError } = await supabase.from("waitlist").insert([
    {
      first_name: data.firstName,
      last_name: data.lastName,
      company_name: data.companyName,
      work_email: data.workEmail,
      company_size: data.companySize,
      role: data.role,
      anything_else: data.anythingElse || null,
    },
  ]);

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return {
      success: false,
      error: dbError.message || "Failed to save submission. Please try again.",
    };
  }

  // 3. Dispatch confirmation email via Resend
  let emailSent = false;
  try {
    const emailHtml = renderJoinConfirmationHtml({
      firstName: data.firstName,
      lastName: data.lastName,
      companyName: data.companyName,
      workEmail: data.workEmail,
      role: data.role,
      companySize: data.companySize,
      anythingElse: data.anythingElse,
    });

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [data.workEmail],
      subject: `We've received your request, ${data.firstName} — Scrunity`,
      html: emailHtml,
    });

    if (resendError) {
      console.warn("Resend email delivery notice:", resendError);
    } else {
      emailSent = true;
      console.log("Confirmation email sent successfully:", resendData?.id);
    }
  } catch (emailErr) {
    console.warn("Failed to dispatch Resend confirmation email:", emailErr);
  }

  return {
    success: true,
    emailSent,
    message:
      "Your request has been successfully submitted! A confirmation has been sent to your email.",
  };
}
