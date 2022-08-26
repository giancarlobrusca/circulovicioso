import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaDiscord, FaTiktok } from "react-icons/fa";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Círculo Vicioso Podcast | Bitcoin, hongos, monos y ranas</title>
        <meta
          name="description"
          content="Un podcast conducido por Pablo Wasserman y Juan Ruocco."
          key="desc"
        />
        <meta property="og:title" content="La web oficial de Círculo Vicioso" />
        <meta
          property="og:description"
          content="En vivo los miércoles a las 21:00hs (GMT-3)"
        />
        <meta
          property="og:image"
          content="https://pbs.twimg.com/profile_banners/1247663322507468800/1591299379/1500x500"
        />
      </Head>

      <header>
        <div className={styles.logo}>
          <Image
            width={50}
            height={50}
            src="/circulo400x400.jpeg"
            alt="Circulo logo"
          />
          <h1>Círculo Vicioso Club</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/wiki">
                <a>Wiki</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles["iframe-wrapper"]}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/videoseries?list=UUVvXKi8_WUIO85hCllKhQBg"
            title="Círculo Vicioso Podcast"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div>
          <Image
            width={150}
            height={150}
            src="/circulo400x400.jpeg"
            alt="Circulo logo"
          />
          <section>
            <h1>Círculo Vicioso</h1>
            <h2>
              Un podcast conducido por <br />
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
            <h3>Bitcoin, hongos 🍄, monos 🐒 y ranas 🐸.</h3>
            <h4>MIE 21:00h (GMT-3)</h4>
            <div className={styles.socials}>
              <a
                href="https://www.youtube.com/c/CirculoVicioso8"
                target="_blank"
                rel="noreferrer"
              >
                <button className={styles.youtube}>
                  <AiFillYoutube />
                </button>
              </a>
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
                href="https://www.tiktok.com/@circulovicioso"
                target="_blank"
                rel="noreferrer"
              >
                <button className={styles.tiktok}>
                  <FaTiktok />
                </button>
              </a>
              <a
                href="https://discord.com/invite/G8UPtprX2m"
                target="_blank"
                rel="noreferrer"
              >
                <button className={styles.discord}>
                  <FaDiscord />
                </button>
              </a>
              <a
                href="https://www.instagram.com/circuloviciosoclub/"
                target="_blank"
                rel="noreferrer"
              >
                <button className={styles.instagram}>
                  <AiFillInstagram />
                </button>
              </a>
            </div>
            <iframe
              src="https://discord.com/widget?id=723382943233474673&theme=dark"
              width="250"
              height="300"
              allowtransparency="true"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            />
          </section>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

// const YOUTUBE_SEARCH_API = "https://youtube.googleapis.com/youtube/v3/search";
// const CHANNEL_ID = "UCVvXKi8_WUIO85hCllKhQBg";
