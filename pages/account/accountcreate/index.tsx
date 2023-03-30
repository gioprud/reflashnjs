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
  PasswordInput,
} from '@mantine/core';
//import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

const createNewAccount = () => {
  console.log("Create new account");

  let flag = true;

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
    flag = false;
    return false;
  }

  if (!email) {
    console.log("Invalid email address");
    alert("Invalid email address");
    flag = false;
  }

  if (password.length < 7 || password.length > 20) {
    console.log("Password must be between 7 and 20 characters");
    alert("Password must be between 7 and 20 characters");
    flag = false;
  }



  console.log("username: " + username);
  console.log("password: " + password);
  console.log("firstName: " + firstName);
  console.log("lastName: " + lastName);
  console.log("email: " + email);

  
  
  if (flag == true) {

  const url = "/api/user/register";
  const data = {
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
    email: email
  };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert("Account created successfully");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error creating account");
      });

      const handleChange = (event: { target: { name?: any; value?: any; }; }) => {
        const { value } = event.target;
      }
}}


export default function CreateAccount() {
  const { classes } = useStyles();


  return (
    <Container size={460} my={30}>
      <Title className={classes.title} sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        align="center">
        Reflash!
        Create your account
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form>
          <TextInput id='username' label="Username" placeholder="username" required />
          <PasswordInput id='password' label="Password" placeholder="password" required minLength={7} maxLength={20} />
          <TextInput id='firstname' label="First Name" placeholder="first name" required />
          <TextInput id='lastname' label="Last Name" placeholder="last name" required />
          <TextInput id='email' label="Email" placeholder="email" required type={"email"} />
          <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <Link href={"/"} >Back to login page</Link>
              </Center>
            </Anchor>
          <Button className={classes.control} onClick={createNewAccount}>Create Account</Button>
        </form>
      </Paper>
    </Container>
  );
}
