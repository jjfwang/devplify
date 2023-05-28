'use client';

import { Button } from "@chakra-ui/react";
import {useSession, signIn, signOut} from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Button colorScheme='blue' variant='outline' onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button colorScheme='blue' onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
