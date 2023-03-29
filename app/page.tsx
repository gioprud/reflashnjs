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
import { getSession, signIn } from "next-auth/react"

export default function LoginPage() {
  const handleCreateAccount = () => {
    console.log("Create account");
  }

  const handleForgotPassword = () => {
    console.log("Forgot password");

  }

  const handleSignIn = async () => {
    console.log("Sign in");

    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    const username = usernameInput.value;
    const password = passwordInput.value;

    console.log("username: " + username);
    console.log("password: " + password);
    const res = await signIn('Credentials', { username, password })
    /*
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const loginRes: { user: false|User } = await res.json();
    */
    if (!res) {
      console.log("login failed");
      return;
    }
    console.log("loginRes: " + res);




  }
  getSession().then(res => {
    console.log('session', res)
  })

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Reflash!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        <Link href={"/account/accountcreate"} onClick={handleCreateAccount}>
          CreateAccount
        </Link>

      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form id='document'>
          <TextInput id="username" label="username" placeholder="username" required />
          <PasswordInput id="password" label="password" placeholder="password" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Link href={"/account/accountforgot"} onClick={handleForgotPassword}>
              forgot password?
            </Link>
            <Link href={"/"} onClick={handleSignIn}>
              <Button>
                skip login test
              </Button>
            </Link>

            <Button onClick={() => signIn()} fullWidth mt="xl">Log in</Button>
          </Group>
        </form>

      </Paper>
    </Container>
  );
}