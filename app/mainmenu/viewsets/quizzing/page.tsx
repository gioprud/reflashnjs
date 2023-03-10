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
import { Carousel } from '@mantine/carousel';

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

const nextCard = () => {
    //on button click, go to next card


}

const prevCard = () => {
    //on button click, go to previous card
}

const revealAnswer = () => {
    //on button click, toggle answer
}

export default function quizzing() {
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
                    <TextInput id = "answer" placeholder="answer here" />
                    <Button onClick={revealAnswer}>
                        Reveal Answer
                    </Button>
                </Group>
            </Paper>
        </Container>
    )
}