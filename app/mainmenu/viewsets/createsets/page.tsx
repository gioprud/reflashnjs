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

  const setNameInput = document.getElementById("setname") as HTMLInputElement;
  const subjectInput = document.getElementById("subject") as HTMLInputElement;
  const questionInput = document.getElementById("question") as HTMLInputElement;
  const answerInput = document.getElementById("lastname") as HTMLInputElement;


  const setName = setNameInput.value;
  const subject = subjectInput.value;
  const question = questionInput.value;
  const answer = answerInput.value;


  if (setName == null || subject == null || question == null || answer == null){
    console.log("One or more field are empty");
    alert("One or more field are empty");
  }


  console.log("Set Name: " + setName);
  console.log("Subject: " + subject);
  console.log("Question: " + question);
  console.log("Answer: " + answer);
  


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
            <TextInput id='question' label="Question" placeholder="Question, e.x 2+2=" required />
            <TextInput id='answer' label="Answer" placeholder="Answer, e.x 4" required />

            <Button>Add More Questions</Button>
          </form>
        </Paper>
      </Container>
    );
  }