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
//import { CreateAccount } from './NewAccount';
//import { ForgotPassword } from './ForgotPassword';
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

  
  export default function LoginPage() {
    const handleCreateAccount = () => {
      console.log("Create account");
    }

    const handleForgotPassword = () => {
      console.log("Forgot password");

    }

    const handleSignIn = () => {
      console.log("Sign in");
    }


    return (  
        <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Reflash!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          <Anchor href="#" size="sm" onClick={handleCreateAccount}>
            Create account
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Username" placeholder="username" required />
          <PasswordInput label="Password" placeholder="password" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Link href={"/forgot"} color="blue">
              ForgotPassword
            </Link>
          </Group>
          <Button onClick={handleSignIn} fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>    
    );
  }