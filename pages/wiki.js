import Image from "next/image";
import { useState } from "react";
import { getWiki } from "../lib/api";
import styles from "../styles/wiki.module.scss";

function ArticleForm({ onClose }) {
  return (
    <>
      <div className={styles.dialogBackground} onClick={onClose} />
      <div className={styles.dialog}>
        <h2>Proponé un nuevo artículo</h2>
        <form>
          <div>
            <input name="title" type="text" placeholder="Título" />
            <textarea name="title" type="text" placeholder="Contenido" />
          </div>
          <button type="submit">Proponer</button>
        </form>
      </div>
    </>
  );
}

export default function Wiki({ wiki }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const filteredResults = search
    ? wiki.filter((article) => article.title.toLowerCase().includes(search))
    : wiki;

  return (
    <>
      <main className={styles.main}>
        <section>
          <div>
            <input
              className={styles.searchBar}
              type="text"
              placeholder="Buscar artículo"
              onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
              {filteredResults.map((article) => (
                <li onClick={() => setSelected(article)} key={article.title}>
                  {article.title}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => setShowDialog(true)}>
            Contribuí a la Wiki
          </button>
        </section>
        <article>
          <h1 style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Image
              width={100}
              height={100}
              src="/circulo400x400.jpeg"
              alt="Circulo logo"
            />
            La Wiki oficial del Círculo
          </h1>
          {selected && (
            <>
              <h2>{selected.title}</h2>
              {selected.content.map((block) => (
                <p key={block.children[0].text}>{block.children[0].text}</p>
              ))}
            </>
          )}
        </article>
      </main>
      {showDialog && <ArticleForm onClose={() => setShowDialog(false)} />}
    </>
  );
}

export async function getServerSideProps() {
  const wiki = await getWiki();

  return {
    props: {
      wiki,
    },
    // revalidate: 1,
  };
}
