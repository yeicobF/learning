import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>NewsApp - Home</title>
      </Head>

      <h1>Aprendiendo Next.js desde cero</h1>
      <Link href="/about">Ir a about</Link>

      {/* 
        No hacer esto. La navegación programática puede tener sentido en un 
        formulario. 
      */}
      <button onClick={() => router.push("/article/2")}>
        Navegar de forma programática a un artículo
      </button>
    </div>
  );
}
