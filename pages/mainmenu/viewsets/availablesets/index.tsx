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
  Card,
} from '@mantine/core';
import Link from 'next/link';
import { Carousel } from '@mantine/carousel';
import database from '@/services/database';
import { useToggle } from '@mantine/hooks';
import { getSession, useSession } from 'next-auth/react';
import router from 'next/router';

const useStyles = createStyles((theme) => ({
  card: {
    height: 640,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    inViewThreshold: 100,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.2,
    fontSize: 100,
    marginTop: theme.spacing.xs,
  },

  paptitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.2,
    fontSize: 12,
    marginTop: theme.spacing.xs,
  },


  front: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 500,
    lineHeight: 1.2,
    fontSize: 20,
    marginTop: theme.spacing.xs,
  },

  back: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    opacity: 0.7,
    fontWeight: 400,
    textTransform: 'uppercase',
  },
}));

interface CardPage {
  front: string;
  back: string;
  subject: string;
}

//Populates a card in the carousel with the question and back
const CardPages: React.FC<CardPage> = ({ front, back, subject }) => {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="md"
      radius="md"
      withBorder
      className={classes.card}
    >
      <Group position="center">
        <Title className={classes.back} size="xs">
          {front}
        </Title>
        <Text className={classes.front}>
          {back}
        </Text>
      </Group>
    </Paper>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  console.log(session?.user);
  // Fetch data from external API
  // @ts-ignore
  const cards = await database.getLatestCards(session?.user.id);

  // Pass data to the page via props
  // also converts ObjectID to string
  return {
    props: {
      cards: cards.map(e => ({
        ...e,
        _id: e._id.toString(),
        user_id: e.user_id.toString(),
        due_date: e.due_date.toString()
      }))
    }
  }
}

export default function OwnedSets({ cards }: { cards: CardPage[] }) {
  const { data: session, status } = useSession()
  const { classes } = useStyles();

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    router.push('/')
    alert("You need to be logged in to access this page.")
  }

  const slides = cards.map((card, index) => (
    <Carousel.Slide key={index}>
      <Card children={<CardPages
        front={card.front}
        back={card.back}
        subject={card.subject} />} {...card} />
    </Carousel.Slide>
  ));

  return (
    <Container size={300} my={30} fluid>
      <Title className={classes.title} align="center">
        Reflash!
      </Title>

      <Carousel className={classes.card} slideSize='50%'>
        {slides}
      </Carousel>
      <Group position="center" mt="xl">
        <Link href="/mainmenu">
          <Button color={"red"}>
            Back
          </Button>
        </Link>
      </Group>
    </Container>
  )
}