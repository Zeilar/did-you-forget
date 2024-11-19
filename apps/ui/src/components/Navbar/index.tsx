"use client";

import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { BsHouseDoor, BsHouseDoorFill, BsPerson, BsPersonFill } from "react-icons/bs";
import type { IconType } from "react-icons/lib";

interface NavLinkProps extends PropsWithChildren {
  href: string;
  icon: IconType;
  activeIcon: IconType;
}

function NavLink({ children, href, icon: Icon, activeIcon: ActiveIcon }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;
  const IconComponent = active ? ActiveIcon : Icon;

  return (
    <Link
      href={href}
      as={NextLink}
      color={active ? "accent.600" : undefined}
      display="flex"
      flexDir="column"
      justifyContent="flex-end"
      outline={0}
      textDecor="none"
      userSelect="none"
    >
      <IconComponent size="1.5em" />
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
        <NavLink href="/" icon={BsHouseDoor} activeIcon={BsHouseDoorFill}>
          Home
        </NavLink>
        <NavLink href="/account" icon={BsPerson} activeIcon={BsPersonFill}>
          Account
        </NavLink>
      </Flex>
    </header>
  );
}
