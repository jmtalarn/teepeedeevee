
import Header from '@/components/page/Header';
import Footer from '@/components/page/Footer';
import styles from './layout.module.css';
import { Outlet } from 'react-router';




export default function Layout() {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.content}>
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}

