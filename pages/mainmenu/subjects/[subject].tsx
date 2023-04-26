import { Container, Title, Table, Paper, createStyles } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import { ObjectId } from 'mongodb';
import React from "react";
import database from "@/services/database";
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

type PageProps = {
  chapters: Record<string, number>;
}
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const session = await getSession(context);
  const { subject } = context.query;
  if (typeof subject !== 'string') return {
    notFound: true
  }
  
    
  // @ts-ignore - session.user.id does exist
  const userId = new ObjectId(session.user.id)
  const collection = await database.getCollection('cards');
  const userSubjects = await collection.distinct('chapter', {
      user_id: userId,
      subject: subject

  });

  // Count every card per subject
  const count = await Promise.all(userSubjects.map(async (chapter) => {
      const count = await collection.countDocuments({
          user_id: userId,
          subject: subject,
          chapter: chapter
      });
      return {
        count,
        chapter: chapter
      };
  }));

  // Map the subjects and counts into an object
  const subjects = count.reduce((acc, curr) => {
    acc[`${curr.chapter}`] = curr.count;
    return acc;
  }, {} as PageProps['chapters']);

  // Return data to the page
  return {
    props: {
      chapters: subjects
    }
  }
}

export default function Viewsets({ chapters }: PageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { classes } = useStyles();
  
  const { subject } = router.query;
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
        Reflash!<br></br>{subject}
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
            {Object.keys(chapters).map((chapterName) => (
              <tr>
                <td>
                  <Link href={`/mainmenu/subjects/${subject}/${chapterName}`}>
                    Chapter {chapterName}
                  </Link>
                </td>
                <td>
                  {chapters[`${chapterName}`]}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Container>
  );
}
