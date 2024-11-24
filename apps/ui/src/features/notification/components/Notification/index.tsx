"use client";

import { Flex, FormLabel, IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { DeletePrompt, Repeat, Title } from "./components";
import { Paper } from "@ui/components";
import { LuMoreVertical } from "react-icons/lu";

interface NotificationProps extends NotificationDto {
  onSelect(id: string): void;
  isSelected: boolean;
}

const DAYS: string[] = ["m", "t", "w", "t", "f", "s", "s"];

export function Notification({ onSelect, isSelected, id, title, repeat }: NotificationProps) {
  return (
    <Paper>
      <Flex justify="space-between" align="center">
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
      <div>
        <FormLabel color="text.muted">Repeat</FormLabel>
        <Flex gap={3}>
          {DAYS.map((day, i) => (
            <Repeat key={`${id}-${day}-${i}`} id={id} isActive={repeat.includes(i)} index={i} repeat={repeat}>
              {day}
            </Repeat>
          ))}
        </Flex>
      </div>
    </Paper>
  );
}
