"use client";

import { Button } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const { back } = useRouter();

  return (
    <Button variant="link" onClick={back} mt={4} leftIcon={<ArrowLeft size="1em" />}>
      Back
    </Button>
  );
}
