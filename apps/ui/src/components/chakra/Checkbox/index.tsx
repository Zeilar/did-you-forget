import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import { type ReactNode, type Ref, type InputHTMLAttributes, forwardRef } from "react";

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  icon?: ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  rootRef?: Ref<HTMLLabelElement>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const { icon, children, inputProps, rootRef, colorPalette, ...rest } = props;
  return (
    <ChakraCheckbox.Root ref={rootRef} colorPalette="cyan" {...rest}>
      <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
      <ChakraCheckbox.Control>
        {icon || <ChakraCheckbox.Indicator color="gray.950" />}
      </ChakraCheckbox.Control>
      {children != null && <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>}
    </ChakraCheckbox.Root>
  );
});
