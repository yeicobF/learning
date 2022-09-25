/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Añadimos el hostname para poder obtener imágenes de ahí desde el server.
    domains: [
      "img.ilcdn.fi",
      "bt.bmcdn.dk",
      "bsmedia.business-standard.com",
      "img.phonandroid.com",
      "images0.persgroep.net",
      "pcdn.hu",
      "img.nzz.ch",
      "images.wsj.net",
    ],
  },
}

module.exports = nextConfig
