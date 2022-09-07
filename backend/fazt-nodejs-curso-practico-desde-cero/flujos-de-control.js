const age = 30

if (age >= 18) {
  console.log("You are an adult")
} else if (age >= 13) {
  console.log("You are a teenager")
} else {
  console.log("You are a child")
}

const names = ["joe", "john", "maria"]

for (let i = 0; i < names.length; i++) {
  console.log(names[i])
}

const showUserInfo = (userName, userAge) =>
  `The username is ${userName}, the user is ${userAge} years old`

console.log(showUserInfo("jacob", 25))
console.log(showUserInfo("Maria", 50))
