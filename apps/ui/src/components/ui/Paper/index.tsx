import { BoxProps, Flex } from "@chakra-ui/react";

export function Paper(props: BoxProps) {
  return (
    <Flex flexDir="column" gap={4} p={4} bgColor="bg.paper" rounded="md" shadow="md" {...props} />
  );
}
