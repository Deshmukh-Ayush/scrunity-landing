import React from "react";
import { siteConfig } from "@/lib/site";

export interface JoinConfirmationEmailProps {
  firstName: string;
  lastName: string;
  companyName: string;
  workEmail: string;
  phoneNumber?: string;
  country?: string;
  companySize: string;
  role: string;
  anythingElse?: string | null;
}

export function renderJoinConfirmationHtml({
  firstName,
  lastName,
  companyName,
  workEmail,
  phoneNumber,
  country,
  companySize,
  role,
  anythingElse,
}: JoinConfirmationEmailProps): string {
  const brandName = siteConfig.name || "Scrunity";
  const siteUrl = siteConfig.url || "https://landing.scrunity.com";
  const currentYear = new Date().getFullYear();

  const formattedRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "Not specified";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We've received your request — ${brandName}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F9FAFB;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #171717;
    }
    table {
      border-collapse: separate;
    }
    a {
      color: #00AAF7;
      text-decoration: none;
    }
  </style>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #F9FAFB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 580px; background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05);">
          <!-- Top Architectural Accent Bar -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #00AAF7 0%, #2563EB 50%, #10B981 100%); line-height: 3px; font-size: 0;">&nbsp;</td>
          </tr>

          <!-- Card Body -->
          <tr>
            <td style="padding: 36px 32px 32px 32px;">
              <!-- Header Bar: Logo & Status Badge -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 28px;">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <!-- Brand Wordmark -->
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="width: 20px; vertical-align: middle; padding-right: 8px;">
                          <!-- Minimal SVG Geometry Icon -->
                          <div style="width: 16px; height: 22px; background-color: #171717; border-radius: 2px;"></div>
                        </td>
                        <td style="vertical-align: middle;">
                          <span style="font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: #171717;">${brandName}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <!-- Status Pill Badge -->
                    <span style="display: inline-block; background-color: #F0FDF4; border: 1px solid #DCFCE7; border-radius: 9999px; padding: 4px 10px; font-size: 11px; font-weight: 500; color: #15803D; letter-spacing: 0.02em;">
                      <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #16A34A; margin-right: 5px; vertical-align: middle;"></span>
                      Entry Confirmed
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Main Greeting -->
              <h1 style="margin: 0 0 12px 0; font-size: 24px; font-weight: 600; line-height: 1.25; letter-spacing: -0.03em; color: #171717;">
                We've received your request, ${firstName}.
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #4B5563;">
                Thank you for your interest in <strong>${brandName}</strong>. Your submission has been securely recorded in our system.
              </p>

              <!-- 24-Hour Review Guarantee Card (Concentric Frame) -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="width: 28px; vertical-align: top; padding-right: 12px;">
                          <!-- Clock Icon -->
                          <div style="width: 24px; height: 24px; background-color: #0F172A; border-radius: 6px; text-align: center; line-height: 24px; font-size: 13px; color: #FFFFFF;">
                            &#9201;
                          </div>
                        </td>
                        <td style="vertical-align: middle;">
                          <div style="font-size: 13px; font-weight: 600; color: #0F172A; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px;">
                            Response within 24 hours
                          </div>
                          <div style="font-size: 14px; line-height: 1.5; color: #334155;">
                            Our team will shortly get in touch with you in about <strong>24 hours</strong> from the time you receive this email to walk through your workspace setup and discuss early access.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Submission Summary Box -->
              <div style="margin-bottom: 28px;">
                <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #64748B; margin-bottom: 8px;">
                  Submission Summary
                </div>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #FAFAFA; border: 1px solid #EEEEEE; border-radius: 12px; overflow: hidden;">
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; color: #71717A; width: 35%;">
                      Full Name
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; font-weight: 500; color: #18181B;">
                      ${firstName} ${lastName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; color: #71717A;">
                      Work Email
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; font-weight: 500; color: #18181B; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
                      ${workEmail}
                    </td>
                  </tr>
                  ${
                    phoneNumber
                      ? `<tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; color: #71717A;">
                      Phone
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; font-weight: 500; color: #18181B;">
                      ${phoneNumber}
                    </td>
                  </tr>`
                      : ""
                  }
                  ${
                    country
                      ? `<tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; color: #71717A;">
                      Country
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; font-weight: 500; color: #18181B;">
                      ${country}
                    </td>
                  </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; color: #71717A;">
                      Company
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; font-weight: 500; color: #18181B;">
                      ${companyName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; color: #71717A;">
                      Role
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #EEEEEE; font-size: 13px; font-weight: 500; color: #18181B;">
                      ${formattedRole}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; ${anythingElse ? "border-bottom: 1px solid #EEEEEE;" : ""} font-size: 13px; color: #71717A;">
                      Team Size
                    </td>
                    <td style="padding: 12px 16px; ${anythingElse ? "border-bottom: 1px solid #EEEEEE;" : ""} font-size: 13px; font-weight: 500; color: #18181B;">
                      ${companySize} people
                    </td>
                  </tr>
                  ${
                    anythingElse
                      ? `<tr>
                    <td style="padding: 12px 16px; font-size: 13px; color: #71717A; vertical-align: top;">
                      Notes
                    </td>
                    <td style="padding: 12px 16px; font-size: 13px; color: #18181B; line-height: 1.5;">
                      ${anythingElse}
                    </td>
                  </tr>`
                      : ""
                  }
                </table>
              </div>

              <!-- Button CTA -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 32px;">
                <tr>
                  <td align="left">
                    <a href="${siteUrl}" style="display: inline-block; background-color: #171717; color: #FFFFFF; font-size: 14px; font-weight: 500; border-radius: 9999px; padding: 12px 24px; text-decoration: none; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);">
                      Visit Scrunity &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Hairline Architectural Divider -->
              <div style="border-top: 1px solid #E5E7EB; margin: 28px 0 20px 0;"></div>

              <!-- Footer -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="font-size: 12px; line-height: 1.6; color: #9CA3AF;">
                    <div style="font-weight: 500; color: #6B7280; margin-bottom: 4px;">
                      ${brandName} &mdash; AI-Powered Client Collaboration &amp; Revenue Protection
                    </div>
                    <div>
                      If you did not request early access or submit this form, please safely disregard this email.
                    </div>
                    <div style="margin-top: 8px;">
                      &copy; ${currentYear} ${brandName}. All rights reserved.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const JoinConfirmationEmail: React.FC<JoinConfirmationEmailProps> = (
  props,
) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: renderJoinConfirmationHtml(props),
      }}
    />
  );
};
