import './sass/style.scss'

const quoteText = document.querySelector('.quote-text')
const quoteAuthor = document.querySelector('.quote-author');
const quoteBtn = document.querySelector('.quote-btn')
const loader = document.querySelector('.loader')
const quote = document.querySelector('.quote-container')

quoteBtn.addEventListener('click', getQuote)

function loading(bool) {
  quote.hidden = bool
  loader.hidden = !bool
}

async function getQuote() {
  loading(true)
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json'
  const response = await fetch(proxyUrl + apiUrl)
  const data = await response.json()
  try {
    if (data.quoteText.length > 50) {
      quoteText.classList.add('long-text')
    } else {
      quoteText.classList.remove('long-text')
    }
    quoteText.textContent = data.quoteText
    quoteAuthor.textContent = data.quoteAuthor || 'Unknown'
    console.table(data)
    loading(false)
  } catch (e) {
    getQuote()
  }
}

getQuote()