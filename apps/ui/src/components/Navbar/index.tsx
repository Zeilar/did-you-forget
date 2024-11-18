"use client";

import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { BsHouseDoor, BsPerson } from "react-icons/bs";
import type { IconType } from "react-icons/lib";

interface NavLinkProps extends PropsWithChildren {
  href: string;
  icon: IconType;
}

function NavLink({ children, href, icon: Icon }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      as={NextLink}
      color={active ? "accent" : undefined}
      display="flex"
      flexDir="column"
      justifyContent="flex-end"
      outline={0}
    >
      <Icon size="1.5em" />
      <span>{children}</span>
    </Link>
  );
}

export function Navbar() {
  return (
    <header>
      <Flex
        as="nav"
        justify="center"
        gap={8}
        bgColor="gray.900"
        p={2}
        border="1px solid"
        borderColor="border"
      >
        <NavLink href="/" icon={BsHouseDoor}>
          Home
        </NavLink>
        <NavLink href="/account" icon={BsPerson}>
          Account
        </NavLink>
      </Flex>
    </header>
  );
}
