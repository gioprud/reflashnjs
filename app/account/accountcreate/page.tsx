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

  const createNewAccount = () => {
    console.log("Create new account");

    }

  export default function CreateAccount() {

    return (
      <Container size={460} my={30}>
        <Title sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})} 
        align="center">
          Reflash!
          Create your account
        </Title>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Username" placeholder="username" required />
          <TextInput label="Password" placeholder="password" required />
          <TextInput label="First Name" placeholder="first name" required />
          <TextInput label="Last Name" placeholder="last name" required />
          <TextInput label="Email" placeholder="email" required />
          <Link href={"/"} >Back to login page</Link>
          <Button onClick={createNewAccount}>Create Account</Button>
        </Paper>
        </Container>
    );
    }