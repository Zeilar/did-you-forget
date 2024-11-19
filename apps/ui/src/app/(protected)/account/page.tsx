import { Flex } from "@chakra-ui/react";
import type { SessionsForUserDto } from "@did-you-forget/dto";
import { serverFetch } from "@ui/common/fetchers/server";
import { Title } from "@ui/components";
import { Sessions } from "@ui/resources/session";
import { withAuth } from "src/app/components";

async function Page() {
  const sessionsQuery = await serverFetch<SessionsForUserDto>("/session");

  return (
    <div>
      <Title as={Flex} justifyContent="space-between" alignItems="center" w="100%">
        Sessions
      </Title>
      <Sessions initialData={sessionsQuery.data?.sessions ?? []} />
    </div>
  );
}

export default withAuth(Page);
