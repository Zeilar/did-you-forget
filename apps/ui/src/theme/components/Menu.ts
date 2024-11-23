import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  menuAnatomy.keys
);

// define the base component styles
const baseStyle = definePartsStyle({
  list: {
    bgColor: "bg.paper",
    border: 0,
  },
  item: {
    bgColor: "bg.paper",
    w: "fill-available",
    mx: 2,
    rounded: "md",
    _hover: {
      bgColor: "gray.700",
    },
  },
});

export const Menu = defineMultiStyleConfig({ baseStyle });
