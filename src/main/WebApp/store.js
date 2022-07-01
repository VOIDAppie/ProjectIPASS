// checken of de body al gemaakt is anders kan js niet de html buttons vinden source: Web Dev Simplified
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// met deze ready functie zorg ik er dus voor dat de buttons altijd zullen werken ondanks dat de pagina nog niet is geladen
function ready() {
    var removeItemFromCart = document.getElementsByClassName('btn-danger')
// test voor de remove buttons van de bovenste class
    console.log(removeItemFromCart)
// loop door alle buttons in de cart en zet de removeknop de index ervan vast aan de button.
// daarna wordt er gecontroleerd wanneer er op de remove knop wordt gedrukt met een click eventlistener
    for (var i = 0; i < removeItemFromCart.length; i++) {
        var button = removeItemFromCart[i]
        // een event creeeren wanneer er op de knop wordt gedrukt dan wordt de hele row van de cart verwijderd
        // door de parent div van de cart te lezen en verwijderen.
        button.addEventListener('click', removeCartItem)
        console.log('clicked')
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartItem)
    }
}

//verwijderen van een item en totale items updaten
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()

    updateCartTotal()
}

function addToCartItem(event) {
    var button = even.target()
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    //checken voor de add to cart button of hij de naam/prijs/img van de item print
    console.log(title, price, imageSrc)
    addItemToCartRow(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCartRow(title, price, imageSrc) {
    var cartRow = document.createElement('div') // maakt een div aan voor de html incase een item wordt toegevoegd
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemName = cartItems.getElementsByClassName('cart-item-title')
    for (var i = o; i < cartItemName.length; i++){
        if(cartItemName[i].innerText == title) {
            alert('this item is already added')
            return
        }
    }
    // ervoor zorgen dat wanneer een item wordt toegevoegd aan de cart dat de styling title en prijs er correct bij staan (hierbij heb ik hulp gezocht bij Web Dev Simplifified)
    var cartRowContent = `
    <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
    cartRow.innerHTML = cartRowContent

    cartItems.append(cartRow)
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {  //checken of input een nummer is en of het geen negatief getal is
        input.value = 1
    }
    updateCartTotal()
}


// methode om de totale prijs te updaten
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]  //pakt de eerste item
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')  //pakt alle rijen
    var total = 0 //hebben we later nodig (dit gaat door de loop heen)
    for (var i = 0; i < cartRows.length; i++) {
        var cartROw = cartRows[i]
        var priceELement = cartROw.getElementsByClassName('cart-price')[0]
        var quantityElement = cartROw.getElementsByClassName('cart-quantity-input')[0]
        console.log(priceELement, quantityElement) //test om de prijs en quantity te checken

        // de tekst checken in de prijs column en de string veranderen in een nummer
        var price = parseFloat(priceELement.innerText.replace('€', ''))
        //checken of de float wordt gereturned nadat hij is verwijderd
        console.log(price)
        var quantitiy = quantitiyElement.value
        //contoleren of er nu berekend kan worden met de hoeveelheid en prijs
        console.log(quantitiy * price)
        total = total + (price * quantitiy)

    }
    // hier zorgen we ervoor dat er nu visueel te zien is dat de totale prijs te zien is op de pagina
    total = Math.round(total * 100) / 100 // ervoor zorgen dat de totale prijs op 2 decimalen wordt afgerond (source: Web Dev Simplified)
    document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total


}