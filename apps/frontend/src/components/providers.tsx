"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  const theme = createTheme();
  return (
    <SessionProvider>
      <Provider value={client}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
