"use client";

import * as React from "react";
import { Layout, Menu, Avatar, Button, Dropdown, Space, Badge } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  MailOutlined,
  BellOutlined,
  LogoutOutlined,
  ProfileOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Header } = Layout;

export interface INavigationProps {}

export default function Navigation(props: INavigationProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const userMenuItems = [
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: "Profile",
    },
    {
      key: "account",
      icon: <UserOutlined />,
      label: "Account",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Sign out",
      onClick: () => signOut(),
    },
  ];

  const navigationItems = [
    {
      key: "users",
      label: "Users",
      icon: <TeamOutlined />,
    },
    {
      key: "posts",
      label: "Posts",
      icon: <FileTextOutlined />,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "home") {
      router.push("/");
    } else {
      router.push(`/${key}`);
    }
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#001529",
        padding: "0 24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", color: "white" }}>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginRight: "24px",
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          Devplify
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={navigationItems}
          style={{ minWidth: 0, flex: "auto" }}
          onClick={handleMenuClick}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {session ? (
          <Space size="large">
            <Badge count={4}>
              <MailOutlined style={{ fontSize: "20px", color: "white" }} />
            </Badge>
            <Badge count={17}>
              <BellOutlined style={{ fontSize: "20px", color: "white" }} />
            </Badge>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Avatar
                src={session.user?.image}
                icon={<UserOutlined />}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </Space>
        ) : (
          <Button type="primary" onClick={() => signIn()}>
            Sign in
          </Button>
        )}
      </div>
    </Header>
  );
}
