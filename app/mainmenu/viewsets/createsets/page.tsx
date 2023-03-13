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
//import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import Link from 'next/link';

const createNewSet = () => {
  console.log("Create new set");

  const setNameInput = document.getElementById("setName") as HTMLInputElement;
  const subjectInput = document.getElementById("subject") as HTMLInputElement;
  const questionInput = document.getElementById("question") as HTMLInputElement;
  const answerInput = document.getElementById("answer") as HTMLInputElement;

  const setName = setNameInput.value;
  const subject = subjectInput.value;
  const question = questionInput.value;
  const answer = answerInput.value;

  if (setName == null || subject == null) {
    console.log("Set Name and Subject cannot be empty");
    alert("Set Name and Subject cannot be empty");
  }

  console.log("Set Name: " + setName);
  console.log("Subject: " + subject);
  console.log("Question: " + question);
  console.log("Answer: " + answer);

  const data = {
    setName: setName,
    subject: subject,
    question: question,
    answer: answer
  }

  const jsonString = JSON.stringify(data);


    fetch('https://b61fc227-6f8e-49e9-8a14-2a7bc2505066.mock.pstmn.io', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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

function addQuestion() {
  console.log("Add question");

}

export default function CreateSet() {


  return (
    <Container size={650} my={30}>
      <Title sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        align="center">
        Reflash!
        Create A Set
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form>
          <TextInput id='setName' label="Set Name" placeholder="Set Name" required />
          <TextInput id='subject' label="Subject" placeholder="Subject, e.x Math" required minLength={7} maxLength={20} />
          <Group position="center" mt="lg">
            <TextInput id='question' label="Question" placeholder="Question, e.x 2+2=" required />
            <TextInput id='answer' label="Answer" placeholder="Answer, e.x 4" required />
          </Group>
          <Group position="center" mt="lg">
            <Button onClick={addQuestion}>Add More Questions</Button>
            <Button onClick={createNewSet}>Create Set</Button>
          </Group>
        </form>
        <Link href={"/"} >Back to login page</Link>
      </Paper>
    </Container>
  );
}