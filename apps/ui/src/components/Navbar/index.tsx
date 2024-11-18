"use client";

import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

interface NavLinkProps extends PropsWithChildren {
  href: string;
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href} as={NextLink} color={active ? "accent" : undefined}>
      {children}
    </Link>
  );
}

export function Navbar() {
  return (
    <header>
      <nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/account">Account</NavLink>
      </nav>
    </header>
  );
}
