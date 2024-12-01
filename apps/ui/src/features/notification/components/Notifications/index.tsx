"use client";

import {
  Box,
  Grid,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Notification } from "../Notification";
import type { NotificationDto, NotificationsForUserDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { inputProps, Paper } from "@ui/components";
import { BsPlusSquare } from "react-icons/bs";

interface NotificationsProps {
  initialData: NotificationDto[];
}

export function Notifications({ initialData }: NotificationsProps) {
  const [search, setSearch] = useState<string>("");
  const { data = [] } = useQuery<NotificationDto[]>(
    "notifications",
    async () => {
      const { data } = await clientFetch<NotificationsForUserDto>("/notification");
      return data?.notifications ?? [];
    },
    { initialData, cacheTime: 0 } // For some reason the cache invalidation in useEditNotification doesn't work.
  );
  const searchedNotifications = useMemo<NotificationDto[]>(
    () =>
      search
        ? data.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
        : data,
    [data, search]
  );

  return (
    <>
      <Paper rounded="none" flexDir="row" justify="space-between">
        <Heading m={0}>Notifications</Heading>
        <Button leftIcon={<BsPlusSquare />}>Add</Button>
      </Paper>
      <Box px={3} mt={3}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <LuSearch color="var(--chakra-colors-text-muted)" />
          </InputLeftElement>
          <Input
            {...inputProps}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          {search && (
            <InputRightElement>
              <LuX role="button" onClick={() => setSearch("")} cursor="pointer" />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>
      <Grid gridTemplateColumns={["repeat(1, 1fr)"]} gap={3} p={3}>
        {!search ? (
          <AnimatePresence>
            {data.map((notification) => (
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
