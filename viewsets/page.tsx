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
      textAlign: 'left',
    },
  },
}));

  export default function MainMenu() {
  const { classes } = useStyles();

  return (
      <Container size={1000} my={30}>
          <Title className={classes.title} align="right">
              Reflash!
          </Title>
          <Text color="dimmed" size="sm" align="right">
              View Sets
          </Text>

          <Paper withBorder shadow="md" p={350} radius="md" mt="xl">
              <Group position="right" mt="lg" className={classes.controls}>
                  <Link href={"/mainmenu/viewsets/createsets"}>                  
                  <Button>
                    Create Set
                  </Button>
                  </Link>
              </Group>
          </Paper>
      </Container>
  )
  }