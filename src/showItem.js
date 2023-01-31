function showCard() {
  if (sessionStorage.getItem("cart")) {
    cart = JSON.parse(sessionStorage.getItem('cart'));
  } 
 
    
    let html = '';

  cart.forEach(beer => {
    let htmlSegment = `<div class="col-lg-6 card-beer card ">
                        <img class="img-beer card-img-top " src="${beer[0].image_url}" >
                        <div class="card-body">
                        <h2>${beer[0].name} ${beer[0].first_brewed}</h2>
                        <p class="btn btn-danger" onclick="removeFromCart(${beer[0].id})">remove</p>
                        </div>
                    </div>`;

    html += htmlSegment;
});
  
  let cartContainer = document.querySelector('.cartContainer');
  cartContainer.innerHTML = html;
    
  }
  

async function removeFromCart(beerId){
  if (sessionStorage.getItem("cart")) {
    cart = JSON.parse(sessionStorage.getItem('cart'));
  };
  console.log(cart);
  var i = 0;
  while (i < cart.length) {
    if (cart[i][0].id == beerId.toString()) {
      cart.splice(i, 1);
    } else {
      ++i;
    }
  }
  sessionStorage.setItem('cart', JSON.stringify(cart));
  
  const alertBox = document.querySelector('.item-remove-alert');
  alertBox.style.display = "block";
  alertBox.innerText = `${beerId} removed`

  showCard();
}
  
showCard();