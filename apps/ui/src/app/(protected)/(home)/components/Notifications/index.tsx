"use client";

import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Notification } from "../Notification";
import type { NotificationDto, NotificationsForUserDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { AnimatePresence, motion } from "motion/react";

interface NotificationsProps {
  initialData: NotificationDto[];
}

export function Notifications({ initialData }: NotificationsProps) {
  const { data } = useQuery<NotificationDto[]>(
    "notifications",
    async () => {
      const { data } = await clientFetch<NotificationsForUserDto>("/notification");
      return data?.notifications ?? [];
    },
    { initialData }
  );

  return (
    <Grid gridTemplateColumns={["repeat(1, 1fr)"]} gap={2} mt={2}>
      <AnimatePresence>
        {data?.map((notification) => (
          <motion.div key={notification.id} exit={{ opacity: 0 }}>
            <Notification {...notification} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Grid>
  );
}
