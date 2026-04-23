const adminOtpTemplate = (otp) => {
  return `
    <div style="margin:0;padding:0;background:#f0f0f5;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">

      <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:18px;padding:40px 32px;text-align:center;border:1px solid #e5e5ea;">

        <!-- Badge -->
        <div style="display:inline-block;background:#f5f0ff;border:1px solid #d0b8ff;border-radius:8px;padding:5px 14px;margin-bottom:20px;">
          <span style="font-size:12px;font-weight:600;color:#6c2bd9;letter-spacing:0.08em;text-transform:uppercase;">
            Admin Verification
          </span>
        </div>

        <h1 style="margin:0 0 10px;font-size:22px;color:#1d1d1f;font-weight:700;">
          Admin Login OTP
        </h1>

        <p style="margin:0 0 28px;font-size:14px;color:#6e6e73;line-height:1.6;">
          A login attempt was made to the <strong style="color:#1d1d1f;">DISHA Library Admin Panel</strong>.<br/>
          Use the OTP below to complete your identity verification.
        </p>

        <!-- OTP Box -->
        <div style="display:inline-block;background:#0a0a14;border-radius:14px;padding:18px 40px;margin-bottom:28px;">
          <p style="margin:0 0 4px;font-size:11px;color:#8e8e93;letter-spacing:0.1em;text-transform:uppercase;">
            One-Time Password
          </p>
          <p style="margin:0;font-size:36px;font-weight:700;color:#a78bfa;letter-spacing:0.25em;">
            ${otp}
          </p>
        </div>

        <p style="margin:0 0 6px;font-size:13px;color:#6e6e73;">
          This OTP is valid for <strong style="color:#d92c2c;">10 minutes</strong> only.
        </p>

        <p style="margin:0 0 28px;font-size:13px;color:#6e6e73;">
          Do not share this code with anyone.
        </p>

        <div style="border-top:1px solid #e5e5ea;padding-top:20px;">
          <p style="margin:0;font-size:12px;color:#8e8e93;line-height:1.6;">
            If you did not attempt to log in, your credentials may be compromised.<br/>
            Please secure your account immediately.
          </p>
        </div>

      </div>

      <p style="text-align:center;font-size:12px;color:#8e8e93;margin-top:12px;">
        DISHA Library &mdash; Admin Panel &copy; ${new Date().getFullYear()}
      </p>

    </div>
  `;
};

export default adminOtpTemplate;