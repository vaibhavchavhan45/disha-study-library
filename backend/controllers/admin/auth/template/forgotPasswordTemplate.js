const forgotPasswordTemplate = (resetLink) => {
  return `
    <div style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
      
      <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:18px;padding:40px 32px;text-align:center;border:1px solid #e5e5ea;">
        
        <h1 style="margin:0 0 12px;font-size:22px;color:#1d1d1f;font-weight:600;">
          Reset your password
        </h1>

        <p style="margin:0 0 24px;font-size:15px;color:#6e6e73;line-height:1.6;">
          We received a request to reset your admin password.
          Click the button below to continue.
        </p>

        <a href="${resetLink}"
           style="display:inline-block;background:#0071e3;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:10px;font-size:15px;font-weight:500;">
          Reset Password
        </a>

        <p style="margin:28px 0 10px;font-size:13px;color:#6e6e73;">
          Or copy and paste this link:
        </p>

        <p style="word-break:break-all;font-size:13px;color:#0071e3;">
          ${resetLink}
        </p>

        <p style="margin:28px 0 0;font-size:13px;color:#d92c2c;">
          This link expires in 10 minutes.
        </p>

      </div>

      <p style="text-align:center;font-size:12px;color:#8e8e93;">
        If you didn’t request this, you can ignore this email.
      </p>

    </div>
  `;
};

export default forgotPasswordTemplate;