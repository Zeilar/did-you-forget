import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";
import { CloseButton } from "../CloseButton";
import { forwardRef, type RefObject } from "react";

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean;
  portalRef?: RefObject<HTMLElement>;
  backdrop?: boolean;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  props,
  ref
) {
  // portalled should remain false since it gets put outside of the theme element
  const { children, portalled = false, portalRef, backdrop = true, ...rest } = props;

  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && <ChakraDialog.Backdrop />}
      <ChakraDialog.Positioner>
        <ChakraDialog.Content ref={ref} marginInline={4} {...rest}>
          {children}
        </ChakraDialog.Content>
      </ChakraDialog.Positioner>
    </Portal>
  );
});

export const DialogCloseTrigger = forwardRef<HTMLButtonElement, ChakraDialog.CloseTriggerProps>(
  function DialogCloseTrigger(props, ref) {
    const { children, ...rest } = props;

    return (
      <ChakraDialog.CloseTrigger position="absolute" top="2" insetEnd="2" {...rest} asChild>
        <CloseButton size="sm" ref={ref}>
          {children}
        </CloseButton>
      </ChakraDialog.CloseTrigger>
    );
  }
);

export function DialogRoot({ children, ...props }: ChakraDialog.RootProps) {
  return <ChakraDialog.Root {...props}>{children}</ChakraDialog.Root>;
}

export function DialogActionTrigger({ children, ...props }: ChakraDialog.ActionTriggerProps) {
  return <ChakraDialog.ActionTrigger {...props}>{children}</ChakraDialog.ActionTrigger>;
}

export function DialogFooter({ children, ...props }: ChakraDialog.FooterProps) {
  return (
    <ChakraDialog.Footer p={4} pt={0} {...props}>
      {children}
    </ChakraDialog.Footer>
  );
}

export function DialogHeader({ children, ...props }: ChakraDialog.HeaderProps) {
  return (
    <ChakraDialog.Header p={4} {...props}>
      {children}
    </ChakraDialog.Header>
  );
}

export function DialogBody({ children, ...props }: ChakraDialog.BodyProps) {
  return (
    <ChakraDialog.Body p={4} pt={0} {...props}>
      {children}
    </ChakraDialog.Body>
  );
}

export const DialogBackdrop = ChakraDialog.Backdrop;
export const DialogTitle = ChakraDialog.Title;
export const DialogDescription = ChakraDialog.Description;
export const DialogTrigger = ChakraDialog.Trigger;
