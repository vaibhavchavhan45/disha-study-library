export const getVerdictAlertTemplate = ({
  firstName,
  fatherName,
  lastName,
  origin,
  rating,
  isSpecialPerson,
}) => {
  const bars = Array.from({ length: 10 }, (_, i) =>
    `<span style="display:inline-block;width:18px;height:18px;border-radius:4px;margin-right:3px;background:${i < rating ? "#7c3aed" : "#1e1e1e"};"></span>`
  ).join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0;padding:0;background:#080808;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:48px 0;">
      <tr>
        <td align="center">
          <table width="540" cellpadding="0" cellspacing="0" style="background:#101010;border-radius:20px;overflow:hidden;border:1px solid #1e1e1e;">

            <!-- Top Accent Bar -->
            <tr>
              <td style="height:3px;background:linear-gradient(90deg,#7c3aed,#06b6d4,#ec4899);"></td>
            </tr>

            <!-- Header -->
            <tr>
              <td style="padding:36px 40px 24px;">
                <p style="margin:0 0 8px;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#7c3aed;font-weight:600;">DISHA Library</p>
                <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                  New Verdict ${isSpecialPerson ? "🔐" : "💬"}
                </h1>
                <p style="margin:8px 0 0;font-size:13px;color:#444;">
                  ${isSpecialPerson ? "⚠️ Special person accessed the secret message." : "Someone just submitted their verdict."}
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:0 40px;">
                <div style="height:1px;background:#1a1a1a;"></div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px 40px;">

                <!-- Name Details -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td style="background:#161616;border-radius:12px;padding:18px 20px;border:1px solid #222;">
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#444;">First Name</p>
                      <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#ffffff;">${firstName}</p>
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#444;">Father's Name</p>
                      <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#ffffff;">${fatherName}</p>
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#444;">Last Name</p>
                      <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#ffffff;">${lastName}</p>
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#444;">Origin</p>
                      <p style="margin:0;font-size:14px;color:#a78bfa;">${origin}</p>
                    </td>
                  </tr>
                </table>

                <!-- Rating -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td style="background:#161616;border-radius:12px;padding:18px 20px;border:1px solid #222;">
                      <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#444;">Rating — ${rating}/10</p>
                      <div>${bars}</div>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 40px;border-top:1px solid #161616;">
                <p style="margin:0;font-size:11px;color:#2a2a2a;letter-spacing:1px;">DISHA Library — Verdict System</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
