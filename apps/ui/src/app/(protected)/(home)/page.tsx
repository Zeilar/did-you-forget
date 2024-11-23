import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Heading } from "@chakra-ui/react";
import type { NotificationsForUserDto } from "@did-you-forget/dto";
import { serverFetch } from "@ui/common/fetchers/server";
import { EmptyState, Title } from "@ui/components";
import { Notifications } from "@ui/resources/notification";
import { withAuth } from "src/app/components";
import { BsAlarm } from "react-icons/bs";

// import { useState, useEffect } from "react";
// import { subscribe, unsubscribe, notify } from "./actions";

// function PushNotificationManager() {
//   const [isSupported, setIsSupported] = useState(false);
//   const [subscription, setSubscription] = useState<PushSubscription | null>(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if ("serviceWorker" in navigator && "PushManager" in window) {
//       setIsSupported(true);
//       registerServiceWorker();
//     }
//   }, []);

//   async function registerServiceWorker() {
//     const registration = await navigator.serviceWorker.register("/sw.js", {
//       scope: "/",
//       updateViaCache: "none",
//     });
//     const sub = await registration.pushManager.getSubscription();
//     setSubscription(sub);
//   }

//   async function subscribeToPush() {
//     const registration = await navigator.serviceWorker.ready;
//     const sub = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
//     });
//     setSubscription(sub);
//     console.log(sub.toJSON());
//     await subscribe(sub.toJSON());
//   }

//   async function unsubscribeFromPush() {
//     await subscription?.unsubscribe();
//     setSubscription(null);
//     await unsubscribe();
//   }

//   async function sendTestNotification() {
//     if (subscription) {
//       await notify(message, subscription.toJSON());
//       setMessage("");
//     }
//   }

//   if (!isSupported) {
//     return <p>Push notifications are not supported in this browser.</p>;
//   }

//   return (
//     <div>
//       <h3>Push Notifications</h3>
//       {subscription ? (
//         <>
//           <p>You are subscribed to push notifications.</p>
//           <button onClick={unsubscribeFromPush}>Unsubscribe</button>
//           <input
//             type="text"
//             placeholder="Enter notification message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button onClick={sendTestNotification}>Send Test</button>
//         </>
//       ) : (
//         <>
//           <p>You are not subscribed to push notifications.</p>
//           <button onClick={subscribeToPush}>Subscribe</button>
//         </>
//       )}
//     </div>
//   );
// }

async function Page() {
  const notificationsQuery = await serverFetch<NotificationsForUserDto>("/notification");
  const notifications = notificationsQuery.data?.notifications ?? [];

  return (
    <div>
      <Heading>Notifications</Heading>
      {notifications.length > 0 ? (
        <Notifications initialData={notifications} />
      ) : (
        <Alert status="info" variant="subtle" flexDir="column" rounded="md" p={8} gap={2}>
          <BsAlarm size={40} color="var(--chakra-colors-accent-500)" />
          <AlertTitle mt={2}>No notifications found</AlertTitle>
          <AlertDescription>Add some notifications before you forget</AlertDescription>
        </Alert>
      )}
      {/* <PushNotificationManager /> */}
    </div>
  );
}

export default withAuth(Page);
