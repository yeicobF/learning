/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imgs.xkcd.com"],
  },
  /* 
  Con la internacionalización creará rutas dependiendo del idioma de varias
  formas.

  - Forma 1 - por defecto
    - "/comic/123" -> 'default (en)'
    - "/es/comic/123" -> 'es'
  - Forma 2
    - "es.xkcd.com"

  Los encabezados "Accept-Language" al entrar al sitio web son los que tomará
  para poner el sitio web en ese idioma, a menos que pongamos false la opción
  "localeDetection".
  */
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig
