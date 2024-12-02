"use client";

import { Button, Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Session } from "../Session";
import type { SessionForUserDto, SessionsForUserDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { AnimatePresence, motion } from "motion/react";
import { Trash2 } from "lucide-react";
import { useDeleteAllSessions } from "../../hooks";

interface NotificationsProps {
  initialData: SessionForUserDto[];
}

export function Sessions({ initialData }: NotificationsProps) {
  const deleteAllSessions = useDeleteAllSessions();
  const { data = [] } = useQuery<SessionForUserDto[]>(
    "sessions",
    async () => {
      const { data } = await clientFetch<SessionsForUserDto>("/session");
      return data?.sessions ?? [];
    },
    { initialData }
  );

  return (
    <>
      <Button onClick={() => deleteAllSessions.mutate()}>
        <Trash2 />
        <span>Delete all sessions</span>
      </Button>
      <Grid gridTemplateColumns={["repeat(1, 1fr)"]} gap={2} mt={2}>
        <AnimatePresence>
          {data.map((session) => (
            <motion.div key={session.id} exit={{ opacity: 0 }}>
              <Session {...session} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Grid>
    </>
  );
}
