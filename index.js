import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL:
    "https://playground-66a24-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {
  if (inputFieldEl.value === "") return

  let inputValue = inputFieldEl.value
  push(shoppingListInDB, inputValue)
  clearInputField()
})

onValue(shoppingListInDB, function (snapshot) {
  let shoppingListArray = Object.values(snapshot.val())
  clearShoppingListEl()
  for (let i = 0; i < shoppingListArray.length; i++) {
    appendItemToShoppingListEl(shoppingListArray[i])
  }
})

function appendItemToShoppingListEl(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}

function clearInputField() {
  inputFieldEl.value = ""
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = ""
}
