// No necesitamos los estilos porque utilizaremos los de NextUI mediante su
// provider.
//
import "../styles/globals.css"

import { NextUIProvider } from "@nextui-org/react"
import Head from "next/head"
import { I18nProvider } from "context/i18n"

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
      <I18nProvider>
        <Component {...pageProps} />
      </I18nProvider>
    </NextUIProvider>
  )
}

export default MyApp
