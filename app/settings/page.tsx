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
    Switch, useMantineColorScheme, useMantineTheme
} from '@mantine/core';
import Link from 'next/link';
import { useState } from "react";
import { useTheme } from "@emotion/react";


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
    const { classes } = useStyles();

    return (
        <Container size={460} my={30}>
            <Title className={classes.title} align="center">
                test
            </Title>
            <Text color="dimmed" size="sm" align="center">
                Settings
            </Text>

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
                < Group position="apart" mt="lg" className={classes.controls}>
                    <Center>
                        <Text color="blue" component={Link} href={"/mainmenu"} >
                            Back to Main Menu
                        </Text>
                    </Center>
                </Group>
                <Group position="center" my={30}>
                    <Switch
                        label="Dark theme"
                        size="lg"
                    />
                </Group>
                <Group>
                    <Button
                        component={Link}
                        href={"/"}
                        variant="outline"
                        color="red"
                        fullWidth
                        mt="xl"
                    >
                        Sign Out
                    </Button>
                </Group>
            </Paper>
        </Container>
    );

}