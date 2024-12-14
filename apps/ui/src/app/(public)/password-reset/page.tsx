import { Heading, Text } from "@chakra-ui/react";
import { Paper } from "@ui/components";
import { PasswordReset } from "./PasswordReset";
import { BackButton } from "./BackButton";

export default function Page() {
  return (
    <>
      <Heading textAlign="center">Pasword Reset</Heading>
      <Paper>
        <Text>
          Enter the email associated with your account and click send to receive your reset code.
        </Text>
        <PasswordReset />
      </Paper>
      <BackButton />
    </>
  );
}
