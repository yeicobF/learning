import { createContext } from "react"
import "../styles/globals.css"

// Aquí sería el mejor lugar para añadir un Context. Si necesitamos acceder a un
// contexto podríamos hacerlo sin problema.
const ThemeContext = createContext("dark")

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContext.Provider value="dark">
      <Component {...pageProps} />
    </ThemeContext.Provider>
  )
}

export default MyApp
