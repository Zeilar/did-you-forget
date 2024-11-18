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

export function Notification({ id, title, createdAt }: NotificationDto) {
  return (
    <AccordionRoot
      key={id}
      collapsible
      variant="plain"
      rounded="lg"
      border="1px solid"
      borderColor="border"
      bgColor="gray.900"
      px={3}
    >
      <AccordionItem value={id}>
        <AccordionItemTrigger>
          <Text>{title}</Text>
          <Checkbox ml="auto" />
        </AccordionItemTrigger>
        <AccordionItemContent pb={3}>
          <Flex gap={2} justify="flex-end">
            <EditPrompt id={id} originalTitle={title} />
            <DeletePrompt id={id} />
          </Flex>
          <p>Created: {new Date(createdAt).toISOString()}</p>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
