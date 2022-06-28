import { useState } from "react";
import { getWiki } from "../lib/api";
import styles from "../styles/wiki.module.scss";

export default function Wiki({ wiki }) {
  const [selected, setSelected] = useState(null);

  return (
    <main className={styles.main}>
      <section>
        <ul>
          {wiki.map((article) => (
            <li onClick={() => setSelected(article)} key={article.title}>
              {article.title}
            </li>
          ))}
        </ul>
      </section>
      <article>
        {selected && (
          <>
            <h2>{selected.title}</h2>
            {selected.bio.map((block) => (
              <p key={block.children[0].text}>{block.children[0].text}</p>
            ))}
          </>
        )}
      </article>
    </main>
  );
}

export async function getServerSideProps() {
  const wiki = await getWiki();

  return {
    props: {
      wiki,
    },
  };
}
