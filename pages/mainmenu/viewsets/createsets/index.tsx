
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
  NumberInput,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { Int32, ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

//get the session info
export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const createNewSet = () => {
  console.log("Create new set");
  const session = getSession();

  const setSubjectInput = document.getElementById("subject") as HTMLInputElement;
  const questionInput = document.getElementById("front") as HTMLInputElement;
  const answerInput = document.getElementById("back") as HTMLInputElement;
  const chapterInput = document.getElementById("chapter") as HTMLInputElement;

  const subject = setSubjectInput.value;
  const front = questionInput.value;
  const back = answerInput.value;
  const chapter = chapterInput.value;

  if (subject == null || subject == "" || front == null || front == "" || back == null || back == "" || chapter == null || chapter == "") {
    console.log("Fields cannot be empty");
    alert("Fields cannot be empty");
  }

  const data = {
    subject: subject,
    front: front,
    back: back,
    chapter: chapter
  }
  

  console.log( "Subject: " + subject);
  console.log("question: " + front);
  console.log("answer: " + back);
  console.log("chapter: " + chapter);

  const handleUpload = async () => {
    console.log("Upload card");

    fetch('/api/cards/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert("card created and sent to server");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error sending set to server");
      });
  }

  handleUpload();
}


function addQuestion() {
  console.log("Add question");

}



export default function CreateSet(context: any) {
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
          <TextInput id='subject' label="Subject" placeholder="Set Subject" required />
          <NumberInput type='number'hideControls id='chapter' label="Chapter" placeholder="Chapter" required />
          <Group position="center" mt="lg">
            <TextInput id='front' label="Question" placeholder="Question, e.x 2+2=" required />
            <TextInput id='back' label="Answer" placeholder="Answer, e.x 4" required />
          </Group>
        </form>
        <Group position="center" mt="lg">
        <Dropzone onDrop={(files) => console.log('files accepted:', files)}
        onReject={(files) => console.log('files rejected', files)}
        maxSize={60 * 1024 ** 2}>
        <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
        <Dropzone.Accept>
          File Accepted
        </Dropzone.Accept>
        <Dropzone.Reject>
          File Rejected
        </Dropzone.Reject>
        <Dropzone.Idle>
          Idling
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag file here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach one csv file
          </Text>
        </div>
      </Group>
      </Dropzone>
        </Group>
        <Group position="center" mt="lg">
          <Button onClick={createNewSet}>Create Card</Button>
          <Link href="/mainmenu">
            <Button>
              Back
            </Button>
          </Link>
        </Group>

      </Paper>
    </Container>
  );
}