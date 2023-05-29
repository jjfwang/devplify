"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import {
  createClient,
  Provider,
  subscriptionExchange,
  cacheExchange,
  fetchExchange,
} from "urql";
import { createClient as createWSClient } from "graphql-ws";

const wsClient = createWSClient({
  url: 'http://localhost:3001/graphql'//process.env.GRAPHQL_SERVER_URL as string,
});

const client = createClient({
  url: 'http://localhost:3001/graphql', //process.env.GRAPHQL_SERVER_URL as string,
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
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </Provider>
    </SessionProvider>
  );
}
