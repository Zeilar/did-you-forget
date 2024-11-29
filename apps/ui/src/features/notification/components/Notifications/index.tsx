"use client";

import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Notification } from "../Notification";
import type { NotificationDto, NotificationsForUserDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { Input } from "@ui/components";

interface NotificationsProps {
  initialData: NotificationDto[];
}

export function Notifications({ initialData }: NotificationsProps) {
  const [checked, setChecked] = useState<string[]>([]); // Notification id array.
  // const deleteNotification = useDeleteNotification(checked, (deletedIds) =>
  //   setChecked((p) => p.filter((id) => !deletedIds.includes(id)))
  // );
  const [search, setSearch] = useState<string>("");
  const { data = [] } = useQuery<NotificationDto[]>(
    "notifications",
    async () => {
      const { data } = await clientFetch<NotificationsForUserDto>("/notification");
      return data?.notifications ?? [];
    },
    { initialData, cacheTime: 0 } // For some reason the cache invalidation in useEditNotification doesn't work
  );
  const searchedNotifications = useMemo<NotificationDto[]>(
    () =>
      search
        ? data.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
        : data,
    [data, search]
  );
  const onSelect = useCallback(
    (id: string): void =>
      setChecked((p) => (p.includes(id) ? p.filter((element) => element !== id) : [...p, id])),
    []
  );

  return (
    <>
      {/* <ActionBarRoot open={checked.length > 0}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>{checked.length} selected</ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button
            onClick={() => deleteNotification.mutate()}
            loading={deleteNotification.isLoading}
          >
            <BsTrash />
            <span>Delete</span>
          </Button>
          <ActionBarSeparator />
          <Button onClick={() => setChecked([])}>
            <LuX />
            <span>Clear</span>
          </Button>
        </ActionBarContent>
      </ActionBarRoot> */}
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        // start={<LuSearch />}
        // end={search && <LuX role="button" onClick={() => setSearch("")} cursor="pointer" />}
      />
      <Grid gridTemplateColumns={["repeat(1, 1fr)"]} gap={3} p={3}>
        {!search ? (
          <AnimatePresence>
            {data.map((notification) => (
              <motion.div key={notification.id} exit={{ opacity: 0 }}>
                <Notification
                  isSelected={checked.includes(notification.id)}
                  onSelect={onSelect}
                  {...notification}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          searchedNotifications.map((notification) => (
            <Notification
              key={notification.id}
              isSelected={checked.includes(notification.id)}
              onSelect={onSelect}
              {...notification}
            />
          ))
        )}
      </Grid>
    </>
  );
}
