"use client";

import { Flex, IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { DeletePrompt, Reminders, Repeat, Time, Title } from "./components";
import { Paper } from "@ui/components";
import { LuMoreVertical } from "react-icons/lu";

export function Notification({ id, title, repeat, reminders, time }: NotificationDto) {
  return (
    <Paper gap={3}>
      <Flex justify="space-between">
        <Title id={id} title={title} />
        <Menu>
          <MenuButton
            as={IconButton}
            ml={3}
            minWidth="35px"
            w="35px"
            h="35px"
            variant="ghost"
            aria-label="Actions"
            icon={<LuMoreVertical />}
          />
          <MenuList>
            <DeletePrompt ids={[id]} />
          </MenuList>
        </Menu>
      </Flex>
      <Time id={id} time={time} />
      <Repeat id={id} repeat={repeat} />
      <Reminders id={id} reminders={reminders} />
    </Paper>
  );
}
