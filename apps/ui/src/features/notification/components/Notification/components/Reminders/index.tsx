"use client";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  Text,
  type FlexProps,
} from "@chakra-ui/react";
import { NotificationDto } from "@did-you-forget/dto";
import { Accordion } from "@ui/components";
import { useEditNotification } from "@ui/features/notification/hooks";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { formatDuration } from "./common";

const flexProps: FlexProps = { bgColor: "gray.800", shadow: "none" };

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

export function Reminders({ id, reminders }: Pick<NotificationDto, "id" | "reminders">) {
  const { setValue, control, formState, reset, handleSubmit } = useForm<{ reminders: string[] }>({
    defaultValues: { reminders },
  });
  const { mutate, isLoading } = useEditNotification(id);

  useEffect(() => {
    setValue("reminders", reminders);
  }, [reminders, setValue]);

  return (
    <>
      <Accordion title={<Text color="text.secondary">Reminders</Text>} flexProps={flexProps}>
        <Controller
          control={control}
          name="reminders"
          render={({ field }) => (
            <FormControl>
              <Grid gap={2} gridTemplateColumns={["repeat(2, 1fr)"]}>
                {OPTIONS.map((option) => {
                  const { value = [], onChange } = field;
                  const isSelected = value.includes(option);

                  return (
                    <Button
                      key={option}
                      variant={isSelected ? "outline-primary" : "outline"}
                      onClick={() =>
                        onChange(
                          !isSelected
                            ? [...value, option]
                            : value.filter((element) => element !== option)
                        )
                      }
                    >
                      {formatDuration(parseInt(option))}
                    </Button>
                  );
                })}
              </Grid>
              {formState.errors.reminders && (
                <FormErrorMessage>{formState.errors.reminders.message}</FormErrorMessage>
              )}
            </FormControl>
          )}
        />
        <Flex gap={2} mt={4}>
          <Button isLoading={isLoading} onClick={handleSubmit((fields) => mutate(fields))}>
            Save
          </Button>
          <Button variant="outline" onClick={() => reset()}>
            Reset
          </Button>
        </Flex>
      </Accordion>
    </>
  );
}
