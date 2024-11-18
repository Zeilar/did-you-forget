import { Heading, type HeadingProps } from "@chakra-ui/react";

export function Title(props: HeadingProps) {
  return <Heading color="accent.600" as="h2" size="3xl" mb={2} {...props} />;
}
