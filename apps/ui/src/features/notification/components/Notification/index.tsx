"use client";

import { Flex } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { DeletePrompt, Reminders, Repeat, Time, Title } from "./components";
import { Paper } from "@ui/components";

export function Notification({ id, title, repeat, reminders, time }: NotificationDto) {
  return (
    <Paper gap={3}>
      <Flex justify="space-between">
        <Title id={id} title={title} />
        <DeletePrompt ids={[id]} />
      </Flex>
      <Time id={id} time={time} />
      <Repeat id={id} repeat={repeat} />
      <Reminders id={id} reminders={reminders} />
    </Paper>
  );
}
