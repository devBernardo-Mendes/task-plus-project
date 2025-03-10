import Head from "next/head";
import styles from "../styles/home.module.css";
import Image from "next/image";
import heroImg from "../assets/hero.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefas + | Organize suas tarefas de forma fácil</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="logo Taregas + "
            src={heroImg}
            priority={true}
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para você organizar <br />
          seus estudos e terefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+12post</span>
          </section>
          <section className={styles.box}>
            <span>+90 comentarios</span>
          </section>
        </div>
      </main>
    </div>
  );
}
