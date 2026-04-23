export const getMessageTemplate = (name, message, messageType, isSpecial) => {
  const badge =
    messageType === "error"
      ? { label: "Weird Name", color: "#FF4D6D", bg: "#FF4D6D18", border: "#FF4D6D40" }
      : isSpecial
      ? { label: "Special User", color: "#f59e0b", bg: "#f59e0b18", border: "#f59e0b40" }
      : { label: "Default", color: "#7c3aed", bg: "#7c3aed18", border: "#7c3aed40" };

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
              <td style="height:3px;background:linear-gradient(90deg,#7c3aed,#a855f7,#6366f1);"></td>
            </tr>

            <!-- Header -->
            <tr>
              <td style="padding:36px 40px 24px;">
                <p style="margin:0 0 8px;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#7c3aed;font-weight:600;">DISHA Library</p>
                <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">New Visitor 👋</h1>
                <p style="margin:8px 0 0;font-size:13px;color:#444;letter-spacing:0.2px;">Someone just interacted on the Developer Page</p>
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

                <!-- Name -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                  <tr>
                    <td style="background:#161616;border-radius:12px;padding:18px 20px;border:1px solid #222;">
                      <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#444;">Name Entered</p>
                      <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.2px;">${name}</p>
                    </td>
                  </tr>
                </table>

                <!-- Message Shown -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                  <tr>
                    <td style="background:#0e0a1a;border-radius:12px;padding:20px 22px;border:1px solid #2a1f40;border-left:3px solid #7c3aed;">
                      <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#7c3aed;">Message Shown</p>
                      <p style="margin:0;font-size:15px;line-height:1.8;color:#c4b5fd;font-style:italic;">"${message}"</p>
                    </td>
                  </tr>
                </table>

                <!-- Badge -->
                <p style="margin:0 0 10px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#444;">User Type</p>
                <span style="display:inline-block;padding:6px 16px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;background:${badge.bg};color:${badge.color};border:1px solid ${badge.border};">
                  ${badge.label}
                </span>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 40px;border-top:1px solid #161616;">
                <p style="margin:0;font-size:11px;color:#2a2a2a;letter-spacing:1px;">DISHA Library &mdash; Developer Alert System</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};