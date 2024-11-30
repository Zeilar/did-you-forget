"use client";

import { forwardRef, Input as ChakraInput, type InputProps } from "@chakra-ui/react";

export const inputProps: InputProps = {
  outlineOffset: 0,
  transitionProperty: "all",
  _hover: {
    borderColor: "gray.600",
  },
  _focusVisible: {
    shadow: "none !important",
    borderColor: "primary.600 !important",
    outlineOffset: 0,
    outline: "2px solid",
    outlineColor: "primary.600 !important", // Must come after the `outline` property.
  },
};

export const Input = forwardRef<InputProps, "input">(({ _focusVisible, ...props }, ref) => (
  <ChakraInput
    ref={ref}
    {...inputProps}
    _focusVisible={{
      ...inputProps._focusVisible,
      ..._focusVisible,
    }}
    {...props}
  />
));
