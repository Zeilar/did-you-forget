import { Flex } from "@chakra-ui/react";
import { Login } from "./Login";

export default function Page() {
  return (
    <Flex p={3} m="auto" h="full" align="center" justify="center">
      <Login />
    </Flex>
  );
}
