"use client";

import { chakra } from "@chakra-ui/react";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { AbsoluteCenter, Span, Spinner } from "@chakra-ui/react";
import { forwardRef, type ReactNode } from "react";

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: ReactNode;
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

const ChakraButton = chakra("button", {
  base: { display: "flex" },
  variants: {
    visual: {
      solid: {
        bg: "gray.800",
        color: "white",
        rounded: "md",
      },
      outline: {
        bg: "transparent",
        color: "white",
        rounded: "md",
        border: "1px solid",
        borderColor: "border",
      },
    },
    size: {
      "2xs": { px: 4, py: 2, fontSize: "0.75rem" },
      xs: { px: 4, py: 2, fontSize: "0.8rem" },
      sm: { px: 4, py: 2, fontSize: "0.85rem" },
      md: { px: 4, py: 2, fontSize: "1rem" },
      lg: { px: 6, py: 3, fontSize: "1.15rem" },
      xl: { px: 6, py: 3, fontSize: "1.25rem" },
      "2xl": { px: 8, py: 4, fontSize: "1.35rem" },
    },
  },
  defaultVariants: {
    visual: "solid",
    size: "sm",
  },
});

export const Button = forwardRef<HTMLButtonElement, ChakraButtonProps & ButtonLoadingProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props;
    return (
      <ChakraButton
        disabled={loading || disabled}
        ref={ref}
        pos="relative"
        cursor={loading || disabled ? "not-allowed" : "pointer"}
        {...rest}
      >
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    );
  }
);
