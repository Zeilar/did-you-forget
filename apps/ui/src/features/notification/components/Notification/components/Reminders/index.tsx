import { Flex, type FlexProps } from "@chakra-ui/react";
import { NotificationDto } from "@did-you-forget/dto";
import { Accordion } from "@ui/components";
import { Reminder } from "./components";

const flexProps: FlexProps = { bgColor: "gray.800", shadow: "none" };

export function Reminders({ id, reminders }: Pick<NotificationDto, "id" | "reminders">) {
  return (
    <Accordion title="Reminders" flexProps={flexProps}>
      <Flex flexDir="column" gap={2}>
        {reminders.map((reminder, i) => (
          <Reminder key={`${reminder}-${i}`} id={id} reminders={reminders} reminder={reminder} />
        ))}
      </Flex>
    </Accordion>
  );
}
