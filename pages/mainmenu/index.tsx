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
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import router from 'next/router';

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

const helpButton = () => {
  console.log("Help button clicked");

}

export default function MainMenu() {
  const { data: session, status } = useSession()
  const { classes } = useStyles();
  
  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    router.push('/')
    alert ("You need to be logged in to access this page.")
  }


  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Reflash!
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Main Menu
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Group position="apart" mt="lg" className={classes.controls}>
          <Button component={Link} href={"/mainmenu/viewsets"}>
            View Sets
          </Button>
          <Button component={Link} href={"/settings"}>
            Settings
          </Button >
          <Button component={Link} href={"/mainmenu/help"} onClick={helpButton}>
            Help
          </Button>
        </Group>
      </Paper>
    </Container>
  )
}