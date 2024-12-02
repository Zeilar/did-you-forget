import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  switchAnatomy.keys
);

const baseStyle = definePartsStyle({
  label: {
    fontWeight: 500,
    color: "text.secondary",
    cursor: "pointer",
  },
  track: {
    _checked: {
      bgColor: "text.primary",
    },
  },
});

export const Switch = defineMultiStyleConfig({ baseStyle });
