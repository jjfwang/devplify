"use client";

import { Feed } from "@/components/feed";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Box textAlign="center">
      <Grid>
        <Stack>
          <Typography variant="h4">Web development simplied</Typography>
          <Typography variant="subtitle2">
            We are making web development as easy as 1, 2, 3. So you can build
            your dream project sooner.
          </Typography>
          {session ? <Feed /> : null}
        </Stack>
      </Grid>
    </Box>
  );
}
