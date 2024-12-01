"use client";

import { Box, Flex, IconButton, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { DeletePrompt, Reminders, Repeat, Title } from "./components";
import { Paper } from "@ui/components";
import { LuMoreVertical } from "react-icons/lu";

const DAYS: string[] = ["m", "t", "w", "t", "f", "s", "s"];

export function Notification({ id, title, repeat, reminders }: NotificationDto) {
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
      <Box bgColor="gray.800" p={3} rounded="md">
        <Text mb={3}>Repeat</Text>
        <Flex gap={3}>
          {DAYS.map((day, i) => (
            <Repeat
              key={`${id}-${day}-${i}`}
              id={id}
              isActive={repeat.includes(i)}
              index={i}
              repeat={repeat}
            >
              {day}
            </Repeat>
          ))}
        </Flex>
      </Box>
      <Reminders id={id} reminders={reminders} />
    </Paper>
  );
}
