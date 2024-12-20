import { Navbar } from "@ui/components";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
