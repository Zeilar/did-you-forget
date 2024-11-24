import { BoxProps, Flex } from "@chakra-ui/react";

export function Paper(props: BoxProps) {
  return (
    <Flex flexDir="column" gap={3} p={3} bgColor="bg.paper" rounded="md" shadow="md" {...props} />
  );
}
