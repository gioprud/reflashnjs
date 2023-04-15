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
    Pagination,
} from '@mantine/core';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import database, { CardInfo } from '@/services/database';
import router from 'next/router';
import { useToggle } from '@mantine/hooks';
import { GetServerSideProps } from "next";

type StringifiedCard = CardInfo & {
    _id: string;
    due_date: string;
    user_id: string
}

type PageProps = {
  cards: StringifiedCard[];
  currentPage: number;
  totalPages: number;
}
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const session = await getSession(context);
    //@ts-ignore: The id does exist
    const userId = new ObjectId(session?.user.id)
    const collection = await database.getCollection('cards');
    
    // const cards = await database.getDueCards(userId);
    const cards = await collection.find({
        user_id: userId,
        due_date_logi_goes_here: { $exists: false}
    }).toArray()
    //@ts-ignore: The id does exist
    // current page should be a number right? I think you're calling the wrong function here
    const currentPage = 0// await database.getLatestCards(session?.user.id) || 1;
    //@ts-ignore: The id does exist
    const totalPages = await database.getCardCount(session?.user.id) || 1;
    // Pass data to the page via props
    return {
        props: {
            cards: cards.map((e) => ({
                ...e,
                _id: e._id.toString(),
                due_date: e.due_date.toString(),
                user_id: e.user_id.toString(),
            } as StringifiedCard)),
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }
}

const useStyles = createStyles((theme) => ({
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        lineHeight: 1.2,
        fontSize: 100,
        marginTop: theme.spacing.xs,
    },
}));

const viewNextCard = () => {
    //on button click, go to next card


}

const correct = () => {
    // on click, mark card as correct
    // do mikes equation to interval
    // update due date

    const url = "/api/cards/${cardId}"

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // due_date: new Date() + 1 day
        })
    })



}

const incorrect = () => {
    // on click, mark card as incorrect
    // do mikes equation to interval
    // update due date
}

interface CardPage {
    front: string;
    back: string;
}

function CardPages({ front, back }: CardPage) {
    const classes = useStyles();
    const [value, toggle] = useToggle([{ front }, { back }])
    return (
        <Paper withBorder shadow="md" p={50} radius="md" mt="xl">
            <Text color="black" size="sm" align="center">
                {front}
            </Text>
            <Group position="center">
                <Button onClick={() => toggle()}>show answer</Button>
            </Group>
        </Paper>
    );
}

export default function quizzing({ cards, currentPage, totalPages }: PageProps) {
    const classes = useStyles();
    const { data: session, status } = useSession()
    const slides = cards.map((card, index) => (
        <CardPages front={card.front} back={card.back} />
    ));

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
                Review
            </Text>
            <CardPages front="front" back="back" />
            <Paper withBorder shadow="md" p={50} radius="md" mt="xl">
                <Group position="center">
                    <Button onClick={incorrect}> Wrong </Button>
                    <Button onClick={correct}> Right</Button>
                </Group>

                <Group position="center">
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