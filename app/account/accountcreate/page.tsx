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
//import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import Link from 'next/link';

const createNewAccount = () => {
  console.log("Create new account");

  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const firstNameInput = document.getElementById("firstname") as HTMLInputElement;
  const lastNameInput = document.getElementById("lastname") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;

  const username = usernameInput.value;
  const password = passwordInput.value;
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;

  if (username == null || password == null || firstName == null || lastName == null || email == null) {
    console.log("One or more fields are null");
    alert("One or more fields are null");
    //return false;
  }

  if (!email) {
    console.log("Invalid email address");
    alert("Invalid email address");
    //return false;
  }



  console.log("username: " + username);
  console.log("password: " + password);
  console.log("firstName: " + firstName);
  console.log("lastName: " + lastName);
  console.log("email: " + email);

}


  export default function CreateAccount() {

    
    return (
      <Container size={460} my={30}>
        <Title sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          align="center">
          Reflash!
          Create your account
        </Title>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <form>
            <TextInput id='username' label="Username" placeholder="username" required />
            <TextInput id='password' label="Password" placeholder="password" required minLength={7} maxLength={20} />
            <TextInput id='firstname' label="First Name" placeholder="first name" required />
            <TextInput id='lastname' label="Last Name" placeholder="last name" required />
            <TextInput id='email' label="Email" placeholder="email" required type={"email"} />
            <Link href={"/"} >Back to login page</Link>
            <Button onClick={createNewAccount}>Create Account</Button>
          </form>
        </Paper>
      </Container>
    );
  }