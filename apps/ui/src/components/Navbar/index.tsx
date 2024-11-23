"use client";

import { Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { BsHouseDoor, BsPerson } from "react-icons/bs";
import type { IconType } from "react-icons/lib";
import { Flex } from "@chakra-ui/react";

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
      color={active ? "cyan.600" : "gray.100"}
      display="flex"
      flexDir="column"
      alignItems="center"
      userSelect="none"
      fontWeight={500}
    >
      <Icon size="1.5em" />
      <span>{children}</span>
    </Link>
  );
}

export function Navbar() {
  return (
    <Flex
      as="nav"
      bgColor="gray.800"
      shadow="md"
      justifyContent="center"
      pt={3}
      pb={2}
      gap={8}
      mt="auto"
    >
      <NavLink href="/" icon={BsHouseDoor}>
        Home
      </NavLink>
      <NavLink href="/account" icon={BsPerson}>
        Account
      </NavLink>
    </Flex>
  );
}
