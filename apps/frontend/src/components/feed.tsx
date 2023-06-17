import { User } from '@prisma/client';
import { Box, VStack } from '@chakra-ui/layout';
import * as React from 'react';
import { useQuery } from 'urql';
import { Spinner } from '@chakra-ui/react';

export interface IFeedProps {
}
const usersQuery = `
query usersQuery($orderBy: OrderByParams!) {
  users(orderBy: $orderBy) {
    id
    email
  }
}
`;
type UserQueryRes = {
  users: User[];
};
export function Feed(props: IFeedProps) {
  const [{ data, fetching, error }] = useQuery<UserQueryRes>({
    query: usersQuery,
    variables: {
      orderBy: {
        field: 'createdAt',
        direction: 'desc',
      },
    },
  });
  if (error) return <p>Something went wrong...</p>;
  if (fetching || !data) return <Spinner />;
  console.log(data)
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
