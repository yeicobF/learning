# Scraper de comics [xkcd](https://xkcd.com/)

Este proyecto es un scraper de comics de [xkcd](https://xkcd.com/). El objetivo
es obtener los comics de xkcd y guardarlos en un directorio local para
mostrarlos en la página web.

El objetivo es aprender y hacer un proyecto con Next.js. Además, utilizamos
Node.js.

Para obtener los archivos con la información de cada comic, hay que utilizar la
URL (https://xkcd.com/**numero-de-comic**/info.0.json). Así es como descargamos
los archivos para tener los estáticos.

> Iniciado: 25/SEP/2022

## Curso

El curso que seguí para hacer este proyecto es:
[CURSO de NEXT.JS 12 desde CERO y con dos proyectos prácticos](https://youtu.be/pFT8wD2uRSE).
La sección en que trabaja este proyecto comienza en el minuto **_01:50:00_**.

## Bibliotecas

- [fs-extra](https://www.npmjs.com/package/fs-extra) - File system, reemplazo de
  `fs` (nativo de Node) con promesas. Además, tiene las funciones `readJson` y
  `writeJson` para leer y escribir archivos JSON.
- [axios](https://www.npmjs.com/package/axios) - Cliente HTTP para el navegador
  y Node.js que nos permite hacer peticiones a servidores. En este caso, la
  utilizaremos para hacer las peticiones a la API de **xkcd**.

## Conceptos

- **Top level await:** Utilizaremos ES Modules en lugar de CommonJS. Esto nos
  permite utilizar top level await. En lugar de utilizar `require` y
  `module.exports`, utilizaremos `import` y `export default`. Además, podemos
  utilizar `await` en el nivel superior del archivo. Esto nos permite hacer
  llamadas asíncronas sin necesidad de utilizar `async` y `await` en una
  función.
