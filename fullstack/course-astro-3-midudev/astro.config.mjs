import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  // Activar Server Side Rendering (SSR). Podemos tener varios output. Por
  // ejemplo, para cuando queremos tener partes estáticas y dinámicas. Podemos
  // indicarlo por cada una de las páginas. Por página, podemos utilizar `const
  // prerender = false` para que la página funcione en el servidor. Necesitará
  // un servidor para funcionar.
  //
  // Puedes utilizar diferentes adaptadores, tales como Vercel o Netlify.
  output: "hybrid"
});