export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: string;
      SECURE: string;
      CORS: string;
      SESSION_COOKIE_DOMAIN: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_PORT: string;
      DB_HOST: string;
      DB_URL: string;
      MAILJET_API_KEY: string;
      MAILJET_SECRET_KEY: string;
    }
  }
}
