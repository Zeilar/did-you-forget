import {
  useToast as useChakraToast,
  type CreateToastFnReturn,
  type UseToastOptions,
} from "@chakra-ui/react";

export function useToast(options?: UseToastOptions): CreateToastFnReturn {
  return useChakraToast(options);
}
