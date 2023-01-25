async function getRandomItemWithUrl(url) {
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function renderAllBeers() {
  let url = 'https://api.punkapi.com/v2/beers';
  let beer = await getRandomItemWithUrl(url);
  let html = '';
  beer.forEach(beer => {
      let htmlSegment = `<div class="mt-3 py-3 px-3 ">
                          <img class="img-beer" src="${beer.image_url}" >
                          <h2>${beer.id}. ${beer.name}</h2>
                          <h3>${beer.first_brewed}</h3>
                          <div class="email"><a href="email:${beer.description}"></a></div>
                      </div>`;

      html += htmlSegment;
  });

  let container = document.querySelector('.container-beer');
  container.innerHTML = html;
}

async function renderRandomBeer() {
  let url = 'https://api.punkapi.com/v2/beers/random';

  let beer = await getRandomItemWithUrl(url);
  let html = '';
  beer.forEach(beer => {
      let htmlSegment = `<div class=" mt-3 py-3 px-3">
                          <img class="img-beer" src="${beer.image_url}" >
                          <h2>${beer.name} ${beer.first_brewed}</h2>
                          <div class="email"><a href="email:${beer.description}"</a></div>
                      </div>`;

      html += htmlSegment;
  });

  let randomContainer = document.querySelector('.randomContainer');
  randomContainer.innerHTML = html;
}

async function renderSearch() {
  const beerName = document.getElementById('txt-search-beer').value;
  let url = `https://api.punkapi.com/v2/beers?beer_name=${beerName}`;
  let beer = await getRandomItemWithUrl(url);

  let html = '';
  beer.forEach(beer => {
      let htmlSegment = `<div class=" mt-3 py-3 px-3">
                          <img class="img-beer" src="${beer.image_url}" >
                          <h2>${beer.name} ${beer.first_brewed}</h2>
                          <div class="email"><a href="email:${beer.description}"</a></div>
                      </div>`;

      html += htmlSegment;
  });

  let searchContainer = document.querySelector('.searchContainer');
  searchContainer.innerHTML = html;
}

renderAllBeers();