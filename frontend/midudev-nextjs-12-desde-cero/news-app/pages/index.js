import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PageLayout from "../components/PageLayout"
import styles from "../styles/Home.module.css"

// https://newsapi.org/register/success - 25/SEP/2022
//
// Con server side rendering podríamos proteger la API_KEY, ya que la petición
// hace en el servidor y no en el cliente. Pero en este caso no es necesario.
const API_KEY = "ceec4cbd59bb46d2b7557f264692bb7c"

// Los props llegan como cadena al cliente, ya que fueron obtenidas desde el
// servidor.
//
// De esta forma, en el servidor renderiza la aplicación y en el cliente la
// hidrata. En el server es un string estático (sin efectos, eventos, ...) y en
// el cliente se le da vida con Hydration.
export default function Home({ articles }) {
  /* const [articles, setArticles] = useState([]);

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
  }); */

  return (
    <PageLayout title="NewsApp - Home">
      <div className={styles.container}>
        {/* No ocupamos el Loading porque si no hay artículos es porque no 
        llegaron del servidor. */}
        {articles.length === 0 && <p>No tenemos artículos</p>}
        {articles.length > 0 &&
          articles.map((article, index) => (
            <div key={index}>
              <Link href={article.url} style={{ cursor: "pointer" }} width="">
                <a>
                  {/*
                   * Image le añade optimizaciones. Incluso añade spans para
                   * reservar el espacio en la página y evitar el
                   * Cumulative Layout Shift (CLS). Crea diferentes imágenes
                   * dependiendo del tamaño del viewport.
                   *
                   * Tiene Lazy Loading por defecto.
                   */}
                  <Image
                    src={article.urlToImage}
                    alt={`Image for the article ${article.title}`}
                    width={450}
                    height={300}
                    quality={50}
                    layout="responsive"
                    // Así podemos dar una condición para que ciertas imágenes
                    // sean prioritarias.
                    //
                    // No hay que hacer que todo sea prioritario. Incurriría en
                    // el performance.
                    priority={index < 2}
                    // Un blur para mostrar una imagen como placeholder, pero
                    // funciona con una imagen estática indicando la propiedad
                    // "blurDataURL"
                    placeholder="blur"
                    // No tiene sentido poner la misma imagen como placeholder,
                    // ya que solo se aplica cuando la imagen no ha cargado.
                    blurDataURL={article.urlToImage}
                  />
                </a>
              </Link>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
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
  )
}

/**
 * N requests -> se ejecuta 1 vez en build time (o para refrescar la página)
 *
 * Pre-renderiza la página entera con la información que se obtiene aquí.
 *
 * En desarrollo no se ven mucho las diferencias. Se notan más cuando se hace un
 * build.
 */
export async function getStaticProps() {
  const pageSize = 5
  const response = await fetch(
    `https://newsapi.org/v2/everything?domains=wsj.com&pageSize=${pageSize}&apiKey=ceec4cbd59bb46d2b7557f264692bb7c`,
  )
  const { articles } = await response.json()

  // Regresamos las props con los elementos que queremos enviar al cliente.
  return {
    props: {
      articles,
    },
  }
}

// N request -> se ejecuta n veces
// - Para datos que necesitas que sean MUY live.
// - Tiene demasiados datos dinámicos.
//
// A veces se ejecuta desde el cliente y así podemos acceder al prop `context`.
//
// Cuando llegamos a esta página desde otra, se recupera el json con la
// información que se necesitaba. Solo se llama cuando se ocupa, ya sea desde el
// servidor o el cliente. Se descargará, por eso sale en la red.
//
// Hacer un fetch desde el server como string siempre será más rápido que en el
// cliente. No necesitamos un estado.
//
// Recuperamos artículos desde el server (fetch desde el server) para
// renderizarla en el servidor y cuando el usuario entre, ya tendremos
// artículos. No necesitamos Loading en el cliente, solo indicar que no hay
// artículos.
//
// ! Se ejecuta en cada request.
/* export async function getServerSideProps() {
  const response = await fetch(
    "https://newsapi.org/v2/everything?q=tesla&from=2022-08-25&sortBy=publishedAt&apiKey=ceec4cbd59bb46d2b7557f264692bb7c",
  );
  const { articles } = await response.json();

  // Regresamos las props con los elementos que queremos enviar al cliente.
  return {
    props: {
      articles,
    },
  };
} */
