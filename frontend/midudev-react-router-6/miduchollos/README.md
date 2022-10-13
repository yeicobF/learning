# Tutorial de React Router 6 - Midudev

## Ranking Routes

> Minuto 52:00 aproximadamente

Routes solo puede entrar a una de las rutas que tengamos definidas en el
componente. Anteriormente existía `Switch`, pero ya no. Switch miraba las rutas
de arriba a abajo (de acuerdo a cómo las definimos), pero `Routes` no mirará de
arriba a abajo. Ahora utiliza otro algoritmo que detectará cuál ruta es más
importante que otra.

Esto es útil porque podríamos tener colisiones en los paths. Independientemente
del orden que tengan los paths, volverá a entrar a la ruta correcta. Aunque
podría entrar por orden de definición, no es así. El orden ya no tiene
relevancia en las rutas, sino que es una cuestión del algoritmo. **Es algo así
como con la especifidad en CSS.**

> [Ranking Routes](https://reactrouter.com/en/v6.3.0/getting-started/concepts)

## Index Routes

Tenemos la posibilidad de que haya una Index Route. Como un Nested Route, pero
para el índice. No se le pondría path, sino index.
