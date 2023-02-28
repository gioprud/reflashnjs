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

  const resetPassword = () => {
    console.log("Reset password");
    
  }
  
  export default function ForgotPassword() {
    const { classes } = useStyles();
  
    return (
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Your email" placeholder="email@example.com" required type={"email"} />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <Link href={"/"} >Back to login page</Link>
              </Center>
            </Anchor>
            <Button className={classes.control} onClick={resetPassword}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    );
  }