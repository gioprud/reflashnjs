import { Container, Title, Table, Paper, createStyles, Card, Button, Group } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import { ObjectId } from 'mongodb';
import React from "react";
import database, { CardInfo } from "@/services/database";
import { useRouter } from 'next/router'
import { GetServerSideProps } from "next";
import { Carousel } from "@mantine/carousel";

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
  },

  slide: {
    height: 300,
    size: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    inViewThreshold: 100,

  },

}));

type StringifiedCard = CardInfo & {
  _id: string;
  due_date: string;
  user_id: string
}

type PageProps = {
  cards: StringifiedCard[];
}

interface CardPage {
  front: string;
  back: string;
}


//Populates a card in the carousel with the question and back
const CardPages: React.FC<CardPage> = ({ front, back }) => {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="md"
      radius="md"
      withBorder
      className={classes.card}
    >
      <Group position="center" align='center'>
        <Title className={classes.front} size="xs">
          {front}
        </Title>
        <Title className={classes.back}>
          {back}
        </Title>
      </Group>
    </Paper>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const session = await getSession(context);
  const { subject, chapter } = context.query;
  if (typeof subject !== 'string' || !subject) return {
    notFound: true
  }
  if (typeof chapter !== 'string' || !chapter) return {
    notFound: true
  }
  const chapterNumber = parseInt(chapter);
  if (isNaN(chapterNumber)) {
    return {
      notFound: true
    }
  }


  // @ts-ignore - session.user.id is a string
  const userId = new ObjectId(session.user.id)
  // looks at collection 'cards' and finds all cards with the user_id, subject, and chapter
  const collection = await database.getCollection('cards');
  const cards = await collection.find({
    user_id: userId,
    subject: subject,
    // @ts-ignore - chapterNumber is a number
    chapter: chapterNumber
  }).toArray();
  if (!cards.length) {
    return {
      notFound: true
    }
  }

  // Return data to the page
  return {
    props: {
      cards: cards.map(e => ({
        ...e,
        _id: e._id.toString(),
        user_id: e.user_id.toString(),
        due_date: e.due_date.toString(),
      } as StringifiedCard))
    }
  }
}

const SeenCard = (CardId: string, seen: boolean) => {
  const url = "/api/cards/" + CardId;

  if (!seen) {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seen: true,
      })

    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      })
  }


}

export default function Viewsets({ cards }: PageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { classes } = useStyles();

  const { subject, chapter } = router.query;
  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    router.push('/')
    alert("You need to be logged in to access this page.")
  }

  const slides = cards.map((card, index) => (
    <Carousel.Slide key={index}>
      <Card className={classes.slide} children={<CardPages
        front={card.front}
        back={card.back} />} {...card} />
    </Carousel.Slide>
  ));

  return (
    <Container size={650} my={30}>
      <Title
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
          marginBottom: 50,
        })}
        align="center"
      >
        Reflash!<br></br>{subject}<br></br>Chapter {chapter}
      </Title>
      <Paper withBorder>
        <Carousel className={classes.card} controlsOffset='xl' height='300px' slideSize='50%' mx='auto' onSlideChange={(index) => SeenCard(cards[index]._id, cards[index].seen)}>
          {slides}
        </Carousel>
        <Card>
          <Paper>
            <Group position="apart">
              <Link href="/mainmenu">
                Back to Main Menu
              </Link>
            </Group>
          </Paper>
        </Card>
      </Paper>
    </Container>
  );
}

/*        <Table striped>
        <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr>
                <td>
                  <pre>{card.front}</pre>
                </td>
                <td>
                  <pre>
                    {card.back}
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </Table> */