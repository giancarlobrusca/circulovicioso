import Head from "next/head";
import Image from "next/image";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaCoffee } from "react-icons/fa";
import styles from "../styles/Home.module.scss";

export default function Home({ past, live }) {
  function getVideoSrc() {
    if (live.length > 0) {
      return `https://www.youtube.com/embed/${live.id.videoId}`;
    } else {
      return `https://www.youtube.com/embed/${
        past[Math.floor(Math.random() * past.length)].id.videoId
      }`;
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Círculo Vicioso Podcast</title>
        <meta name="description" content="Aguante El Círculo papá" />
      </Head>

      <main className={styles.main}>
        <iframe
          width="100%"
          height="100%"
          src={getVideoSrc()}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div>
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
            <h3>Bitcoin, hongos 🍄, monos 🐒 y ranas 🐸.</h3>
            <a
              href="https://www.youtube.com/c/CirculoVicioso8"
              target="_blank"
              rel="noreferrer"
            >
              <button className={styles.youtubebtn}>
                <AiFillYoutube />
              </button>
            </a>
            <h4>MIE 21:00h (GMT-3)</h4>
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
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search?";
const CHANNEL_ID = "UCVvXKi8_WUIO85hCllKhQBg";

export async function getServerSideProps() {
  const resLive = await fetch(
    `${YOUTUBE_SEARCH_API}&type=video&eventType=live&part=snippet&channelId=${CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`,
    {
      type: "get",
    }
  );

  const resPastTranmissions = await fetch(
    `${YOUTUBE_SEARCH_API}&type=video&eventType=completed&maxResults=50&part=snippet&channelId=${CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`,
    {
      type: "get",
    }
  );

  const dataLive = await resLive.json();
  const dataPastTransmissions = await resPastTranmissions.json();

  return {
    props: {
      past: dataPastTransmissions.items,
      live: dataLive.items,
    },
  };
}
