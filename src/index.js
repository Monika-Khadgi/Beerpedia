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
      let htmlSegment = `<div class="col-lg-4 card-beer">
                          <img class="img-beer" src="${beer.image_url}" >
                          <h2>${beer.id}. ${beer.name}</h2>
                          <h3>${beer.first_brewed}</h3>
                          <div class="email"><a href="email:${beer.description}"></a></div>
                          <button class="btn button mx-2" onclick=beerDescription(${beer.id})>Read more</button>
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
      let htmlSegment = `<div class=" mt-3 py-3 ">
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

async function beerDescription(beerId) {
  let url = `https://api.punkapi.com/v2/beers/${beerId}`;
  let beerInJson = await getRandomItemWithUrl(url);
  let html = '';
  console.log(beerInJson)
  beerInJson.forEach(i => {
      let htmlSegment = `<div class="mt-3 py-3 px-3 ">
                          <img class="img-beer" src="${i.image_url}" >
                          <h2>${i.id}. ${i.name}</h2>
                          <h3>${i.first_brewed}</h3>
                          <p class="description">${i.description}</p>
                          <h3>${i.food_pairing[0]}></h3>
                          <p>${i.brewers_tips}></p>
                          <h3>${i.ph}></h3>
                      </div>`;

      html += htmlSegment;
  }) 
  let descriptionContainer = document.querySelector('.descriptionContainer');
  descriptionContainer.innerHTML = html;
};

renderAllBeers();