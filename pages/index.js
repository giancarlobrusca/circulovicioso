import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { Suspense } from "react";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import styles from "../styles/Home.module.scss";

const Bunny = dynamic(() => import("../components/bunny"), {
  ssr: false,
});

export default function Home({ past, live }) {
  function getVideoSrc() {
    // if (live.length > 0) {
    //   return `https://www.youtube.com/embed/${live[0].id.videoId}`;
    // } else {
    //   return `https://www.youtube.com/embed/${
    //     past[Math.floor(Math.random() * past.length)].id.videoId
    //   }`;
    // }

    return "https://www.youtube.com/embed/WeDuytZKCSY";
  }

  return (
    <>
      <div style={{ backgroundColor: "black", height: 1000 }}>
        <Suspense fallback="Loading...">
          <Bunny />
        </Suspense>
      </div>
      <div className={styles.container}>
        <Head>
          <title>
            Círculo Vicioso Podcast | Bitcoin, hongos, monos y ranas
          </title>
          <meta
            name="description"
            content="Un podcast conducido por Pablo Wasserman y Juan Ruocco."
            key="desc"
          />
          <meta
            property="og:title"
            content="La web oficial de Círculo Vicioso"
          />
          <meta
            property="og:description"
            content="En vivo los miércoles a las 21:00hs (GMT-3)"
          />
          <meta
            property="og:image"
            content="https://pbs.twimg.com/profile_banners/1247663322507468800/1591299379/1500x500"
          />
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
              Un podcast conducido por <br />
              <h2>
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
                  href="https://www.tiktok.com/@circulovicioso"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className={styles.tiktok}>
                    <FaTiktok />
                  </button>
                </a>
              </div>
            </section>
          </div>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}

const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search?";
const CHANNEL_ID = "UCVvXKi8_WUIO85hCllKhQBg";

// export async function getStaticProps() {
//   const resLive = await fetch(
//     `${YOUTUBE_SEARCH_API}&type=video&eventType=live&channelId=${CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
//   );

//   const resPastTranmissions = await fetch(
//     `${YOUTUBE_SEARCH_API}&type=video&eventType=completed&maxResults=50&channelId=${CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
//   );

//   const dataLive = await resLive.json();
//   const dataPastTransmissions = await resPastTranmissions?.json();

//   return {
//     props: {
//       past: dataPastTransmissions.items,
//       live: dataLive.items,
//     },
//   };
// }
