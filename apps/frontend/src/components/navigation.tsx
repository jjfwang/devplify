"use client";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  ButtonGroup,
  Divider,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export interface INavigationProps {}

export default function Navigation(props: INavigationProps) {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2" p={5}>
        <Box>
          <Heading size="xl" p={5}>Devplify</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="4" p={5}>
          {session ? (
            <>
              Signed in as {session.user?.email} <br />
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button colorScheme="blue" onClick={() => signIn()}>
              Sign in
            </Button>
          )}
        </ButtonGroup>
      </Flex>
      <Divider />
    </>
  );
}
