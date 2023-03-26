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
  CardProps,
} from '@mantine/core';
import Link from 'next/link';
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react";
import { Carousel } from '@mantine/carousel';

const useStyles = createStyles((theme) => ({
  card: {
    height: 7040,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 100,
    marginTop: theme.spacing.xs,
  },

  paptitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.black,
    lineHeight: 1.2,
    fontSize: 12,
    marginTop: theme.spacing.xs,
  },


  front: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 500,
    color: theme.black,
    lineHeight: 1.2,
    fontSize: 20,
    marginTop: theme.spacing.xs,
  },

  back: {
    color: theme.black,
    opacity: 0.7,
    fontWeight: 400,
    textTransform: 'uppercase',
  },
}));

const revealAnswer = () => {
  //on button click, toggle back
}

const populateCards = () => {
  // populate cards with set data

}

//retrieve data from backend
async function getData() {
  const res = await fetch('/api/get_decks');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function Page() {
  const data = await getData();
}


interface CardPage {
  card: CardProps;
  subject: string;
  front: string;
  back: string;
}

//Populates a card in the carousel with the question and back
function Card({ card, subject, front, back }: CardPage) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="xl"
      withBorder
      className={classes.card}
    >
      <Group>
        <Text className={classes.front} size="xs">
          {front}
        </Text>
        <Title order={5} className={classes.back}>
          {back}
        </Title>
        <Text className={classes.front} size="xs">
          {subject}
        </Text>
      </Group>


    </Paper>
  );
}

//Data stored for each card
const data = [
  {
    subject: 'Math',
    front: '2x2',
    back: '4',
    chapter: 1,
    id: 0,
    interval: 1,
    due_date: "5023-01-01 00:00:00",
    seen: 0,
  },
  {
    subject: 'History',
    front: 'Who was the first president of the United States?',
    back: 'George Washington',
    chapter: 2,
    id: 1,
    interval: 1,
    due_date: "5023-01-01 00:00:00",
    seen: 0,
  },
  {
    subject: 'Science',
    front: 'What is the fear of the number 13?',
    back: 'Triskaidekaphobia',
    chapter: 2,
    id: 2,
    interval: 1,
    due_date: "5023-01-01 00:00:00",
    seen: 0,
  },
  {
    subject: 'Subject 4',
    front: 'Question 4',
    back: 'Category 4',
    chapter: 3,
    id: 3,
    interval: 1,
    due_date: "5023-01-01 00:00:00",
    seen: 0,
  },

];

export default function OwnedSets() {
  const { classes } = useStyles();
  const slides = data.map((card, index) => (
    <Carousel.Slide key={index}>
      <Card card={card} front={card.front} back={card.back} />
    </Carousel.Slide>
  ));

  return (
    <Container size={1000} my={30}>
      <Title className={classes.title} align="center">
        Reflash!
      </Title>
      <Text color="white" size="sm" align="center">
        Study
      </Text>

      <Paper withBorder shadow="md" p={90} radius="md" mt="xl">
        <Group position='center'>
          <Text className={classes.paptitle} size="xl">
            Study Set Name
          </Text>
        </Group>

        <Carousel slideSize='70%' maw={320} mx="auto" withIndicators height={200}>
          {slides}
        </Carousel>
        <Group position="center" mt="xl">
          <Button onClick={Page}>
           fetch data
          </Button>
          <Link href="/mainmenu/viewsets">
            <Button>
              Back
            </Button>
          </Link>
        </Group>
      </Paper>
    </Container>
  )
}