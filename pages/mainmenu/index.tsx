import { Container, Title, Table, Paper, createStyles } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import { ObjectId } from 'mongodb';
import React from "react";
import database from "@/services/database";

import { fetchData } from "next-auth/client/_utils";
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

type PageProps = {
  subjects: Record<string, number>
}
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const session = await getSession(context)
  // Fetch data from external API
  // @ts-ignore
  const userId = new ObjectId(session.user.id)
  const collection = await database.getCollection('cards');
  const userSubjects = await collection.distinct('subject', {
      // @ts-ignore
      user_id: userId
  });
  // Count every card per subject
  const count = await Promise.all(userSubjects.map(async (subject) => {
      const count = await collection.countDocuments({
          user_id: userId,
          subject
      });
      return {
        count,
        subject
      };
  }));
  // Map the subjects and counts into an object
  const subjects = count.reduce((acc, curr) => {
    acc[curr.subject] = curr.count;
    return acc;
  }, {} as PageProps['subjects']);
  // Return data to the page
  return {
    props: {
      subjects: subjects
    }
  }
}

export default function Viewsets({ subjects: subjectsObject }: PageProps) {
  const { data: session, status } = useSession()
  const { classes } = useStyles();
  
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
        Reflash! View All Sets
      </Title>
      <Paper>
        <Table striped>
          <thead>
            <tr>
              <th>Set name</th>
              <th>Total Cards</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(subjectsObject).map((subject) => (
              <tr>
                <td>
                  <Link href={`/mainmenu/subjects/${subject}`}>
                    {subject}
                  </Link>
                </td>
                <td>
                  {subjectsObject[subject]}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Container>
  );
}
