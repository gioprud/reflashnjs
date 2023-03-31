"use client";
import { Container, Title, Table, Paper } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { SetData } from "../../../../component/orgdata";


export default function Viewsets() {
  const rows = SetData.map((element) => (
    <tr key={element.SubjectName}>
      <td>
        <Link href="availablesets">{element.SubjectName}</Link>
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
