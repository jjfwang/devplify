"use client";

import { List, useTable } from "@refinedev/antd";
import { Table, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function PostsList() {
  const { tableProps } = useTable({
    resource: "posts",
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="published" title="Published" 
          render={(published) => published ? "Yes" : "No"} />
        <Table.Column dataIndex="authorId" title="Author ID" />
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
