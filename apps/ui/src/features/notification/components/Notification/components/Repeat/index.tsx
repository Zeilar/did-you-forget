"ues client";

import { Box, Button, Flex, FormLabel, Switch, Text } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { useEditNotification } from "@ui/features/notification/hooks";
import type { PropsWithChildren } from "react";

interface RepeatButtonProps extends Pick<NotificationDto, "id" | "repeat">, PropsWithChildren {
  index: number;
  isActive: boolean;
  isLoading: boolean;
}

const DAYS: string[] = ["m", "t", "w", "t", "f", "s", "s"];
const REPEAT: number[] = [0, 1, 2, 3, 4, 5, 6];

function RepeatButton({ id, repeat, isActive, index, children, isLoading }: RepeatButtonProps) {
  const editNotification = useEditNotification(id);

  return (
    <Button
      size="sm"
      variant="unstyled"
      rounded="full"
      display="flex"
      textTransform="uppercase"
      bgColor={isActive ? "primary.600" : "bg.paper"}
      color={isActive ? "text.default" : "text.muted"}
      isLoading={isLoading || editNotification.isLoading}
      onClick={() =>
        editNotification.mutate({
          repeat: isActive ? repeat.filter((element) => element !== index) : [...repeat, index],
        })
      }
      _hover={{
        bgColor: isActive ? "primary.700" : "gray.700",
      }}
      _loading={{
        _hover: {
          bgColor: isActive ? "primary.600" : "bg.paper",
        },
      }}
    >
      {children}
    </Button>
  );
}

export function Repeat({ id, repeat }: Pick<NotificationDto, "id" | "repeat">) {
  const { isLoading, mutate } = useEditNotification(id);
  const isAllSelected = repeat.length === REPEAT.length;

  return (
    <Box bgColor="gray.800" p={4} rounded="md">
      <Flex mb={4} justify="space-between">
        <Text color="text.secondary" fontWeight={500}>
          Repeat
        </Text>
        <Flex align="center">
          <FormLabel m={0} pr={2} htmlFor={id} cursor="pointer">
            Every day
          </FormLabel>
          <Switch
            id={id}
            disabled={isLoading}
            isChecked={isAllSelected}
            onChange={() => mutate({ repeat: !isAllSelected ? REPEAT : [] })}
          />
        </Flex>
      </Flex>
      <Flex gap={2}>
        {DAYS.map((day, i) => (
          <RepeatButton
            key={`${id}-${day}-${i}`}
            id={id}
            isActive={repeat.includes(i)}
            index={i}
            repeat={repeat}
            isLoading={isLoading}
          >
            {day}
          </RepeatButton>
        ))}
      </Flex>
    </Box>
  );
}
