import { Box, Flex, Grid } from "@chakra-ui/react";
import { NotificationsForUserDto, UserWithoutPasswordDto } from "@did-you-forget/dto";
import { serverFetch } from "@ui/common/fetchers/server";
import { redirect } from "next/navigation";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Button,
  Checkbox,
  InputWithAddon,
  Title,
} from "@ui/components";
import { LuSearch } from "react-icons/lu";
import { deleteNotifications } from "./actions";
import { Notification } from "./components";

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

export default async function Page() {
  const profileQuery = await serverFetch<UserWithoutPasswordDto>("/user/profile");
  if (profileQuery.status >= 400) {
    redirect("/login");
    return null;
  }
  const notificationsQuery = await serverFetch<NotificationsForUserDto>("/notification");

  return (
    <div>
      <Title as={Flex} justifyContent="space-between" alignItems="center" w="100%">
        Notifications
      </Title>
      <InputWithAddon addon={<LuSearch color="var(--chakra-colors-cyan-500)" />} />
      <Grid gridTemplateColumns={["repeat(1, 1fr)"]} gap={2} mt={2}>
        {notificationsQuery.data?.notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </Grid>
      {/* <PushNotificationManager /> */}
    </div>
  );
}
