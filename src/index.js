
import $ from 'jquery'



function getTopWord() {
  let url = 'https://wordwatch-api.herokuapp.com/api/v1/top_word'
  fetch(url)
    .then(response => response.json())
    .then(data => showTopWord(data.word))
    .catch(error => console.log(error))
}

function showTopWord(obj) {
  let word = Object.keys(obj)[0]
  let ct   = Object.values(obj)[0]
  showWord(word)
  showCount(ct)
  debugger
}

function showWord(word) {
  let display       = document.createElement('p')
  display.id        = 'topWord'
  display.innerHTML = word
  let section       = document.getElementById('top-word')
  section.appendChild(display)
}



$(document).ready(() => {

  getTopWord()




})
