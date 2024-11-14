"use client";

import { Box, Button, Input } from "@chakra-ui/react";
import { clientFetch } from "../../../common/fetchers/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function Login() {
  const { push } = useRouter();
  const { handleSubmit, register } = useForm();

  return (
    <Box>
      <form
        onSubmit={handleSubmit(async (fields) => {
          console.log(fields);
          const { status } = await clientFetch("/auth/sign-in", "POST", fields);
          if (status === 204) {
            console.log("logged in!");
            push("/");
          }
          return null;
        })}
      >
        <Input {...register("email")} type="email" placeholder="Email" />
        <Input {...register("password")} type="password" placeholder="Password" />
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}