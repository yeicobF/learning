import { useRouter } from "next/router"
import { createContext, useCallback, useContext } from "react"

/* 
Hay técnicas para evitar cargar todas las traducciones en una aplicación grande.
- Imports dinámicos y cosas así.

En aplicaciones pequeñas no vale tanto la pena porque solo es complicar más el
código.
*/
import es from "../translations/es.json"
import en from "../translations/en.json"

const languages = { es, en }
const I18nContext = createContext()

export function I18nProvider({ children }) {
  const { locale } = useRouter()

  // Utilizamos un useCallback para que el valor solo cambie cuando cambie el
  // locale. Este es un buen caso de uso del useCallback.
  //
  // `useCallback` will return a memoized version of the callback that only
  // changes if one of the inputs has changed.
  const t = useCallback(
    (key, ...args) => {
      // Con los argumentos que nos pasan, podemos hacer interpolaciones y
      // manejar variables.
      let translation = languages[locale][key]

      if (args.length === 0) return translation

      args.forEach((value, index) => {
        translation = translation.replace(`\${${index + 1}}`, value)
        console.log("🚀 ~ file: i18n.js ~ line 35 ~ args.forEach ~ translation", translation)
      })

      return translation
    },
    [locale],
  )

  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>
}

// Esta no es la mejor práctica.
/* export function useI18n() {
  const { t } = useContext(I18nContext)
  return t
} */

// Custom Hook que nos permitirá utilizar la traducción. Este solo es un hook
// para consumir.
//
// Mejor práctica recomendada por **Kent C. Dodds**.
// https://kentcdodds.com/blog/how-to-use-react-context-effectively
export function useI18n() {
  const context = useContext(I18nContext)

  // Recuperamos el contexto, pero si no existe, lanzamos un error. Devuelve el
  // error si no estamos utilizando el provider en la app.
  //
  // Evitamos problemas, como que alguien utilice el contexto sin haberlo creado
  // y que dé un error que el desarrollador no sepa por qué sucede.
  if (context === undefined) {
    // Es un error más verboso y te da una instrucción de lo que tienes que
    // hacer.
    throw new Error("useI18n must be used within a I18nProvider")
  }

  return context
}
