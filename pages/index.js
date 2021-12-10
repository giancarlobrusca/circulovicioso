import Head from "next/head";
import Image from "next/image";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaCoffee } from "react-icons/fa";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Círculo Vicioso Podcast</title>
        <meta name="description" content="Aguante El Círculo papá" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          width={400}
          height={400}
          src="/circulo400x400.jpeg"
          alt="Circulo logo"
        />
        <section>
          <h1>Círculo Vicioso</h1>
          <h2>
            Un podcast conducido por{" "}
            <a
              href="https://twitter.com/pablowasserman"
              target="_blank"
              rel="noreferrer"
            >
              Pablo Wasserman
            </a>{" "}
            y
            <a
              href="https://twitter.com/realjuanruocco"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Juan Ruocco
            </a>
          </h2>
          <h2>Bitcoin, hongos 🍄, monos 🐒 y ranas 🐸.</h2>
          <a
            href="https://www.youtube.com/c/CirculoVicioso8"
            target="_blank"
            rel="noreferrer"
          >
            <button className={styles.youtubebtn}>
              <AiFillYoutube />
            </button>
          </a>
          <h3>MIE 21:00h (GMT-3)</h3>
          <div className={styles.socials}>
            <a
              href="https://twitter.com/circulovicioso8"
              target="_blank"
              rel="noreferrer"
            >
              <button className={styles.twitter}>
                <AiOutlineTwitter />
              </button>
            </a>
            <a
              href="https://cafecito.app/circulovicioso"
              target="_blank"
              rel="noreferrer"
            >
              <button className={styles.cafecito}>
                <FaCoffee />
              </button>
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
