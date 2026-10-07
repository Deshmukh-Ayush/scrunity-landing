import React from "react";
import { siteConfig } from "@/lib/site";

export interface AdminNotificationEmailProps {
  firstName: string;
  lastName: string;
  companyName: string;
  workEmail: string;
  phoneNumber?: string;
  country?: string;
  companySize: string;
  role: string;
  anythingElse?: string | null;
  submittedAt?: string;
}

export function renderAdminNotificationHtml({
  firstName,
  lastName,
  companyName,
  workEmail,
  phoneNumber,
  country,
  companySize,
  role,
  anythingElse,
  submittedAt = new Date().toUTCString(),
}: AdminNotificationEmailProps): string {
  const brandName = siteConfig.name || "Scrunity";
  const formattedRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "Not specified";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Waitlist Lead — ${firstName} ${lastName}</title>
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
      background-color: #0F172A;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #F8FAFC;
    }
    table {
      border-collapse: separate;
    }
    a {
      color: #38BDF8;
      text-decoration: none;
    }
  </style>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #0B0F19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 580px; background-color: #111827; border: 1px solid #1F2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);">
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #00AAF7 0%, #3B82F6 50%, #10B981 100%); line-height: 3px; font-size: 0;">&nbsp;</td>
          </tr>

          <!-- Card Body -->
          <tr>
            <td style="padding: 32px 28px;">
              <!-- Header Bar -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 24px;">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <span style="font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: #FFFFFF;">${brandName}</span>
                    <span style="display: inline-block; margin-left: 8px; font-size: 12px; font-weight: 500; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.05em;">Admin Alert</span>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; background-color: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 9999px; padding: 4px 10px; font-size: 11px; font-weight: 500; color: #60A5FA;">
                      New Early Access Request
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Lead Title -->
              <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 600; line-height: 1.3; color: #FFFFFF;">
                ${firstName} ${lastName}
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #9CA3AF;">
                Submitted on ${submittedAt}
              </p>

              <!-- Lead Breakdown Table -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #1F2937; border: 1px solid #374151; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #374151; width: 35%; font-size: 13px; color: #9CA3AF; font-weight: 500;">Work Email</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #374151; font-size: 14px; color: #38BDF8; font-weight: 500;">
                    <a href="mailto:${workEmail}" style="color: #38BDF8;">${workEmail}</a>
                  </td>
                </tr>
                ${
                  phoneNumber
                    ? `<tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #374151; font-size: 13px; color: #9CA3AF; font-weight: 500;">Phone</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #374151; font-size: 14px; color: #F3F4F6;">${phoneNumber}</td>
                </tr>`
                    : ""
                }
                ${
                  country
                    ? `<tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #374151; font-size: 13px; color: #9CA3AF; font-weight: 500;">Country</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #374151; font-size: 14px; color: #F3F4F6;">${country}</td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #374151; font-size: 13px; color: #9CA3AF; font-weight: 500;">Company</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #374151; font-size: 14px; color: #F3F4F6; font-weight: 500;">${companyName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #374151; font-size: 13px; color: #9CA3AF; font-weight: 500;">Role</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #374151; font-size: 14px; color: #F3F4F6;">${formattedRole}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: ${anythingElse ? '1px solid #374151' : 'none'}; font-size: 13px; color: #9CA3AF; font-weight: 500;">Company Size</td>
                  <td style="padding: 12px 16px; border-bottom: ${anythingElse ? '1px solid #374151' : 'none'}; font-size: 14px; color: #F3F4F6;">${companySize}</td>
                </tr>
                ${
                  anythingElse
                    ? `<tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #9CA3AF; font-weight: 500; vertical-align: top;">Notes</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #E5E7EB; line-height: 1.5;">${anythingElse}</td>
                </tr>`
                    : ""
                }
              </table>

              <!-- Quick Action Button -->
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 24px;">
                <tr>
                  <td align="center" style="border-radius: 8px; background: #00AAF7;">
                    <a href="mailto:${workEmail}?subject=Regarding%20your%20${encodeURIComponent(brandName)}%20Early%20Access%20Request" style="display: inline-block; padding: 10px 20px; font-size: 13px; font-weight: 600; color: #000000; text-decoration: none; border-radius: 8px;">
                      Reply to ${firstName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 12px; color: #6B7280; line-height: 1.5;">
                This notification was dispatched automatically by ${brandName} from the join waitlist portal.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
