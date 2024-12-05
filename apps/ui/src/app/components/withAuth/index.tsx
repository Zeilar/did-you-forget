import type { UserWithoutPasswordDto } from "@did-you-forget/dto";
import { serverFetch } from "@ui/common/fetchers/server";
import { redirect } from "next/navigation";
import type { ComponentType } from "react";

export function withAuth<T extends object = object>(Component: ComponentType<T>) {
  return async function Page(props: T) {
    const { status } = await serverFetch<UserWithoutPasswordDto>("/user");
    if (status >= 400) {
      redirect("/login");
      return null;
    }

    return <Component {...props} />;
  };
}
