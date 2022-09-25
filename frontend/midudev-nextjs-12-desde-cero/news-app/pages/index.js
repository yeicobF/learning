import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import styles from "../styles/Home.module.css";

// https://newsapi.org/register/success - 25/SEP/2022
const API_KEY = "ceec4cbd59bb46d2b7557f264692bb7c";

export default function Home() {
  // const router = useRouter();
  const [articles, setArticles] = useState([]);

  // Fetch en el cliente.
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2022-08-25&sortBy=publishedAt&apiKey=ceec4cbd59bb46d2b7557f264692bb7c",
    )
      .then((res) => res.json())
      .then((response) => {
        const { articles } = response;
        setArticles(articles);
      });
  });

  return (
    <PageLayout title="NewsApp - Home">
      <div className={styles.container}>
        {articles.length === 0 && <p>Loading...</p>}
        {articles.length > 0 &&
          articles.map((article, index) => (
            <article key={index}>
              <Link href={article.url} style={{ cursor: "pointer" }}>
                <img
                  src={article.urlToImage}
                  alt={`Image for the article ${article.title}`}
                />
              </Link>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </article>
          ))}

        {/* <h1>Aprendiendo Next.js desde cero</h1>
        <Link href="/about">Ir a about</Link> */}
        {/* 
        No hacer esto. La navegación programática puede tener sentido en un 
        formulario. 
      */}
        {/* <button onClick={() => router.push("/article/2")}>
          Navegar de forma programática a un artículo
        </button> */}
      </div>
    </PageLayout>
  );
}
