import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import jwt_decode from "jwt-decode";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({ payload }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>{JSON.stringify(payload)}</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const token = context.req.headers["x-session"];

  if (!token) {
    return {
      notFound: true,
    };
  }

  try {
    const payload = jwt_decode(token);
    return {
      props: {
        payload,
      },
    }; 
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

export default Home;
