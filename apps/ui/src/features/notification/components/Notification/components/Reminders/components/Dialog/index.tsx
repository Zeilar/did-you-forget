"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  PinInput,
  PinInputField,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { Input } from "@ui/components";
import { Controller, type FieldError, type Control } from "react-hook-form";
import type { BaseSyntheticEvent } from "react";

interface DialogProps {
  disclosure: UseDisclosureReturn;
  isLoading: boolean;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  control: Control<DialogFields>;
  error: FieldError | undefined;
}

export interface DialogFields {
  reminder: string;
}

export function Dialog({ disclosure, isLoading, onSubmit, control, error }: DialogProps) {
  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay />
      <ModalContent w="fit-content" as="form" onSubmit={onSubmit}>
        <ModalBody>
          <Controller
            control={control}
            name="reminder"
            render={({ field }) => (
              <FormControl>
                <Flex pt={4} gap={2}>
                  <PinInput size="lg" placeholder="0" value={field.value} onChange={field.onChange}>
                    <PinInputField order={1} as={Input} aria-label="Hours" placeholder="M" />
                    <PinInputField order={2} as={Input} aria-label="Hours" placeholder="M" />
                    <PinInputField order={4} as={Input} aria-label="Minutes" placeholder="M" />
                    <PinInputField order={5} as={Input} aria-label="Minutes" placeholder="M" />
                    <Box sx={{ all: "unset", order: 3 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="48"
                        viewBox="0 0 16 48"
                      >
                        <Box as="circle" cx="8" cy="16" r="2" fill="border" />
                        <Box as="circle" cx="8" cy="32" r="2" fill="border" />
                      </svg>
                    </Box>
                  </PinInput>
                </Flex>
                {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
              </FormControl>
            )}
          />
        </ModalBody>
        <ModalFooter gap={2}>
          <Button isLoading={isLoading} type="submit">
            Save
          </Button>
          <Button variant="ghost" onClick={disclosure.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
