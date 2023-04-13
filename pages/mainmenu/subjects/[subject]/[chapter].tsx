import { Container, Title, Table, Paper, createStyles } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import { ObjectId } from 'mongodb';
import React from "react";
import database, { Card } from "@/services/database";
import { useRouter } from 'next/router'
import { GetServerSideProps } from "next";

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

type StringifiedCard = Card & {
    _id: string;
    due_date: string;
    user_id: string
}

type PageProps = {
  cards: StringifiedCard[];
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
  
    
  // @ts-ignore
  const userId = new ObjectId(session.user.id)
  const collection = await database.getCollection('cards');
  const cards = await collection.find({
      user_id: userId,
      subject: subject,
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
        due_date: e.due_date.toString()
      } as StringifiedCard))
    }
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
    alert ("You need to be logged in to access this page.")
  }

  

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
        Reflash! View {subject} - Chapter {chapter}
      </Title>
      <Paper>
        <Table striped>
          <thead>
            <tr>
              <th>Chapter name</th>
              <th>Total Cards</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr>
                <td>
                  <pre>{JSON.stringify(card, null, 2)}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Container>
  );
}
