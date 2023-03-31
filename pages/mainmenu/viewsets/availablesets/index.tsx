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
import { Carousel } from '@mantine/carousel';
import database from '@/services/database';
import { useToggle } from '@mantine/hooks';
import { getSession } from 'next-auth/react';

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
  //populate page with data
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

  const [value, toggle] = useToggle([{front}, {back}])

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="xl"
      withBorder
      className={classes.card}
    >
      <Group>
        <Text className={classes.front} size="xs" onClick={() => toggle()}>
          {front}
        </Text>
        <Title order={5} className={classes.back}>
          {back}
        </Title>
      </Group>


    </Paper>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log(session?.user);
  console.log('got here')
  // Fetch data from external API
  const cards = await database.getLatestCards(session?.user.id);

  // Pass data to the page via props
  return { props: { cards: cards.map(e => ({
    ...e,
    _id: e._id.toString(),
    due_date: e.due_date.toString(),
    user_id: e.user_id.toString(),
    })) } }
}

export default function OwnedSets({ cards }) {
  const { classes } = useStyles();
  const slides = cards.map((card, index) => (
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
          <Button>
           reveal answer
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