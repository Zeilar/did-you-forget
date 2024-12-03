"use client";

import {
  Button,
  FormControl,
  FormErrorMessage,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { Controller, type FieldError, type Control } from "react-hook-form";
import type { BaseSyntheticEvent } from "react";
import { formatDuration } from "../../common";

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

const OPTIONS: string[] = [
  `${60 * 5}`, // 5 minutes.
  `${60 * 10}`, // 10 minutes.
  `${60 * 15}`, // 15 minutes.
  `${60 * 60}`, // 1 hour.
  `${60 * 60 * 2}`, // 2 hours.
  `${60 * 60 * 12}`, // 12 hours.
  `${60 * 60 * 24}`, // 24 hours.
  `${60 * 60 * 48}`, // 48 hours.
];

export function Dialog({ disclosure, isLoading, onSubmit, control, error }: DialogProps) {
  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={onSubmit} mx={4}>
        <ModalBody>
          <Controller
            control={control}
            name="reminder"
            render={({ field }) => (
              <FormControl>
                <Grid pt={4} gap={4} gridTemplateColumns={["repeat(2, 1fr)"]}>
                  {OPTIONS.map((option) => (
                    <Button
                      key={option}
                      variant={field.value === option ? "outline-primary" : "outline"}
                      onClick={() => field.onChange(option)}
                    >
                      {formatDuration(parseInt(option))}
                    </Button>
                  ))}
                </Grid>
                {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
              </FormControl>
            )}
          />
        </ModalBody>
        <ModalFooter gap={2}>
          <Button isLoading={isLoading} type="submit">
            Save
          </Button>
          <Button variant="outline" onClick={disclosure.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
