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

  const handleSkip = () => {
    console.log("Skip login");
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