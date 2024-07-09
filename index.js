import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
  if (!snapshot.exists()) {
    shoppingListEl.innerHTML = "Man ska inte handla när man är hungrig!"
  } else {
    let shoppingListArray = Object.entries(snapshot.val())

    clearShoppingListEl()
    for (let i = 0; i < shoppingListArray.length; i++) {
      let currentItem = shoppingListArray[i]
      let currentItemId = currentItem[0]
      let currentItemValue = currentItem[1]
      appendItemToShoppingListEl(currentItem)
    }
  }
})

function clearInputField() {
  inputFieldEl.value = ""
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = ""
}

function appendItemToShoppingListEl(item) {
  // shoppingListEl.innerHTML += `<li>${item}</li>`
  let itemID = item[0]
  let itemValue = item[1]
  let newEl = document.createElement("li")
  newEl.textContent = itemValue
  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLocationOfItemInDB)
  })
  shoppingListEl.append(newEl)
}
