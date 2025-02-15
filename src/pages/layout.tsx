
import Header from '@/components/page/Header';
import Footer from '@/components/page/Footer';
import styles from './layout.module.css';
import { Outlet } from 'react-router';
import Loading from '@/components/common/Loading';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';



export default function Layout() {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.content}>
        <Outlet />
      </section>
      <Footer />
      <Loading />
      <Notifications />
    </main>
  );
}

