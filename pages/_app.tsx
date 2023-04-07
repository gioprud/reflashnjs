import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/component/layout';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Reflash</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={pageProps.session}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles withNormalizeCSS theme={{ colorScheme: colorScheme}}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
      </SessionProvider>
    </>
  );
}
