# Mejores prácticas para reutilizar lógica en un endpoint (microservicio) y getServerSideProps/getStaticProps

Llamar a la API de Algolia para buscar los resultados. Obtenemos un arreglo con
los JSON de los resultados.

https://nextjs.org/docs/routing/introduction#linking-to-dynamic-paths

No podemos hacer una búsqueda con una ruta relativa.

- Es una mala práctica utilizar rutas absolutas. Si utilizamos una ruta absoluta
  al entorno de desarrollo, no funcionará en producción. Hay formas de detectar
  si estamos en desarrollo o producción, pero no es lo mejor.
- Tampoco está muy bien utilizar `process.env.HOST`. Funciona, pero no es
  correcto.

```js
const results = await fetch(
  `http://localhost:3000/api/search?q=${encodeURIComponent(q)}`,
).then((res) => res.json())
```

## ¿Por qué está mal?

No tiene sentido hacerlo así, porque podríamos extraer la lógica del
microservicio que creamos en Next al otro fichero (podemos dejar el endpoint
porque nos puede interesar tenerlo), pero aún así podría petar si mantenemos el
código.

Cuando Vercel despliega el microservicio, lo hace separado de la aplicación uno
del otro, ya que está en lambdas.

## ¿Qué podría ocurrir?

Podría ocurrir que despleguemos la web y no esté lo otro desplegado aún y por
eso se rompa, ya que no es capaz de encontrarlo. Nos puede pasar con el
`serverSideProps` o el `getStaticProps`.

Si con el getStaticProps intentamos hacer un fetch, entraremos como en un loop
porque si no puede hacer el fetch al microservicio (que aún no existe) no podrá
hacer la build, por lo que no se podrá desplegar el microservicio.

## ¿Qué está bien?

### Servicio externo

Si es un servicio externo (API de terceros), sí podemos obtener el host para
poder hacer la petición. Esto aquí sí estaría bien.

```js
const host = process.env.NEXT_PUBLIC_HOST

const res = await fetch(`${host}/api/search?q=${q}`)
```

## Servicio interno (nuestro microservicio)

Solo está mal si es un servicio nuestro. No tiene sentido que intentemos hacer
el fetch de nuestro propio microservicio.

Una forma para obtener los results, en lugar de las promesas concatenadas y
obtenidas con await.

```js
const response = await fetch(
  `http://localhost:3000/api/search?q=${encodeURIComponent(q)}`,
)
const results = await response.json()
```

No es lo mejor, ya que utilizamos una ruta absoluta al entorno de desarrollo
para llamar a la API. En un momento modificaré la implementación. Voy en el
minuto [05:34:41/08:25:24] del vídeo.

```js
const results = await fetch(
  `http://localhost:3000/api/search?q=${encodeURIComponent(q)}`,
).then((res) => res.json())
```

## ¿Cómo lo solucionamos?

En lugar de llamar al microservicio "/api/search", desde `getServerSideProps`,
extraemos la lógica en otro archivo
[`services/search.js`](./../../services/search.js) y lo importamos en
`pages/api/search.js` y [`./index.js`](index.js). De esta manera, podemos
reutilizar la misma lógica sin tener que llamar a la API desde la misma
aplicación desde donde desplegamos dicha API.

Llamar a la API desde nuestro proyecto con `fetch` no tiene sentido, ya que se
encuentra en nuestro sistema de archivos. Por otro lado, importar las funciones
de la API desde donde queremos utilizar la funcionalidad nos puede dar
problemas, ya que el sitio web y la API se despliegan de forma desacoplada. Por
lo tanto, si el microservicio aún no se despliega en el build time, el build no
se construirá y esto será cíclico porque ninguno podrá terminar.

Ahora, extrayendo la lógica en otro archivo, podemos importarla desde el
microservicio y la página para reutilizar la lógica que necesitamos en la
sección sin tener los problemas mencionados.
