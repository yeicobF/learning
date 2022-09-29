// No necesitamos los estilos porque utilizaremos los de NextUI mediante su
// provider.
//
import "../styles/globals.css"

import Head from "next/head"
import { NextUIProvider } from "@nextui-org/react"
import { I18nProvider, useI18n } from "context/i18n"

const DefaultHeadApp = () => {
  // Aquí funciona el context porque estará dentro del Provider.
  const { t } = useI18n()

  return (
    <Head>
      <title>{t("SEO_DEFAULT_TITLE")}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      {/*
          Elementos default de la cabecera (head).
          Si tenemos el ícono de la página en un sitio, ya no es necesario
          añadirlo en las demás páginas.
        */}
      {/* Solo aquí necesitamos al provider. */}
      <I18nProvider>
        <DefaultHeadApp />
        <Component {...pageProps} />
      </I18nProvider>
    </NextUIProvider>
  )
}

export default MyApp
