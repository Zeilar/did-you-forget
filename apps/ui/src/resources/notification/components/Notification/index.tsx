"use client";

import { Flex, IconButton, Menu, MenuButton, MenuDivider, MenuList, Text } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { DeletePrompt, EditPrompt } from "./components";
import { Paper } from "@ui/components";
import { LuMoreVertical } from "react-icons/lu";

interface NotificationProps extends NotificationDto {
  onSelect(id: string): void;
  isSelected: boolean;
}

export function Notification({ onSelect, isSelected, id, title }: NotificationProps) {
  return (
    <Paper>
      <Flex justify="space-between" align="center">
        <Text>{title}</Text>
        <Menu>
          <MenuButton
            as={IconButton}
            minWidth="35px"
            w="35px"
            h="35px"
            variant="ghost"
            aria-label="Actions"
            icon={<LuMoreVertical />}
          />
          <MenuList>
            <EditPrompt originalTitle={title} id={id} />
            <MenuDivider borderColor="border" />
            <DeletePrompt ids={[id]} />
          </MenuList>
        </Menu>
      </Flex>
    </Paper>
  );
}
