import { withAuth } from "src/app/components";
import { Logout } from "./Logout";
import { serverFetch } from "@ui/common/fetchers/server";
import type { UserWithoutPasswordDto } from "@did-you-forget/dto";
import { DeleteSessions } from "./DeleteSessions";
import { Credentials } from "./Credentials";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { Paper } from "@ui/components";
import { Verify } from "./Verify";

async function Page() {
  const { data } = await serverFetch<UserWithoutPasswordDto>("/user");

  return (
    <Stack spacing={4} m={4}>
      {!data.isVerified && (
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertTitle>Verify your account</AlertTitle>
            <AlertDescription>
              Most functions are locked until you <Verify email={data.email} />.
            </AlertDescription>
          </Box>
        </Alert>
      )}
      <Paper>
        <Credentials initialData={data} />
        <Divider my={2} />
        <Box>
          <Logout />
        </Box>
        <Divider my={2} />
        <DeleteSessions disabled={!data.isVerified} />
      </Paper>
    </Stack>
  );
}

export default withAuth(Page);
