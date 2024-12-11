import { Spinner, Text } from "@chakra-ui/react";

export default function Page() {
  return (
    <div>
      <Spinner color="text.primary" />
      <Text>Verifying your account...</Text>
    </div>
  );
}
