"use client";

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";

export interface IAboutProps {}

export function About(props: IAboutProps) {
  return (
    <Box textAlign="center" fontSize="sm">
      <Stack spacing={8}>
        <Typography variant="subtitle2">This is the about page.</Typography>
      </Stack>
    </Box>
  );
}
