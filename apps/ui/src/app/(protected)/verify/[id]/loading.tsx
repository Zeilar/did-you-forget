import { Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div>
      <Spinner color="text.primary" />
      <Text>Verifying your account...</Text>
    </div>
  );
}
