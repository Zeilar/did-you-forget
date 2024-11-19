import { Accordion, HStack } from "@chakra-ui/react";
import { forwardRef } from "react";
import { LuChevronDown } from "react-icons/lu";

interface AccordionItemTriggerProps extends Accordion.ItemTriggerProps {
  indicatorPlacement?: "start" | "end";
}

export const AccordionItemTrigger = forwardRef<HTMLButtonElement, AccordionItemTriggerProps>(
  function AccordionItemTrigger(props, ref) {
    const { children, indicatorPlacement = "end", ...rest } = props;
    return (
      <Accordion.ItemTrigger {...rest} ref={ref}>
        {indicatorPlacement === "start" && (
          <Accordion.ItemIndicator rotate={{ base: "-90deg", _open: "0deg" }}>
            <LuChevronDown />
          </Accordion.ItemIndicator>
        )}
        <HStack gap="4" flex="1" textAlign="start" width="full">
          {children}
        </HStack>
        {indicatorPlacement === "end" && (
          <Accordion.ItemIndicator>
            <LuChevronDown />
          </Accordion.ItemIndicator>
        )}
      </Accordion.ItemTrigger>
    );
  }
);

export const AccordionItemContent = forwardRef<HTMLDivElement, Accordion.ItemContentProps>(
  function AccordionItemContent(props, ref) {
    return (
      <Accordion.ItemContent>
        <Accordion.ItemBody {...props} ref={ref} />
      </Accordion.ItemContent>
    );
  }
);

export const AccordionRoot = forwardRef<HTMLDivElement, Accordion.RootProps>(function AccordionRoot(
  props,
  ref
) {
  return (
    <Accordion.Root
      collapsible
      variant="plain"
      rounded="lg"
      border="1px solid"
      borderColor="border"
      bgColor="gray.900"
      px={3}
      ref={ref}
      {...props}
    />
  );
});
export const AccordionItem = Accordion.Item;
