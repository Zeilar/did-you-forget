export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SECURE: string;
      CORS: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_PORT: string;
      DB_HOST: string;
      DB_URL: string;
    }
  }
}
