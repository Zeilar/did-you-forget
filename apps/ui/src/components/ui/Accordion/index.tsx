"use client";

import { Box, Flex, type FlexProps, Text, useDisclosure } from "@chakra-ui/react";
import { Paper } from "../Paper";
import { LuChevronDown } from "react-icons/lu";
import { motion } from "motion/react";
import type { PropsWithChildren, ReactNode } from "react";

interface AccordionProps extends PropsWithChildren {
  title: ReactNode;
  flexProps?: FlexProps;
  disabled?: boolean;
}

export function Accordion({ title, children, disabled, flexProps }: AccordionProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Paper gap={0} p={0} opacity={!disabled ? 1 : 0.5} {...flexProps}>
      <Flex
        p={4}
        role="button"
        cursor={!disabled ? "pointer" : "not-allowed"}
        onClick={!disabled ? onToggle : undefined}
        justify="space-between"
        align="center"
        userSelect="none"
      >
        <Text fontWeight={500}>{title}</Text>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <LuChevronDown />
        </motion.span>
      </Flex>
      <Box
        as={motion.div}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        overflow="hidden"
      >
        <Box p={4} pt={2}>
          {children}
        </Box>
      </Box>
    </Paper>
  );
}