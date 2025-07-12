"use client";

import { Feed } from "@/components/feed";
import { Typography, Space, Card } from "antd";
import { useSession } from "next-auth/react";

const { Title, Paragraph } = Typography;

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ textAlign: "center", padding: "24px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card>
          <Title level={2}>Web development simplified</Title>
          <Paragraph>
            We are making web development as easy as 1, 2, 3. So you can build
            your dream project sooner.
          </Paragraph>
        </Card>
        {session ? <Feed /> : null}
      </Space>
    </div>
  );
}
