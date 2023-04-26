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
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "authenticated") {
    router.push('/mainmenu')
  }
  const handleCreateAccount = () => {
    console.log("Create account");
  }
  
 

  const handleForgotPassword = () => {
    console.log("Forgot password");

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
          <Text size="sm" color="dimmed">
            Log in to your account
          </Text>
          <Button component={Link} href='/account/accountcreate' fullWidth mt="xl">CreateAccount</Button>

      
            <Button onClick={() => signIn()} fullWidth mt="xl">Log in</Button>
          </Group>

      </Paper>
    </Container>
  );
}