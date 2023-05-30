"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import {
  createClient,
  Provider,
  subscriptionExchange,
  cacheExchange,
  fetchExchange,
} from "urql";
import { createClient as createWSClient } from "graphql-ws";

const graphql_server_url = "http://localhost:3001/graphql";

const wsClient = createWSClient({
  url: graphql_server_url,
});

const client = createClient({
  url: graphql_server_url,
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || "" };
        return {
          subscribe(sink) {
            const unsubscribe = wsClient.subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    }),
  ],
});

export interface IProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: IProvidersProps) {
  return (
    <SessionProvider>
      <Provider value={client}>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </Provider>
    </SessionProvider>
  );
}
