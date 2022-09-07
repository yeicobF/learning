// Mostrar log cada 2 segundos.
setInterval(() => {
  console.log("Interval: Hello, world")
}, 2000)

// Ejecutar código después de 3 segundos. No se sigue ejecutando.
setTimeout(() => {
  console.log("Timeout: Hello, world")
}, 3000)
