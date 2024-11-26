import { Input as ChakraInput, type InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, ChakraInputProps>(
  ({ _focusVisible, ...props }, ref) => {
    return (
      <ChakraInput
        ref={ref}
        outlineOffset={0}
        transitionProperty="all"
        _hover={{
          borderColor: "gray.600",
        }}
        _focusVisible={{
          shadow: "none !important",
          borderColor: "primary.600 !important",
          outlineOffset: 0,
          outline: "2px solid",
          outlineColor: "primary.600 !important", // Must come after the `outline` property.
          ..._focusVisible,
        }}
        {...props}
      />
    );
  }
);
