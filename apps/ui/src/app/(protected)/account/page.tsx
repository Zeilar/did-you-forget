import { withAuth } from "src/app/components";
import { Logout } from "./Logout";
import { serverFetch } from "@ui/common/fetchers/server";
import type { UserWithoutPasswordDto } from "@did-you-forget/dto";
import { DeleteSessions } from "./DeleteSessions";
import { Credentials } from "./Credentials";
import { Box, Divider } from "@chakra-ui/react";

async function Page() {
  const { data } = await serverFetch<UserWithoutPasswordDto>("/user");

  return (
    <>
      <Credentials initialData={data} />
      <Box mt={4}>
        <Logout />
      </Box>
      <Divider my={4} />
      <DeleteSessions />
    </>
  );
}

export default withAuth(Page);
