"use client";

import { Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { BsHouseDoorFill, BsPersonFill } from "react-icons/bs";
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
      color={active ? "primary.text" : "gray.100"}
      display="flex"
      flexDir="column"
      alignItems="center"
      userSelect="none"
      fontWeight={500}
      _hover={{ textDecor: "none", color: !active && "primary.600" }}
    >
      <Icon size="1.25em" />
      <span>{children}</span>
    </Link>
  );
}

export function Navbar() {
  return (
    <Flex
      as="nav"
      bgColor="bg.paper"
      shadow="md"
      justifyContent="center"
      pt={3}
      pb={2}
      gap={8}
      mt="auto"
    >
      <NavLink href="/" icon={BsHouseDoorFill}>
        Home
      </NavLink>
      <NavLink href="/account" icon={BsPersonFill}>
        Account
      </NavLink>
    </Flex>
  );
}
