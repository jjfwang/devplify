'use client';

import { Feed } from "@/components/feed";
import { Box, Text, Grid, Heading, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Heading>Web development simplied</Heading>
          <Text>
            We are making web development as easy as 1, 2, 3. So you can build
            your dream project sooner.
          </Text>
          <Feed />
        </VStack>
      </Grid>
    </Box>
  );
}
