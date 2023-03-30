"use client"

import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from '@mantine/core';
import Link from 'next/link';

const resetPassword = () => {

  const emailInput = document.getElementById("email") as HTMLInputElement;

  const email = emailInput.value;
  
  console.log("email: " + email);
  console.log("Reset password");
  

}

export default function ForgotPassword() {

  return (
    <Container size={460} my={30}>
      <Title align="center">
        Forgot your password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form>
          <TextInput label="Your email" placeholder="email@example.com" required type={"email"} />

          <Group position="apart" mt="lg">
            <Anchor color="dimmed" size="sm">
              <Center inline>
                <Link href={"/"} >Back to login page</Link>
              </Center>
            </Anchor>
            <Button onClick={resetPassword}>Reset password</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}