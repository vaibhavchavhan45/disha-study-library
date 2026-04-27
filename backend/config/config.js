import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  emailAdmin1: process.env.EMAIL_ADMIN_1,
  emailAdmin2: process.env.EMAIL_ADMIN_2,
  recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY,
  devEmail: process.env.DEV_EMAIL,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL
};

export default config;