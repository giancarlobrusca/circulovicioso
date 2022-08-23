import { PortableTextEditor } from "@sanity/portable-text-editor";
import Image from "next/image";
import { useState } from "react";
import PortableText from "react-portable-text";
import { getWiki } from "../lib/api";
import styles from "../styles/wiki.module.scss";

async function handleFormSubmit(event) {
  event.preventDefault();

  console.log("value", event.target.content.value);

  const paragraphs = event.target.content.value.split("\n");

  console.log({ paragraphs });

  const block = paragraphs.map((p) => ({
    type: "block",
    p,
  }));

  const data = {
    title: event.target.title.value,
    imgurl: event.target.image.value,
    content: block,
  };

  try {
    const res = await fetch("/api/request-article", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await res.json();

    console.log(jsonResponse);
  } catch (e) {
    console.error(e);
  }
}

function ArticleForm({ onClose }) {
  return (
    <>
      <div className={styles.dialogBackground} onClick={onClose} />
      <div className={styles.dialog}>
        <h2>Proponé un nuevo artículo</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <input name="title" type="text" placeholder="Título" />
            <input name="image" type="text" placeholder="URL de la portada" />
            {/* <textarea
              rows={4}
              name="content"
              type="text"
              placeholder="Contenido"
            /> */}
            <PortableTextEditor />
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
              {/* {selected.content.map((block) => (
                <p key={block.children[0].text}>{block.children[0].text}</p>
              ))} */}
              <PortableText content={selected.content} />
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
