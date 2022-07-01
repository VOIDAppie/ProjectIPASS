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
}
//verwijderen van een item en totale items updaten
function removeCartItem (event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()

    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {  //checken of input een nummer is en of het geen negatief getal is
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
    total = Math.round(total *100) / 100 // ervoor zorgen dat de totale prijs op 2 decimalen wordt afgerond (source: Web Dev Simplified)
    document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total


}