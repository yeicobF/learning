# Internacionalización

Midu recomienda que desacoplemos las traducciones de las secciones de la página.
Así traducimos menos y podemos reutilizar las traducciones en otras páginas.

En lugar de `HOME_TITLE`, tener `LATEST_COMICS` y así desacoplamos la traducción
y utilizamos en otros lugares.

## Malas prácticas

Hay prácticas que no son correctas, tal como concatenar una string de traducción
y variables. Para esto, hay que incluir parámetros en la traducción que al
recibir en la función de traducción, interpolaremos.

Si concatenamos, no podemos reutilizar la traducción en otros lugares. Una
sintaxis puede ser de una manera en algunos lenguajes y de otra en otros. Si
concatenamos en lugar de interpolar, tendremos que implementar formas diferentes
para los múltiples idiomas, pero fuera de las llaves de traducción de nuestros
archivos.

```json
{
  "LATEST_COMICS": "Últimos comics",
  "SEO_DEFAULT_TITLE": "xkcd - Comics para desarrolladores",
  "SEARCH_RESULTS_TITLE": "${1} resultados para ${2}",
  "SEARCH_RESULTS_MAL": "results for"
}
```

```js
// castellano, inglés
;`${results.length} ${t(
  "SEARCH_RESULTS_MAL",
)} ${query}` // alemán
`${query} ${t("SEARCH_RESULTS_MAL")} ${results.length}`
```
