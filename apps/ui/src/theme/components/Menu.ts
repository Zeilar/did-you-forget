import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  menuAnatomy.keys
);

const baseStyle = definePartsStyle({
  list: {
    bgColor: "gray.800",
    border: 0,
  },
  item: {
    bgColor: "gray.800",
    w: "fill-available",
    mx: 2,
    py: 2,
    rounded: "md",
    _hover: {
      bgColor: "gray.700",
    },
  },
});

export const Menu = defineMultiStyleConfig({ baseStyle });
