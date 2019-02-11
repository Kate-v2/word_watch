
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
}

function showWord(word) {
  let section       = document.getElementById('topWord')
  section.innerHTML = titlize(word)
}

function showCount(count) {
  let section       = document.getElementById('topWordCount')
  section.innerHTML = `Count: ${count}`
}

function titlize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}


$(document).ready(() => {

  getTopWord()




})
