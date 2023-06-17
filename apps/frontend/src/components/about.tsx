"use client";

import * as React from 'react';
import { Box, Text, Grid, Heading, VStack } from "@chakra-ui/react";

export interface IAboutProps {
}

export function About (props: IAboutProps) {
  return (
    <Box textAlign="center" fontSize="sm">
      <Grid p={3}>
        <VStack spacing={8}>
          <Text>
            This is the about page.
          </Text>
        </VStack>
      </Grid>
    </Box>
  );
}
