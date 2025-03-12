import Head from "next/head";
import styles from "./styles.module.css";
import { GetServerSideProps } from "next";
import { db } from "../../services/firebaseConection";
import {
  addDoc,
  collection,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { TextArea } from "@/components/textArea";

export interface ITaskDetailsProps {
  item: {
    task: string;
    created: string;
    publicTask: boolean;
    user: string;
    taskId: string;
  };
}

export default function Task({ item }: ITaskDetailsProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Detalhes da Tarefa</title>
      </Head>

      <main className={styles.main}>
        <h1>Tarefa</h1>

        <article className={styles.task}>
          <p>{item.task}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixar Comentário</h2>
        <form>
          <TextArea placeholder="Digite seu cometário..." />
          <button type="submit" className={styles.button}>
            Enviar comentário
          </button>
        </form>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = await doc(db, "tarefas", id);

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  console.log(snapshot.data());

  if (!snapshot.data()?.publicTask) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const miliSeconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    task: snapshot.data()?.task,
    publicTask: snapshot.data()?.publicTask,
    created: new Date(miliSeconds).toISOString(),
    user: snapshot.data()?.user,
    taskId: id,
  };

  return {
    props: { item: task },
  };
};
