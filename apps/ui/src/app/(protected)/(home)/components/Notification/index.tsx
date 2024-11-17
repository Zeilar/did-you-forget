"use client";

import { Box } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Button,
  Checkbox,
} from "@ui/components";
import { useMutation } from "react-query";

export function Notification({ id, title }: NotificationDto) {
  const { data, status, mutate } = useMutation(["deleteNotification", id], () =>
    clientFetch(`/notification/delete?ids=${id}`, "DELETE")
  );

  console.log(data, status);

  return (
    <AccordionRoot
      key={id}
      collapsible
      variant="plain"
      rounded="lg"
      border="1px solid"
      borderColor="border"
      px={3}
    >
      <AccordionItem value={id}>
        <AccordionItemTrigger>
          {title}
          <Checkbox ml="auto" />
        </AccordionItemTrigger>
        <AccordionItemContent pb={3}>
          <Box padding="1px">
            <Button bgColor="danger" onClick={() => mutate()}>
              Delete
            </Button>
          </Box>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
