import { Card, Alert, List, Spin, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import * as React from "react";

const { Text } = Typography;

export interface IFeedProps {}

export function Feed(props: IFeedProps) {
  const [users, setUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `query { users { id email name } }`,
          }),
        });
        
        const result = await response.json();
        if (result.errors) {
          setError(result.errors[0].message);
        } else {
          setUsers(result.data.users || []);
        }
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <Card>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "24px" }}>
          <Spin size="large" />
          <div>Loading users...</div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Users" style={{ marginTop: 16 }}>
      {users && users.length > 0 ? (
        <List
          dataSource={users}
          renderItem={(user: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={<UserOutlined />}
                title={user.name || "Unknown User"}
                description={<Text type="secondary">{user.email}</Text>}
              />
            </List.Item>
          )}
        />
      ) : (
        <div style={{ textAlign: "center", padding: "24px" }}>
          <Text type="secondary">No users found</Text>
        </div>
      )}
    </Card>
  );
}
