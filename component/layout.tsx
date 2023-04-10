import React from "react";
import { AppShell, Navbar, Header, Group, createStyles, Button } from "@mantine/core";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

const AuthHead: React.FC = () => {
    const { classes } = useStyles()
    return (
        <Header
            height={100}
        >
            <Group position='apart'>
                <h1 className='header'>Reflash!</h1>                <Group position="right">
                    <Link className={classes.link} href='/mainmenu'>Home</Link>
                    <Link className={classes.link} href={"/settings"}>Settings</Link>
                    <Link className={classes.link} href={"/mainmenu/viewsets/createsets"}>Create</Link>
                    <Link className={classes.link} href={"/mainmenu/viewsets/availablesets"}>AvailSets</Link>
                    <Link className={classes.link} href={"/mainmenu/viewsets/review"}>Review</Link>
                    <Button
                        color="red"
                        compact
                        onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
                </Group>
            </Group>

        </Header>
    );
};

const UnAuthHead: React.FC = () => {
    const { classes } = useStyles()
    return (
        <Header
            height={100}
        >
            <Group position="apart">
                <h1 className='header'>Reflash!</h1>
                <Group position="right">
                    <Link className={classes.link} href={"/settings"}>Settings</Link>
                    <Link className={classes.link} href="/account/accountcreate">Sign Up</Link>
                </Group>

            </Group>

        </Header>
    );
};


// @ts-ignore
const Layout: React.FC<{
    children?: React.ReactNode
}> = ({ children }) => {
    const { classes } = useStyles();
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <AppShell
                padding={'md'}
                header={<AuthHead />}
                className={classes.header}
            >
                {children}
            </AppShell>
        );
    };

    if (status === "unauthenticated") {
        return (
            <AppShell
                padding={'md'}
                header={<UnAuthHead />}
                className={classes.header}
            >
                {children}
            </AppShell>
        );
    };
}
export default Layout;