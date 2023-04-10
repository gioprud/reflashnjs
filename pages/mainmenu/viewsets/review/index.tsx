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
    Pagination
} from '@mantine/core';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import database from '@/services/database';
import router from 'next/router';

const useStyles = createStyles((theme) => ({
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        lineHeight: 1.2,
        fontSize: 100,
        marginTop: theme.spacing.xs,
    },

    
}));

//retrieve data from backend
export async function getServerSideProps(context: any) {
    const session = await getSession(context)
    console.log(session?.user);
    // Fetch data from external API
    // @ts-ignore
    const cards = await database.getLatestCards(session?.user.id);
  
    // Pass data to the page via props
    return {
      props: {
        cards: cards.map(e => ({
          ...e,
          _id: e._id.toString(),
          due_date: e.due_date.toString(),
          user_id: e.user_id.toString(),
        }))
      }
    }
    }


const viewNextCard = () => {
    //on button click, go to next card


}

const correct = () => {
    // on click, mark card as correct
    // do mikes equation to interval
    // update due date


}

const incorrect = () => {
    // on click, mark card as incorrect
    // do mikes equation to interval
    // update due date
}

const reveal = () => {
    // on click, reveal the back of the card
}

export default function quizzing() {
    const classes = useStyles();
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        router.push('/')
        alert("You need to be logged in to access this page.")
    }


    return (
        <Container size={460} my={30}>
            <Title align="center">
                Reflash!
            </Title>
            <Text color="dimmed" size="sm" align="center">
                Main Menu
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <Group position="apart" mt="lg">
                    <TextInput id="answer" placeholder="answer here" />

                </Group>
                <Group>
                    <Button onClick={incorrect}> Wrong </Button>
                    <Button onClick={correct}> Got right</Button>
                </Group>

                <Group>
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