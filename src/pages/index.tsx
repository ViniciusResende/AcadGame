import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/pages/Home.module.scss';
import { Header } from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | AcadGame</title>
      </Head>
      <Header />
    </div>
  );
};

export default Home;
