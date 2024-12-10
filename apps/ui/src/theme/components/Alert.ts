import { alertAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  alertAnatomy.keys
);

const baseStyle = definePartsStyle({
  container: {
    rounded: "md",
  },
});

export const Alert = defineMultiStyleConfig({ baseStyle });
