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
    <Container size={600} my={30}>
      <Title className={classes.title} align="center">
        Reflash!
      </Title>
      <Text color="dimmed" size="sm" align="center">
        View Sets
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Group position="apart" mt="lg" className={classes.controls}>
          <Button component={Link} href={"/mainmenu/viewsets/createsets"}>
            Create Set
          </Button>
          <Button component={Link} href={"/mainmenu/viewsets/quizzing"}>
            Test yourself

          </Button >
          <Button component={Link} href={"/mainmenu/viewsets/availablesets"}>
            View Available Sets
          </Button>
        </Group>
        <Text color="blue" component={Link} href={"/mainmenu"} >
          Back to Main Menu
        </Text>
      </Paper>
    </Container>
  )
}