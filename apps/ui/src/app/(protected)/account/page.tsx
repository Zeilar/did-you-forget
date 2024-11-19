import { serverFetch } from "@ui/common/fetchers/server";
import { withAuth } from "src/app/components";

async function Page() {
  const { data } = await serverFetch("/session");

  console.log(data);

  return <p>Account</p>;
}

export default withAuth(Page);
