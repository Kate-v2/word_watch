
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
  fetch(url, {
    method:  'POST',
    headers: { 'Content-type': 'application/json' },
    body:    JSON.stringify(json)
  })
    .then(response => response.json())
    .then(msg => assessPost(msg, word) )
    .catch(msg => assessPost(msg, word))
}

function assessPost(message, word) {
  let msg = message.message
  if ( !msg.endsWith('added!') ) { displayNotPosted(word) }
  getTopWord()
}

// - This is limited, if multiple spaces are added,
// then empty strings are returned in the array.
// - Also does not handle characters other than letters
function getWords() {
  // notPosted = []
  clearFeedback()
  let input = document.getElementById('words').value
  return input.split(' ')
}

function displayNotPosted(word) {
  // document.getElementById('notPosted') ? document.getElementById('notPosted') : createNotPostedList()
  let list    = document.getElementById('notPosted') || createNotPostedList()
  list.appendChild( newListItem(word) )
  return list
}

function newListItem(word){
  let item       = document.createElement('li')
  item.class     = 'notPostedWord'
  item.innerHTML = word
  // item.style     = "list-style-type:circle;"
  return item
}

function createNotPostedList(){
  let section    = document.getElementById('feedback')
  section.hidden = false
  section.innerHTML += '<p>The following words were NOT submitted.</p>'
  section.innerHTML += '<p>Please remove non-alphbetical characters.</p>'
  let list       = document.createElement('ul')
  list.id        = 'notPosted'
  feedback.appendChild(list)
  return list
}

function clearFeedback() {
  let section = document.getElementById('feedback')
  section.innerHTML = ''
  section.hidden    = true
  return section
}

$(document).ready(() => {
  getTopWord()
  addWordsSubmission()
})
