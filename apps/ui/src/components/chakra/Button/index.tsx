"use client";

import { Button as ChakraButton, type ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { AbsoluteCenter, Span, Spinner } from "@chakra-ui/react";
import { forwardRef, type ReactNode } from "react";

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ChakraButtonProps & ButtonLoadingProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props;
    return (
      <ChakraButton
        disabled={loading || disabled}
        ref={ref}
        pos="relative"
        alignItems="center"
        gap={2}
        cursor={loading || disabled ? "not-allowed" : "pointer"}
        {...rest}
        variant="outline"
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
