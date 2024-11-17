"use client";

import { chakra } from "@chakra-ui/react";

export const Input = chakra("input", {
  variants: {
    visual: {
      outline: {
        w: "100%",
        bg: "body.bg",
        rounded: "md",
        border: "1px solid",
        borderColor: "border",
        outlineColor: "accent",
        _focus: {
          outline: "2px solid",
          outlineColor: "accent",
        },
      },
    },
    size: {
      "2xs": { px: 2, py: 2, fontSize: "0.75rem" },
      xs: { px: 3, py: 2, fontSize: "0.8rem" },
      sm: { px: 4, py: 2, fontSize: "0.85rem" },
      md: { px: 4, py: 3, fontSize: "1rem" },
      lg: { px: 6, py: 4, fontSize: "1.15rem" },
      xl: { px: 6, py: 4, fontSize: "1.15rem" },
      "2xl": { px: 6, py: 4, fontSize: "1.15rem" },
    },
  },
  defaultVariants: {
    visual: "outline",
    size: "sm",
  },
});
