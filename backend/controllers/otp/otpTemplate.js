// Apple-style minimal OTP email template
export const getOTPTemplate = (otp) => `
  <div style="margin:0;padding:0;background-color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7;padding:40px 16px;">
      <tr>
        <td align="center">

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e5e5e5;">
            
            <!-- Header -->
            <tr>
              <td style="padding:32px 32px 20px;text-align:center;">
                <p style="margin:0;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#6e6e73;">
                  Verification Code
                </p>
                <h1 style="margin:14px 0 0;font-size:32px;line-height:1.2;font-weight:600;color:#1d1d1f;">
                  Disha Study Library
                </h1>
              </td>
            </tr>

            <!-- Subtle Divider -->
            <tr>
              <td style="padding:0 32px;">
                <hr style="border:none;border-top:1px solid #ececec;margin:0;">
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 32px 10px;text-align:center;">
                <p style="margin:0;font-size:18px;line-height:1.7;color:#424245;">
                  Use the code below to verify your booking request.
                </p>
              </td>
            </tr>

            <!-- OTP Box -->
            <tr>
              <td style="padding:28px 32px 16px;text-align:center;">
                <div style="display:inline-block;background:#f5f5f7;border:1px solid #d2d2d7;border-radius:20px;padding:22px 36px;">
                  <span style="font-size:44px;line-height:1;font-weight:600;letter-spacing:16px;color:#1d1d1f;">
                    ${otp}
                  </span>
                </div>
              </td>
            </tr>

            <!-- Info -->
            <tr>
              <td style="padding:12px 32px 0;text-align:center;">
                <p style="margin:0;font-size:15px;line-height:1.8;color:#6e6e73;">
                  This code expires in <strong style="color:#1d1d1f;">60 seconds</strong>.<br>
                  Do not share this code with anyone.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:32px 32px 28px;text-align:center;">
                <p style="margin:0;font-size:14px;line-height:1.8;color:#86868b;">
                  If you did not request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Bottom -->
            <tr>
              <td style="padding:20px 24px;background:#fafafa;border-top:1px solid #e5e5e5;text-align:center;">
                <p style="margin:0;font-size:13px;color:#a1a1a6;">
                  This is an automated email from Disha Study Library.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </div>
`;