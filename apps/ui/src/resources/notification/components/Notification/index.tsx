"use client";

import { Flex, Text } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Checkbox,
} from "@ui/components";
import { DeletePrompt, EditPrompt } from "./components";

interface NotificationProps extends NotificationDto {
  onSelect(id: string): void;
  isSelected: boolean;
}

export function Notification({ onSelect, isSelected, id, title, createdAt }: NotificationProps) {
  return (
    <Flex gap={2}>
      <AccordionRoot>
        <AccordionItem value={id}>
          <AccordionItemTrigger>
            <Text>{title}</Text>
          </AccordionItemTrigger>
          <AccordionItemContent pb={3}>
            <Flex gap={2} justify="flex-end">
              <EditPrompt id={id} originalTitle={title} />
              <DeletePrompt ids={[id]} />
            </Flex>
            <p>Created: {new Date(createdAt).toISOString()}</p>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
      <Flex
        hideBelow="md"
        rounded="md"
        border="1px solid"
        borderColor="border"
        bgColor="gray.900"
        p={3}
        h="fit-content"
      >
        <Checkbox onCheckedChange={() => onSelect(id)} checked={isSelected} />
      </Flex>
    </Flex>
  );
}
