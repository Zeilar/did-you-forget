import { generateVAPIDKeys } from "web-push";

const { privateKey, publicKey } = generateVAPIDKeys();

console.log("-------------------");
console.log("Paste the following keys in your .env file:");
console.log("NEXT_PUBLIC_VAPID_PUBLIC_KEY=", publicKey);
console.log("VAPID_PRIVATE_KEY=", privateKey);
console.log("-------------------");
