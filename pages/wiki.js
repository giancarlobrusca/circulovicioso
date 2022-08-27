import "@uiw/react-md-editor/markdown-editor.css";
import styles from "../styles/wiki.module.scss";

import Image from "next/image";
import ArticleForm from "../components/ArticleForm/ArticleForm";

import { useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MdEdit } from "react-icons/md";
import { getWiki } from "../lib/api";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function Wiki({ wiki }) {
  const isMobileWide = useMediaQuery("(max-width: 400px)");

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const filteredResults = search
    ? wiki.filter((article) => article.title.toLowerCase().includes(search))
    : wiki;

  function handleEditForm() {
    setIsEditing(true);
    setShowDialog(true);
  }

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
          {!isMobileWide && (
            <button onClick={() => setShowDialog(true)}>
              Contribuí a la Wiki
            </button>
          )}
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
              {!isMobileWide && (
                <button onClick={() => handleEditForm(selected)}>
                  <MdEdit /> Editar entrada
                </button>
              )}
            </>
          )}
        </article>
      </main>
      {showDialog && isEditing && (
        <ArticleForm
          isEditing
          currentTitle={selected.title}
          currentContent={selected.rawContent}
          articleID={selected.id}
          onClose={() => {
            setShowDialog(false);
            setIsEditing(false);
          }}
        />
      )}
      {showDialog && !isEditing && (
        <ArticleForm onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}

export async function getServerSideProps() {
  const wiki = await getWiki();

  const mappedWiki = await Promise.all(
    wiki.map(async (item) => {
      const content = await serialize(item.content);
      return {
        id: item._id,
        title: item.title,
        imgurl: item.imgurl,
        rawContent: item.content,
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
