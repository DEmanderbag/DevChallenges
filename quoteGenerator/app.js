const ctaBtn = document.querySelector(".random__quote");

ctaBtn.addEventListener("click", getRandomQuote);

async function getRandomQuote() {
  const request = await fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random");
  const data = await request.json();

  const quoteSection = document.querySelector(".quote");
  let quote = `
  <p class="quote__text">${data.data[0].quoteText}</p>
    <div class="quote__about">
      <p class="quote__author">${data.data[0].quoteAuthor}</p>
      <p class="quote__genre">${data.data[0].quoteGenre}</p>
    </div>`;
  quoteSection.innerHTML = quote;
}

getRandomQuote();
