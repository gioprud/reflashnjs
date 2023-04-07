"use client";
import { Container, Title, Table, Paper, createStyles } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { SetData } from "@/component/orgdata";

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



export default function Viewsets() {
  const { data: session, status } = useSession()
  const { classes } = useStyles();
  
  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    router.push('/')
    alert ("You need to be logged in to access this page.")
  }
  
  const rows = SetData.map((element) => (
    <tr key={element.SubjectName}>
      <td>
        <Link href="/mainmenu/viewsets/availablesets">{element.SubjectName}</Link>
      </td>
      <td>
        {element.SubjectName}
      </td>

    </tr>
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
        Reflash! View All Set
      </Title>
      <Paper>
        <Table>
          <thead>
            <tr>
              <th>Set name</th>
              <th>Subject name</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </Container>
  );
}
