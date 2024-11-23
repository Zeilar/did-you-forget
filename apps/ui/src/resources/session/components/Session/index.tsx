"use client";

import type { SessionForUserDto } from "@did-you-forget/dto";

export function Session({ id, ipAddress, current, expires }: SessionForUserDto) {
  return null;
  // return (
  //   <AccordionRoot>
  //     <AccordionItem value={id}>
  //       <AccordionItemTrigger>
  //         <Text>{ipAddress}</Text>
  //       </AccordionItemTrigger>
  //       <AccordionItemContent pb={3}>
  //         {current && <p>This is the current session.</p>}
  //         {expires && new Date(expires).toUTCString()}
  //       </AccordionItemContent>
  //     </AccordionItem>
  //   </AccordionRoot>
  // );
}
