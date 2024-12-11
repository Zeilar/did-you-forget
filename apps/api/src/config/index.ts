export default function config() {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    secure: process.env.SECURE === "true",
    db: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      url: process.env.DB_URL,
      host: process.env.DB_HOST || "localhost",
    },
    sessionCookie: {
      name: "dyf-session",
      domain: process.env.SESSION_COOKIE_DOMAIN,
      expires: 1000 * 60 * 60 * 24 * 7 * 4, // 28 days (one month).
      rememberMeExpires: 1000 * 60 * 60 * 24 * 365, // 365 days (one year).
    },
    globalPrefix: "api",
    cors: process.env.CORS,
    mailjet: {
      keys: {
        api: process.env.MAILJET_API_KEY,
        secret: process.env.MAILJET_SECRET_KEY,
      },
      sender: {
        email: "philip@angelin.dev",
        name: "Did You Forget",
      },
    },
    pendingVerificationExpires: 1000 * 60 * 15, // 15 minutes.
  };
}
