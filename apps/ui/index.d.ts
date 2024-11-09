export {};

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VAPID_PUBLIC_KEY: string;
      VAPID_PRIVATE_KEY: string;
    }
  }
}
