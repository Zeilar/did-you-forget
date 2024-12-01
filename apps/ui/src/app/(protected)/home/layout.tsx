import { Navbar } from "@ui/components";
import type { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
