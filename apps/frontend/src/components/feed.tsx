import { User } from "@prisma/client";
import { Box, VStack } from "@chakra-ui/layout";
import * as React from "react";
import { useQuery } from "urql";
import { Spinner, useToast } from "@chakra-ui/react";

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
  const toast = useToast();
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
    toast({
      title: "Error",
      status: "error",
      position: "bottom",
      description: error.message,
      isClosable: true,
    });
  if (fetching || !data) return <Spinner />;

  return (
    <Box w="100%">
      <VStack spacing={4}>
        {data?.users.map((user: User) => (
          <p key={user.id}>{user.email}</p>
        ))}
      </VStack>
    </Box>
  );
}
