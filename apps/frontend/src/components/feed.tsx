import { User } from "@prisma/client";
import { Box, Alert, AlertTitle, Stack, CircularProgress } from "@mui/material";
import * as React from "react";
import { useQuery } from "urql";

export interface IFeedProps {}
const usersQuery = `
query usersQuery($orderBy: OrderByParams!) {
  users(orderBy: $orderBy) {
    id
    email
  }
}
`;

export function Feed(props: IFeedProps) {
  const [{ data, fetching, error }] = useQuery({
    query: usersQuery,
    variables: {
      orderBy: {
        field: "createdAt",
        direction: "desc",
      },
    },
  });
  if (error)
    return (
      <Alert severity="error" onClose={() => {}}>
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );
  if (fetching || !data) return <CircularProgress />;

  return (
    <Box width="100%">
      <Stack spacing={4}>
        {data?.users.map((user: User) => (
          <p key={user.id}>{user.email}</p>
        ))}
      </Stack>
    </Box>
  );
}
