"use client";

import { List, useTable } from "@refinedev/antd";
import { Table, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function UsersList() {
  const { tableProps } = useTable({
    resource: "users",
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="role" title="Role" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EyeOutlined style={{ color: "#1890ff", cursor: "pointer" }} />
              <EditOutlined style={{ color: "#52c41a", cursor: "pointer" }} />
              <DeleteOutlined style={{ color: "#ff4d4f", cursor: "pointer" }} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
