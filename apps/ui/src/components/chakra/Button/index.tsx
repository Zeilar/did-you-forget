"use client";

import { chakra } from "@chakra-ui/react";

export const Button = chakra("button", {
  base: { display: "flex" },
  variants: {
    visual: {
      solid: {
        bg: "gray.800",
        color: "white",
        rounded: "md",
      },
    },
    size: {
      sm: { px: 4, py: 2, fontSize: "0.85rem" },
      md: { px: 4, py: 2, fontSize: "1rem" },
      lg: { px: 6, py: 3, fontSize: "1.15rem" },
    },
  },
  defaultVariants: {
    visual: "solid",
    size: "sm",
  },
});
