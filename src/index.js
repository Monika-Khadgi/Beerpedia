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
        let htmlSegment = `<div class="col-lg-3 col-md-3 col-sm-12 card mx-2 card-beer">
                         <img class="img-beer card-img-top" src="${beer.image_url}" >
                         <div class="card-body> 
                         <h2 class="card-title>${beer.id}. ${beer.name}</h2>
                          <h3>${beer.first_brewed}</h3>
            <div class="beer-info-container"></div>
            <button class="btn button" onclick=beerDescription(${beer.id}),scrollToTop()>Read more</button>
                          <button class="btn button " onclick=addToCart(${beer.id})>Add to cart</button>
                          </div>
                      </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container-beer');
    if (container != null)
    container.innerHTML = html;
}

async function renderRandomBeer() {
    let url = 'https://api.punkapi.com/v2/beers/random';

    let beerInfo = await getRandomItemWithUrl(url);
    let html = '';
    beerInfo.forEach(beer => {
        let htmlSegment = `<div class=" col-lg-6 card card-beer">
                          <img class="img-beer" src="${beer.image_url}" >
                          <h2>${beer.name} ${beer.first_brewed}</h2>
                      </div>`;

        html += htmlSegment;
    });

    let randomContainer = document.querySelector('.beer-info-container');
    randomContainer.innerHTML = html;
}

async function renderSearch() {
    const beerName = document.getElementById('txt-search-beer').value;
    let url = `https://api.punkapi.com/v2/beers?beer_name=${beerName}`;
    let beerInfo = await getRandomItemWithUrl(url);
    let html = '';
    beerInfo.forEach(beer => {
        let htmlSegment = `<div class=" col-lg-6 card card-beer">
                        <img class="img-beer" src="${beer.image_url}" >
                        <h2>${beer.name} ${beer.first_brewed}</h2>
                    </div>`;

        html += htmlSegment;
    });


    let searchContainer = document.querySelector('.beer-info-container');
    searchContainer.innerHTML = html;
}


async function beerDescription(beerId) {
    let url = `https://api.punkapi.com/v2/beers/${beerId}`;
    let beerInJson = await getRandomItemWithUrl(url);

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

    let descriptionContainer = document.querySelector('.beer-info-container');
    descriptionContainer.innerHTML = html;
}

async function addToCart(beerId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart)

    let url = `https://api.punkapi.com/v2/beers/${beerId}`;
    let beerInJson = await getRandomItemWithUrl(url);

    if (cart.length == 0){
      cart.push(beerInJson);
      cart[0][0].total_order_count = 1;
    } else {
      cart.forEach(cartItem => {
        if(cartItem[0].id == beerInJson[0].id) {
          console.log(cartItem[0].id);
          cartItem[0].total_order_count++;
        }
        else{
          beerInJson[0].total_order_count = 1;
          console.log(beerInJson);
          cart.push(beerInJson);
        }
      }) // get beerId from beerInJson
      // compare if the beerId exists in cart array

    }

    
    
    console.log(cart);

    localStorage.setItem('cart', JSON.stringify(cart));
    showTotalItemInCart();
}

function showTotalItemInCart() {
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    const total_count_span = document.getElementById('total-items-cart');
    total_count_span.innerText = cart.length;
}


function scrollToTop() {
    window.scrollTo(0, 0);
}

renderAllBeers();
showTotalItemInCart();