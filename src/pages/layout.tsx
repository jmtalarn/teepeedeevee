import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

import './globals.css';
import { theme } from '@/theme';

import Header from '@/components/page/Header';
import Footer from '@/components/page/Footer';
import styles from './layout.module.css';
import { Outlet } from 'react-router';



export default function Layout() {

  return (
    <html lang="en" {...mantineHtmlProps}>
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <BodyContent><Outlet /></BodyContent>
        </MantineProvider>
      </body>

    </html>
  );
}

export const BodyContent = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <main className={styles.main}>
    <Header />
    <section className={styles.content}>
      {children}
    </section>
    <Footer />
  </main>
);
