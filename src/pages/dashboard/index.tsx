import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import styles from "./styles.module.css";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { TextArea } from "@/components/textArea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { useDashboard } from "./hooks/useDashboard";

interface IProps {
  user: { email: string };
}

export default function Dashboard({ user }: IProps) {
  const {
    input,
    setInput,
    publicTask,
    tasks,
    handleSubmitTask,
    handleChangePublicTask,
  } = useDashboard(user.email);

  return (
    <div className={styles.container}>
      <Head>
        <title>Meu Painel de Tarefas</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}></h1>
            <form onSubmit={handleSubmitTask}>
              <TextArea
                placeholder="Digite qual sua tarefa"
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(event.target.value)
                }
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublicTask}
                />
                <label htmlFor="">Deixar tarefa publica?</label>
              </div>
              <button type="submit" className={styles.button}>
                Registrar
              </button>
            </form>
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>
          {tasks.map((item) => (
            <article key={item.id} className={styles.task}>
              {item.publicTask && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PúblicO</label>
                  <button className={styles.shareButton}>
                    <FiShare2 size={22} color="#3183ff" />
                  </button>
                </div>
              )}
              <div className={styles.taskContent}>
                <p>{item.task}</p>
                <button className={styles.trashButton}>
                  <FaTrash size={24} color="#ea3140" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return {
    props: { user: { email: session?.user?.email } },
  };
};
