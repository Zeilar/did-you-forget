"ues client";

import { Button } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { useEditNotification } from "@ui/features/notification/hooks";
import type { PropsWithChildren } from "react";

interface RepeatProps extends Pick<NotificationDto, "id" | "repeat">, PropsWithChildren {
  index: number;
  isActive: boolean;
}

export function Repeat({ id, repeat, isActive, index, children }: RepeatProps) {
  const { isLoading, mutate } = useEditNotification(id);

  return (
    <Button
      size="sm"
      variant="unstyled"
      rounded="full"
      display="flex"
      textTransform="uppercase"
      bgColor={isActive ? "primary.400" : "inherit"}
      color={isActive ? "black" : "inherit"}
      isLoading={isLoading}
      onClick={() =>
        mutate({
          repeat: isActive ? repeat.filter((element) => element !== index) : [...repeat, index],
        })
      }
    >
      {children}
    </Button>
  );
}
