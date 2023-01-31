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
      let htmlSegment = `<div class="col-lg-4 col-md-6 col-sm-12 card card-beer">
                         <img class="img-beer card-img-top" src="${beer.image_url}" >
                         <div class="card-body> 
                         <h2 class="card-title>${beer.id}. ${beer.name}</h2>
                          <h3>${beer.first_brewed}</h3>
                          <button class="btn button mx-2" onclick=beerDescription(${beer.id})>Read more</button>
                          <button class="btn button mx-2" onclick=addToCart(${beer.id})>Add to cart</button>
                          </div>
                      </div>`;

      html += htmlSegment;
  });

  let container = document.querySelector('.container-beer');
  container.innerHTML = html;
}

async function renderRandomBeer() {
  let url = 'https://api.punkapi.com/v2/beers/random';

  let beerInfo = await getRandomItemWithUrl(url);
  let html = '';
  beerInfo.forEach(beer => {
      let htmlSegment = `<div class=" col-lg-6 card-beer">
                          <img class="img-beer" src="${beer.image_url}" >
                          <h2>${beer.name} ${beer.first_brewed}</h2>
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

  
  let searchContainer = document.querySelector('.searchContainer');
  searchContainer.innerHTML = html;
}

async function returnBeerInfoInDetailHtml(beerInJson) {
  let html = '';
  
  beerInJson.forEach(i => {
      let htmlSegment = `<div class="col-lg-6 card card-beer">
                          <img class="img-beer card-img-top" src="${i.image_url}" >
                          <h2>${i.id}. ${i.name}</h2>
                          <h3>${i.first_brewed}</h3>
                          <p class="description">${i.description}</p>
                          <h3>${i.food_pairing[0]}></h3>
                          <p>${i.brewers_tips}></p>
                          <h3>${i.ph}></h3>
                      </div>`;

      html += htmlSegment;
  }) 

  return html;
}

async function beerDescription(beerId) {
  let url = `https://api.punkapi.com/v2/beers/${beerId}`;
  let beerInJson = await getRandomItemWithUrl(url);

  html = returnBeerInfoInDetailHtml(beerInJson);
  
  let descriptionContainer = document.querySelector('.descriptionContainer');
  descriptionContainer.innerHTML = html;
};

async function addToCart(beerId){
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  let url = `https://api.punkapi.com/v2/beers/${beerId}`;
  let beerInJson = await getRandomItemWithUrl(url);
  cart.push(beerInJson);  
  
  sessionStorage.setItem('cart', JSON.stringify(cart))

}
  
renderAllBeers();