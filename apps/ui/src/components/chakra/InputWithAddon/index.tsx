import { Box, type InputProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Input } from "../Input";

interface InputWithAddonProps extends InputProps {
  addon: ReactNode;
  position?: "start" | "end";
}

export function InputWithAddon({ addon, position = "start", ...props }: InputWithAddonProps) {
  return (
    <Box pos="relative">
      <Box
        pos="absolute"
        translate="0 -50%"
        top="50%"
        left={position === "start" ? 4 : undefined}
        right={position === "end" ? 4 : undefined}
      >
        {addon}
      </Box>
      <Input
        pr={position === "end" ? 11 : undefined}
        pl={position === "start" ? 11 : undefined}
        {...props}
      />
    </Box>
  );
}
