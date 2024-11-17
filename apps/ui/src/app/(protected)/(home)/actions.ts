"use server";

import { serverFetch } from "@ui/common/fetchers/server";
import { revalidatePath } from "next/cache";
import {
  sendNotification,
  setVapidDetails,
  type SendResult,
  type PushSubscription,
} from "web-push";

setVapidDetails(
  "mailto:philip_angelin@hotmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function deleteNotifications(ids: string[]): Promise<void> {
  const x = await serverFetch(`/notification?ids=${ids.join(",")}`, "DELETE");
  console.log({ x });
  revalidatePath("/");
}

export async function subscribe(subscription: PushSubscriptionJSON) {
  console.log("subscribe", subscription);
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true };
}

export async function unsubscribe() {
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

export async function notify(
  message: string,
  subscription: PushSubscriptionJSON
): Promise<SendResult | null> {
  console.log("notify", subscription);
  try {
    return sendNotification(
      subscription as PushSubscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
      })
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
