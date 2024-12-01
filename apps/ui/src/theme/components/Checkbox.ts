import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  checkboxAnatomy.keys
);

const baseStyle = definePartsStyle({
  control: {
    p: 2,
    _checked: {
      bgColor: "primary.600",
      borderColor: "primary.600",
      color: "text.default",
    },
  },
});

export const Checkbox = defineMultiStyleConfig({ baseStyle });
