const myWebAddress = "faztweb.com"
const myNumber = 30
const myArray = [10, 20, 30]
const user = {
  name: "Ryan",
  lastName: "Ray",
}

/* const group = {
  myWebAddress,
  myNumber,
  myArray,
  user,
}
module.exports = group */

// Exportar propiedades individuales. Aquí no podemos utilizar la sintaxis del
// objeto como "module.exports.user => module.exports = { user }"
/* module.exports.user = user
module.exports.number = myNumber */

// Exportar con un objeto.
module.exports = {
  myWebAddress,
  myNumber,
  myArray,
  user,
}

// console.log(module)
