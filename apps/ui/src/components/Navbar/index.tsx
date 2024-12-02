"use client";

import { Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";
import type { ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from "react";
import { House, type LucideProps, User2 } from "lucide-react";
import { Flex } from "@chakra-ui/react";

interface NavLinkProps extends PropsWithChildren {
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

function NavLink({ children, href, icon: Icon }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      color={active ? "text.primary" : "gray.100"}
      display="flex"
      flexDir="column"
      alignItems="center"
      userSelect="none"
      fontWeight={500}
      letterSpacing={0.5}
      gap={1}
      _hover={{ textDecor: "none", color: !active && "text.primary" }}
      _active={{ color: !active && "primary.500" }}
    >
      <Icon />
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
      pos="sticky"
      bottom={0}
    >
      <NavLink href="/home" icon={House}>
        Home
      </NavLink>
      <NavLink href="/account" icon={User2}>
        Account
      </NavLink>
    </Flex>
  );
}
