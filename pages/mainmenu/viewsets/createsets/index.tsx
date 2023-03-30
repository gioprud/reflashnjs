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
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import Link from 'next/link';
import React from 'react';

const createNewSet = () => {
  console.log("Create new set");

  const setNameInput = document.getElementById("setName") as HTMLInputElement;
  const setChapterInput = document.getElementById("chapter") as HTMLInputElement;
  const questionInput = document.getElementById("front") as HTMLInputElement;
  const answerInput = document.getElementById("back") as HTMLInputElement;

  const setName = setNameInput.value;
  const chapter = setChapterInput.value;
  const front = questionInput.value;
  const back = answerInput.value;

  if (chapter == null || chapter == "" || front == null || front == "" || back == null || back == "") {
    console.log("Set Name and Subject cannot be empty");
    alert("Set Name and Subject cannot be empty");
  }

  console.log("Set Name: " + setName);
  console.log("Set Name: " + chapter);
  console.log("question: " + front);
  console.log("answer: " + back);

  const data = {
    setName: setName,
    chapter: chapter,
    front: front,
    back: back
  }

  const handleDownload = async () => {
    console.log("Download set");
    const data = [
      ["setName","chapter", "front", "back"],
      [setName,chapter, front, back],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");

    const formData = new FormData();
    formData.append('file', new Blob([csvContent], { type: 'text/csv' }), 'data.csv');

    console.log(data);

    await fetch('/api/sets/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert("set created and sent to server");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error sending set to server");
      });
  }

  handleDownload();
}

function addQuestion() {
  console.log("Add question");

}

export default function CreateSet() {
  const openRef = React.useRef(null);


  return (
    <Container size={650} my={30}>
      <Title sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        align="center">
        Reflash!
      </Title>
      <Paper withBorder shadow="md" p={100} radius="md" mt="xl">
        <Title sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          align="center">
          Create Set
        </Title>
        <form>
          <TextInput id='chapter' label="Set Chapter" placeholder="Set Chapter" required />
          <Group position="center" mt="lg">
            <TextInput id='front' label="Question" placeholder="Question, e.x 2+2=" required />
            <TextInput id='back' label="Answer" placeholder="Answer, e.x 4" required />
          </Group>
        </form>
        <Group position="center" mt="lg">
        <Dropzone onDrop={(files) => console.log('files accepted:', files)}
        onReject={(files) => console.log('files rejected', files)}
        maxSize={60 * 1024 ** 2}>
        {/* children */}
      </Dropzone>
        </Group>
        <Group position="center" mt="lg">
          <Button onClick={addQuestion}>Add More Questions</Button>
          <Button onClick={createNewSet}>Create Set</Button>
          <Link href="/mainmenu/viewsets">
            <Button>
              Back
            </Button>
          </Link>
        </Group>

      </Paper>
    </Container>
  );
}