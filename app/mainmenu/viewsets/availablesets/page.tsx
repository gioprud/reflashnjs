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
  
  
    question: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 500,
      color: theme.black,
      lineHeight: 1.2,
      fontSize: 20,
      marginTop: theme.spacing.xs,
    },
  
    answer: {
      color: theme.black,
      opacity: 0.7,
      fontWeight: 400,
      textTransform: 'uppercase',
    },
  }));

const revealAnswer = () => {
    //on button click, toggle answer
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


  interface CardPage{
    card: CardProps;
    subject: string;
    question: string;
    answer: string;
  }

  //Populates a card in the carousel with the question and answer
  function Card({ card, subject, question, answer }: CardPage) {
    const { classes } = useStyles();
  
    return (
      <Paper
        shadow="md"
        p="xl"
        radius="xl"
        withBorder
        className={classes.card}
      >
        <div>
          <Text className={classes.question} size="xs">
            {question}
          </Text>
          <Title order={5} className={classes.answer}>
            {answer}
          </Title>
          <Text className={classes.question} size="xs">
            {subject}
          </Text>
        </div>
        
      </Paper>
    );
  }

  //Data stored for each card
  const data = [
    {
        subject: 'Math',
        question: '2x2',
        answer: '4',
    },
    {
        subject: 'History',
        question: 'Who was the first president of the United States?',
        answer: 'George Washington',
    },
    { 
        subject: 'Science',
        question: 'What is the fear of the number 13?',
        answer: 'Triskaidekaphobia',
    },
    {
        subject: 'Subject 4',
        question: 'Question 4',
        answer: 'Category 4',
    },

  ];

export default function OwnedSets() {
    const { classes } = useStyles();
    const slides = data.map((card, index) => (
        <Carousel.Slide key={index}>
            <Card card={card} question={card.question} answer={card.answer} />
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
                        Toggle Answer
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