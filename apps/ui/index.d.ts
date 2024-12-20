export {};

declare module "*.svg" {
  const content: string;
  export const ReactComponent: React.FC;
  export default content;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VAPID_PUBLIC_KEY: string;
      VAPID_PRIVATE_KEY: string;
      NEXT_PUBLIC_API_URL: string;
    }
  }
}
