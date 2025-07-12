"use client";

import * as React from "react";
import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

export interface IAboutProps {}

export function About(props: IAboutProps) {
  return (
    <Footer style={{ textAlign: "center", marginTop: "48px" }}>
      <Text type="secondary">This is the about page.</Text>
    </Footer>
  );
}
