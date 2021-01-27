const body = document.querySelector("body");
const ctaBtn = document.querySelector(".random__quote");
const quoteSection = document.querySelector(".quote");
const allQuotesSection = document.querySelector(".all__quotes");

ctaBtn.addEventListener("click", getRandomQuote);

const API = "https://quote-garden.herokuapp.com/api/v3/quotes";
let params;

async function getRandomQuote() {
  // Returns a random quote
  const request = await fetch(`${API}/random`);
  const data = await request.json();

  // Save data in variables
  let quoteText = data.data[0].quoteText;
  let quoteAuthor = data.data[0].quoteAuthor;
  let quoteGenre = data.data[0].quoteGenre;

  let quote = `
  <p class="quote__text">${quoteText}</p>
    <div class="quote__about" tabindex=0>
      <p class="quote__author">${quoteAuthor}</p>
      <p class="quote__genre">${quoteGenre}</p>
    </div>`;
  quoteSection.innerHTML = quote;

  //  Get the data from Parametar
  params = new URLSearchParams({
    author: quoteAuthor,
    limit: 10,
  });

  const quoteAbout = document.querySelector(".quote__about");
  // Event listener on click
  quoteAbout.addEventListener("click", () => {
    allQuotesSection.classList.add("is-open");
    clearAllQuotes();
    body.classList.add("open");
    getQuoteByAuthor();
  });

  // Event listener on enter key
  quoteAbout.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      allQuotesSection.classList.add("is-open");
      clearAllQuotes();
      body.classList.add("open");
      getQuoteByAuthor();
    }
  });
}

// Clear all quotes window
function clearAllQuotes() {
  allQuotesSection.innerHTML = "";
}

async function getQuoteByAuthor() {
  const url = await fetch(`${API}?${params.toString()}`);
  const authorQuote = await url.json();
  let allQuotes = authorQuote.data;

  let authorName = allQuotes[0].quoteAuthor;

  let backButton = `
  <div class="back__group">
    <button class="back__option">
      <img src="assets/icons/back.svg" alt="arrow to the left">
      <p class="quote__author quote__author--all">${authorName}</p>
    </button>
   </div>`;

  //  Populates all quotes section
  allQuotesSection.innerHTML += backButton;

  allQuotes.forEach((e) => {
    let quotes = e.quoteText;
    let quotesData = `
      <div class="quotes__data">
        <p>${quotes}</p>
      </div>`;

    allQuotesSection.innerHTML += quotesData;
  });

  let goBack = document.querySelector(".back__option");

  goBack.addEventListener("click", () => {
    allQuotesSection.classList.remove("is-open");
    body.classList.remove("open");
  });
}

getRandomQuote();
