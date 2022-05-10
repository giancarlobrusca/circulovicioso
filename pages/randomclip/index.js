import Head from "next/head";
import React from "react";
import styles from "./clips.module.scss";

export default function RandomClip({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Círculo Vicioso Podcast</title>
        <meta name="description" content="Aguante El Círculo papá" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.h1}>
          Tu <i>randomClip</i> del Círculo:
        </h1>
        <iframe
          width="900"
          height="700"
          src={`https://www.youtube.com/embed/${
            data[Math.floor(Math.random() * data.length)].id.videoId
          }`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search?";
const CHANNEL_ID = "UC8yfD9EM8OH_H3HsnR0Szrw";

export async function getServerSideProps() {
  const res = await fetch(
    `${YOUTUBE_SEARCH_API}&order=date&maxResults=50&part=snippet&channelId=${CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`,
    {
      type: "get",
    }
  );
  const data = await res.json();

  return {
    props: {
      data: data.items,
    },
  };
}
