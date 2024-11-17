"use client";

import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Notification } from "../Notification";
import type { NotificationDto, NotificationsForUserDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { AnimatePresence, motion } from "motion/react";
import { InputWithAddon } from "@ui/components";
import { LuSearch } from "react-icons/lu";
import { useMemo, useState } from "react";

interface NotificationsProps {
  initialData: NotificationDto[];
}

export function Notifications({ initialData }: NotificationsProps) {
  const [search, setSearch] = useState<string>("");
  const { data } = useQuery<NotificationDto[]>(
    "notifications",
    async () => {
      const { data } = await clientFetch<NotificationsForUserDto>("/notification");
      return data?.notifications ?? [];
    },
    { initialData }
  );
  const searchedNotifications = useMemo<NotificationDto[]>(
    () =>
      search
        ? (data || []).filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
        : data ?? [],
    [data, search]
  );

  return (
    <>
      <InputWithAddon
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        addon={<LuSearch color="var(--chakra-colors-cyan-500)" />}
      />
      <Grid gridTemplateColumns={["repeat(1, 1fr)"]} gap={2} mt={2}>
        {!search ? (
          <AnimatePresence>
            {data?.map((notification) => (
              <motion.div key={notification.id} exit={{ opacity: 0 }}>
                <Notification {...notification} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          searchedNotifications.map((notification) => (
            <Notification key={notification.id} {...notification} />
          ))
        )}
      </Grid>
    </>
  );
}
