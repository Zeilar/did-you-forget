import { withAuth } from "src/app/components";

async function Page() {
  return <p>Account</p>;
}

export default withAuth(Page);
