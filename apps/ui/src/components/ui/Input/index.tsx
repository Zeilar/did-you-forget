import { Input as ChakraInput, type InputProps } from "@chakra-ui/react";

export function Input({ _focusVisible, ...props }: InputProps) {
  return (
    <ChakraInput
      outlineOffset={0}
      transitionProperty="all"
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
