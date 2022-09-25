// No necesitamos los estilos porque utilizaremos los de NextUI mediante su
// provider.
//
// import '../styles/globals.css'

import { NextUIProvider } from "@nextui-org/react"

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
