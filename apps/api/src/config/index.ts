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
    },
    globalPrefix: "api",
    cors: process.env.CORS,
  };
}
