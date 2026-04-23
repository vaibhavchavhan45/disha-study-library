const reportTemplate = (email, ip, time) => `
  <div style="font-family: sans-serif; padding: 24px; max-width: 480px;">
    <h2 style="color: #e11d48;">Suspicious Login Attempt Detected</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
      <tr>
        <td style="padding: 8px 0; color: #6b7280; width: 100px;">Email</td>
        <td style="padding: 8px 0; font-weight: 600;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">IP Address</td>
        <td style="padding: 8px 0; font-weight: 600;">${ip}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Time</td>
        <td style="padding: 8px 0; font-weight: 600;">${time}</td>
      </tr>
    </table>
    <p style="margin-top: 20px; color: #6b7280; font-size: 13px;">
      This is an automated alert from Disha Admin Panel.
    </p>
  </div>
`;

export default reportTemplate;