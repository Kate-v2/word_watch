
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
  section.innerHTML = ''
  section.innerHTML = titlize(word)
}

function showCount(count) {
  let section       = document.getElementById('topWordCount')
  section.innerHTML = ''
  section.innerHTML = `Count: ${count}`
}

function titlize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function addWordsSubmission() {
  let button     = document.getElementById('addWords')
  button.onclick = function() { postWords() }
}

function postWords() {
  let words = getWords()
  for (let i=0; i < words.length; i++) {
    // TO DO - add letter validation
    // if not letter, send word into an array
    // print the array to user as words not added.
    // - OR - If word had non-letter, remove it and post word?
    postWord(words[i])
  }
}

function postWord(word){
  let url  = 'https://wordwatch-api.herokuapp.com/api/v1/words'
  let json = { 'word': { 'value': word } }
  debugger
  fetch(url, {
    method:  'POST',
    headers: { 'Content-type': 'application/json' },
    body:    JSON.stringify(json)
  })
    .then(response => response.json())
    .then(msg => assessPost(msg, word) )
    .catch(error => assessPost(msg, word))
}

let postCount = 0
let notPosted = []
// // Don't forget to clear this between submissions
function assessPost(message, word) {
  let msg = message.message
  if ( !msg.endsWith('added!') ) { notPosted.push(word) }
  postCount += 1
  getTopWord()
}
// I'm not sure how to display these after all of the posts are attempted
// TO DO - display notPosted as unordered-list



function getWords() {
  let input = document.getElementById('words').value
  // - This is limited, if multiple spaces are added,
  // then empty strings are returned in the array.
  // - Also does not handle characters other than letters
  return input.split(' ')
}





$(document).ready(() => {
  getTopWord()
  addWordsSubmission()
})
