import { type FlexProps, Flex } from "@chakra-ui/react";

export function Paper(props: FlexProps) {
  return (
    <Flex flexDir="column" gap={3} p={3} bgColor="bg.paper" rounded="md" shadow="md" {...props} />
  );
}
