"use client";

import { Text } from "@chakra-ui/react";
import type { SessionForUserDto } from "@did-you-forget/dto";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@ui/components";

export function Session({ id, ipAddress, current, expires }: SessionForUserDto) {
  return (
    <AccordionRoot>
      <AccordionItem value={id}>
        <AccordionItemTrigger>
          <Text>{ipAddress}</Text>
        </AccordionItemTrigger>
        <AccordionItemContent pb={3}>
          {current && <p>This is the current session.</p>}
          {expires && new Date(expires).toUTCString()}
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
