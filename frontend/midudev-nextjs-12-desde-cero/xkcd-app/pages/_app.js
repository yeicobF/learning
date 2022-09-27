// No necesitamos los estilos porque utilizaremos los de NextUI mediante su
// provider.
//
import "../styles/globals.css"

import { NextUIProvider } from "@nextui-org/react"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      {/* 
        Elementos default de la cabecera (head).
        Si tenemos el ícono de la página en un sitio, ya no es necesario
        añadirlo en las demás páginas.
      */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
