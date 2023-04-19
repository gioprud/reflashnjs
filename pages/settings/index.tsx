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
    ThemeIcon,
    Switch, useMantineColorScheme, useMantineTheme, SegmentedControl
} from '@mantine/core';
import { Moon, Sun } from 'tabler-icons-react';
import Link from 'next/link';
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { signOut } from "next-auth/react"
import { useSession, getSession } from "next-auth/react"


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



export default function Settings() {
    const { data: session, status } = useSession()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    if (status === "loading") {
        return <p>Loading...</p>
    }

    const { classes } = useStyles();

    return (
        <Container size={460} my={30}>
            <Title className={classes.title} align="center">
                Settings
            </Title>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <Group position="apart" mt="lg" className={classes.controls}>
                    <p>This the settings page</p>
                    <p>add options to change
                        the settings
                        app theme
                        app language
                        app font
                        app font size
                        app font color
                    </p>
                </Group>

                <Group position="center" my={30} />
                <SegmentedControl
                    value={colorScheme}
                    onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
                    data={[
                        {
                            value: 'light',
                            label: (
                                <Center>
                                    <Sun size="1rem" stroke={'1.5'} />
                                    <Box ml={10}>Light</Box>
                                </Center>
                            ),
                        },
                        {
                            value: 'dark',
                            label: (
                                <Center>
                                    <Moon size="1rem" stroke={'1.5'} />
                                    <Box ml={10}>Dark</Box>
                                </Center>
                            ),
                        },
                    ]}
                />
                < Group position="apart" mt="lg" className={classes.controls}>
                    <Center>
                        <Text color="blue" component={Link} href={"/mainmenu"} >
                            Back to Main Menu
                        </Text>
                    </Center>
                </Group>
            </Paper>
        </Container>
    );

}