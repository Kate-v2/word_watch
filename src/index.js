
import $ from 'jquery'



function getTopWord() {
  let url = 'https://wordwatch-api.herokuapp.com/api/v1/top_word'
  debugger
  fetch(url)
    .then(response => response.json())
    .then(data => showTopWord(data.word))
    .catch(error => console.log(error))
}

function showTopWord(obj) {
  debugger
}



$(document).ready(() => {

  getTopWord()




})
