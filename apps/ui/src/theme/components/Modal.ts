import { modalAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  modalAnatomy.keys
);

const baseStyle = definePartsStyle({
  dialog: {
    bgColor: "bg.paper",
  },
});

export const Modal = defineMultiStyleConfig({ baseStyle });
