"use client";
import { useSession } from "next-auth/react";
import * as React from "react";

export interface INavigationProps {}

export default function Navigation(props: INavigationProps) {
  const { data: session } = useSession();

  return <></>;
}
