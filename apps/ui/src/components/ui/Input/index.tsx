import { Input as ChakraInput, type InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

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
          borderColor: "cyan.600",
          outline: "2px solid",
          outlineColor: "cyan.600",
          ..._focusVisible,
        }}
        {...props}
      />
    );
  }
);
