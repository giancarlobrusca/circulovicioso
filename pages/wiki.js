import "@uiw/react-md-editor/markdown-editor.css";
import styles from "../styles/wiki.module.scss";

import Image from "next/image";
import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";

import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { getWiki } from "../lib/api";
import { MDXRemote } from "next-mdx-remote";
import { useMediaQuery } from "../hooks/useMediaQuery";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const EDIT = "edit";
const PREVIEW = "preview";

const IDLE = "idle";
const WAITING = "waiting";
const SUCCESS = "success";
const ERROR = "error";

function ArticleForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mode, setMode] = useState(EDIT);
  const [status, setStatus] = useState(IDLE);

  async function handleFormSubmit(title, content) {
    if (!title || !content) {
      setStatus(ERROR);
      return;
    }

    const data = {
      title,
      content,
      status: "draft",
    };

    try {
      setStatus(WAITING);
      const res = await fetch("/api/request-article", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonResponse = await res.json();

      if (jsonResponse.status === "success") {
        setStatus(SUCCESS);
        emailjs.send(
          "my_gmail",
          "cvwikinotification",
          { title },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY
        );
      }
    } catch (e) {
      console.error(e);
      console.error(e.text);
      setStatus(ERROR);
    }
  }

  useEffect(() => {
    if (status === SUCCESS) {
      setTitle("");
      setContent("");
    }
  }, [status]);

  return (
    <>
      <div className={styles.dialogBackground} onClick={onClose} />
      <div className={styles.dialog}>
        <h2>Proponé un nuevo artículo</h2>
        <section>
          <div>
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: "-10px",
                fontSize: 13,
              }}
            >
              <button
                className={styles["md-btn"]}
                onClick={() => setMode(EDIT)}
                style={{
                  color: mode === EDIT ? "white" : "inherit",
                  backgroundColor: mode === EDIT ? "rgb(251, 37, 112)" : "#ddd",
                }}
              >
                Write
              </button>
              <button
                className={styles["md-btn"]}
                onClick={() => setMode(PREVIEW)}
                style={{
                  color: mode === PREVIEW ? "white" : "inherit",
                  backgroundColor:
                    mode === PREVIEW ? "rgb(251, 37, 112)" : "#ddd",
                }}
              >
                Preview
              </button>
              Este editor de texto usa
              <a
                style={{ color: "rgb(251,37,112)" }}
                href="https://www.markdownguide.org/basic-syntax"
                target="_blank"
                rel="noreferrer"
              >
                las reglas de formato Markdown
              </a>
              (acepta links, imágenes -via link-, títulos, listas, negrita,
              cursiva, etc)
            </div>
            <MDEditor
              hideToolbar
              height={400}
              style={{ border: "1px solid #ccc" }}
              preview={mode}
              value={content}
              onChange={setContent}
            />
          </div>
          {status === ERROR &&
            "Tenés que completar ambos campos para proponer un artículo."}
          {status === WAITING && "Ta laburando la maquinita..."}
          {status === SUCCESS &&
            "Gracias por contribuir al lore del Club, gordo."}
          <button
            className={styles["submit-btn"]}
            onClick={() => handleFormSubmit(title, content)}
          >
            Proponer
          </button>
        </section>
      </div>
    </>
  );
}

export default function Wiki({ wiki }) {
  const isMobileWide = useMediaQuery("(max-width: 400px)");

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
            <ul
              style={{
                height: isMobileWide ? "auto" : "76vh",
                overflow: "auto",
                border: "1px solid #ccc",
              }}
            >
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
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 20,
              margin: 0,
              marginBottom: isMobileWide && 50,
            }}
          >
            <Image
              width={50}
              height={50}
              src="/circulo400x400.jpeg"
              alt="Circulo logo"
            />
            La wiki oficial de Círculo Vicioso
          </h1>
          {selected && (
            <>
              <h2>{selected.title}</h2>
              <MDXRemote {...selected.content} />
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

  const mappedWiki = await Promise.all(
    wiki.map(async (item) => {
      const content = await serialize(item.content);
      return {
        title: item.title,
        imgurl: item.imgurl,
        content,
      };
    })
  );

  return {
    props: {
      wiki: mappedWiki,
    },
  };
}
