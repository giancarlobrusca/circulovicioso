import styles from "./article-form.module.scss";

import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const EDIT = "edit";
const PREVIEW = "preview";

const IDLE = "idle";
const WAITING = "waiting";
const SUCCESS = "success";
const ERROR = "error";

export default function ArticleForm({
  onClose,
  isEditing,
  currentTitle,
  currentContent,
  articleID,
}) {
  const router = useRouter();

  const [title, setTitle] = useState(isEditing ? currentTitle : "");
  const [content, setContent] = useState(isEditing ? currentContent : "");
  const [mode, setMode] = useState(EDIT);
  const [status, setStatus] = useState(IDLE);

  async function handleFormSubmit(title, content, edition) {
    if (!title || !content) {
      setStatus(ERROR);
      return;
    }

    const data = {
      title,
      content,
      status: "draft",
    };

    const editingData = {
      _id: articleID,
      set: {
        content: content,
      },
    };

    try {
      setStatus(WAITING);
      const apiEndpoint = edition ? "patch-article" : "request-article";
      const res = await fetch(`/api/${apiEndpoint}`, {
        method: edition ? "PATCH" : "POST",
        body: JSON.stringify(edition ? editingData : data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonResponse = await res.json();

      if (jsonResponse.status === "success") {
        setStatus(SUCCESS);
        !edition &&
          emailjs.send(
            "my_gmail",
            "cvwikinotification",
            { title },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY
          );
      }

      router.reload(window.location.pathname);
    } catch (e) {
      console.error(e);
      console.error(e.text);
      setStatus(ERROR);
    }
  }

  useEffect(() => {
    if (status === SUCCESS && !isEditing) {
      setTitle("");
      setContent("");
    }
  }, [status, isEditing]);

  return (
    <>
      <div className={styles.dialogBackground} onClick={onClose} />
      <div className={styles.dialog}>
        {isEditing ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <MdEdit style={{ color: "rgb(251, 37, 112)" }} /> <h3>{title}</h3>
          </div>
        ) : (
          <h3>Proponé un nuevo artículo</h3>
        )}
        <section>
          <div>
            {!isEditing && (
              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            )}
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
            onClick={() => handleFormSubmit(title, content, isEditing)}
          >
            {isEditing ? "Editar" : "Proponer"}
          </button>
        </section>
      </div>
    </>
  );
}
