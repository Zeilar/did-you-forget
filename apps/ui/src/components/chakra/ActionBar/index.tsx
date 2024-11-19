import { ActionBar, Portal } from "@chakra-ui/react";
import { CloseButton } from "../CloseButton";
import { forwardRef, type RefObject } from "react";

interface ActionBarContentProps extends ActionBar.ContentProps {
  portalled?: boolean;
  portalRef?: RefObject<HTMLElement>;
}

export const ActionBarContent = forwardRef<HTMLDivElement, ActionBarContentProps>(
  function ActionBarContent(props, ref) {
    const { children, portalled = false, portalRef, ...rest } = props;

    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ActionBar.Positioner>
          <ActionBar.Content ref={ref} {...rest} asChild={false}>
            {children}
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    );
  }
);

export const ActionBarCloseTrigger = forwardRef<HTMLButtonElement, ActionBar.CloseTriggerProps>(
  function ActionBarCloseTrigger(props, ref) {
    return (
      <ActionBar.CloseTrigger {...props} asChild ref={ref}>
        <CloseButton size="sm" />
      </ActionBar.CloseTrigger>
    );
  }
);

export const ActionBarRoot = ActionBar.Root;
export const ActionBarSelectionTrigger = ActionBar.SelectionTrigger;
export const ActionBarSeparator = ActionBar.Separator;
