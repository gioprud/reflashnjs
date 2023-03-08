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
                    <p>Instrucitons</p>
                      <p>A set of flashcard can be viewed by either viewing previous sets or creating a new one.</p>
                      <p>By clicking on the View Sets button, the user is shown existing sets or is given the option to create a new one.</p>
                      <p>Once a set is opened the user has access to the flashcards.</p>
                      <p>When using flashcards, the quesiton will be on the front of the card.</p> 
                      <p>Once the question has been read the user can then click the flip button to reveal the answer.</p>
                      <p>If the user answered the correct answer they can click the Correct button which lets Reflash know that the user knows that question.</p>
                      <p>If the user answered the incorrect answer they can click the Incorrect button which lets Reflash know that the user doesn't know the question.</p>
                      <p>If the user answered the correct answer, the flashcard will be marked as correct.</p>
                      <p>If the user answered the incorrect answer, the flashcard will be marked as incorrect and will be shown again until the user answeres correctly.</p>
                      <p>After this a new flashcard will be shown and the process is repeated until every flashcard is answered correctly.</p>
                </Group>
            </Paper>
        </Container>
    )
    }