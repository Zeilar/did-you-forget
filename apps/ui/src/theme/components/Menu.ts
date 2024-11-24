import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  menuAnatomy.keys
);

const baseStyle = definePartsStyle({
  list: {
    bgColor: "bg.paper",
    border: 0,
  },
  item: {
    bgColor: "bg.paper",
    w: "fill-available",
    mx: 2,
    py: 2,
    rounded: "md",
    _hover: {
      bgColor: "gray.800",
    },
  },
});

export const Menu = defineMultiStyleConfig({ baseStyle });
