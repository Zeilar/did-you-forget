import { Link } from "@chakra-ui/next-js";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { serverFetch } from "@ui/common/fetchers/server";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const { ok, status } = await serverFetch(`/user/verify/${params.id}`, "POST");

  if (!ok) {
    console.error(`${status} Failed to verify account.`);
  }

  return ok ? (
    <Alert status="success">
      <AlertIcon />
      <div>
        <AlertTitle>Successfully verified account</AlertTitle>
        <AlertDescription>
          Start creating your notifications <Link href="/home">here</Link>.
        </AlertDescription>
      </div>
    </Alert>
  ) : (
    <Alert status="error">
      <AlertIcon />
      <div>
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>We couldn&apos;t verify your account. Please try again.</AlertDescription>
      </div>
    </Alert>
  );
}
