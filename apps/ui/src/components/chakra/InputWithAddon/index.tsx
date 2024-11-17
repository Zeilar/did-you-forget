import { Box, type InputProps } from "@chakra-ui/react";
import type { PropsWithChildren, ReactNode } from "react";
import { Input } from "../Input";

interface InputWithAddonProps extends InputProps {
  start?: ReactNode;
  end?: ReactNode;
}

interface AddonProps extends PropsWithChildren {
  position: "start" | "end";
}

function Addon({ position, children }: AddonProps) {
  return (
    <Box
      pos="absolute"
      translate="0 -50%"
      top="50%"
      left={position === "start" ? 4 : undefined}
      right={position === "end" ? 4 : undefined}
    >
      {children}
    </Box>
  );
}

export function InputWithAddon({ start, end, ...props }: InputWithAddonProps) {
  return (
    <Box pos="relative">
      {start && <Addon position="start">{start}</Addon>}
      {end && <Addon position="end">{end}</Addon>}
      <Input pl={start ? 11 : undefined} pr={end ? 11 : undefined} {...props} />
    </Box>
  );
}
