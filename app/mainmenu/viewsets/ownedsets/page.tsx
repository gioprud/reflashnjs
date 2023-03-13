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
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react";
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

const populateCards = () => {
    //on button click, populate cards with set data
    
}

function Data(){
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://b61fc227-6f8e-49e9-8a14-2a7bc2505066.mock.pstmn.io')
            .then(res => res.json())
            .then(data => setData(data));
    }, []);
}

export default function OwnedSets() {
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
                <Carousel maw={320} mx="auto" withIndicators height={200}>
                    <Carousel.Slide>data: {Data.length}</Carousel.Slide>
                    <Carousel.Slide>2</Carousel.Slide>
                    <Carousel.Slide>3</Carousel.Slide>
                    {/* ...other slides */}
                </Carousel>
            </Paper>
        </Container>
    )
}