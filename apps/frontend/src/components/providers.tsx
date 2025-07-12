"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Refine } from "@refinedev/core";
import { RefineThemes, notificationProvider } from "@refinedev/antd";
import { ConfigProvider } from "antd";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";

export interface IProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: IProvidersProps) {
  return (
    <SessionProvider>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider("http://localhost:3001")}
          notificationProvider={notificationProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "users",
              list: "/users",
              create: "/users/create",
              edit: "/users/edit/:id",
              show: "/users/show/:id",
            },
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              show: "/posts/show/:id",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          {children}
        </Refine>
      </ConfigProvider>
    </SessionProvider>
  );
}
