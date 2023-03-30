"use client";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import Link from 'next/link';
//import { useForm } from 'react-hook-form';
import type { User } from '@/services/database';
import { getSession, signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "authenticated") {
    router.push('/mainmenu')
    return <p>logged in</p>
  }
  const handleCreateAccount = () => {
    console.log("Create account");
  }
  
 

  const handleForgotPassword = () => {
    console.log("Forgot password");

  }

  const handleSkip = () => {
    console.log("Skip login");
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Reflash!
      </Title>
      
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Group position="center">
            <Link href={"/mainmenu"} onClick={handleSkip}>
              <Button fullWidth mt="xl">
                skip login test
              </Button>
            </Link>

        <Link href={"/account/accountcreate"} onClick={handleCreateAccount}>
          <Button fullWidth mt="xl">CreateAccount</Button>
        </Link>

      
            <Button onClick={() => signIn()} fullWidth mt="xl">Log in</Button>
          </Group>

      </Paper>
    </Container>
  );
}