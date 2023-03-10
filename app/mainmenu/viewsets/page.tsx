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

export default function MainMenu() {
  const { classes } = useStyles();

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
          <p>This the sets page</p>
          <p>add options to download,
            view, create
            and
            delete sets
          </p>
        </Group>
        <Group position="apart" mt="lg" className={classes.controls}>
          <Button component={Link} href={"/mainmenu/viewsets/createsets"}>
            Create Set
          </Button>
          <Button component={Link} href={"/mainmenu/viewsets/downloadsets"}>
            Download Set
          </Button >
          <Button component={Link} href={"/mainmenu/viewsets/ownedsets"}>
            View Downloaded Sets
          </Button>
        </Group>
      </Paper>
    </Container>
  )
}