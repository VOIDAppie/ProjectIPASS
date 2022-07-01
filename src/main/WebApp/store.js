



// methode om de totale prijs te updaten
function updatePriceTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]  //pakt de eerste item
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')  //pakt alle rijen
    var total = 0 //hebben we later nodig (dit gaat door de loop heen)
    for(var i =0; i<cartRows.length; i++) {
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
    document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total


}