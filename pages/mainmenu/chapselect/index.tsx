import { SetData } from '@/component/DummyData';
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
  import { useSession } from 'next-auth/react';
  import Link from 'next/link';
  import router from 'next/router';
  
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

  //populate this page with a table of chapters of the chosen deck
  export default function ChapterSelect(){
    const { data: session, status } = useSession()
    const { classes } = useStyles();
    
    if (status === "loading") {
      return <p>Loading...</p>
    }
  
    if (status === "unauthenticated") {
      router.push('/')
      alert ("You need to be logged in to access this page.")
    }
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