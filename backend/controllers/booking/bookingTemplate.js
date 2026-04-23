//Seat Booking request to Admin.

export const getBookingTemplate = ({
  fullName,
  email,
  phone,
  fieldOfPreparation,
}) => {
  return `
  <div style="margin:0;padding:0;background-color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7;padding:40px 16px;">
      <tr>
        <td align="center">

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e5e5e5;">
            
            <!-- Header -->
            <tr>
              <td style="padding:32px 32px 20px;text-align:left;">
                <p style="margin:0;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#6e6e73;">
                  New Submission
                </p>
                <h1 style="margin:14px 0 0;font-size:30px;line-height:1.2;font-weight:600;color:#1d1d1f;">
                  Seat Booking Request
                </h1>
              </td>
            </tr>

            <!-- Subtle Divider -->
            <tr>
              <td style="padding:0 32px;">
                <hr style="border:none;border-top:1px solid #ececec;margin:0;">
              </td>
            </tr>

            <!-- Intro -->
            <tr>
              <td style="padding:28px 32px 8px;text-align:left;">
                <p style="margin:0;font-size:16px;line-height:1.8;color:#424245;">
                  A new admission enquiry has been submitted. Applicant details are below.
                </p>
              </td>
            </tr>

            <!-- Details Card -->
            <tr>
              <td style="padding:24px 32px 12px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border:1px solid #e5e5e5;border-radius:16px;overflow:hidden;">
                  
                  <tr>
                    <td style="padding:18px 20px;border-bottom:1px solid #e5e5e5;width:180px;font-size:14px;font-weight:600;color:#6e6e73;">
                      Full Name
                    </td>
                    <td style="padding:18px 20px;border-bottom:1px solid #e5e5e5;font-size:15px;font-weight:500;color:#1d1d1f;">
                      ${fullName}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 20px;border-bottom:1px solid #e5e5e5;width:180px;font-size:14px;font-weight:600;color:#6e6e73;">
                      Email Address
                    </td>
                    <td style="padding:18px 20px;border-bottom:1px solid #e5e5e5;font-size:15px;font-weight:500;color:#1d1d1f;">
                      ${email}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 20px;border-bottom:1px solid #e5e5e5;width:180px;font-size:14px;font-weight:600;color:#6e6e73;">
                      Phone Number
                    </td>
                    <td style="padding:18px 20px;border-bottom:1px solid #e5e5e5;font-size:15px;font-weight:500;color:#1d1d1f;">
                      ${phone}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 20px;width:180px;font-size:14px;font-weight:600;color:#6e6e73;">
                      Field of Preparation
                    </td>
                    <td style="padding:18px 20px;font-size:15px;font-weight:500;color:#1d1d1f;">
                      ${fieldOfPreparation}
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px 30px;text-align:left;">
                <p style="margin:0;font-size:14px;line-height:1.8;color:#86868b;">
                  Please review this request and follow up with the applicant if needed.
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
};