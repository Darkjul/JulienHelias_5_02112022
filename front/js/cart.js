// Récupération du contenu du panier à partir du Local Storage

let sofaInLocalStorage = localStorage.getItem('sofa');

// Récupération de "cart__items" 

var cartItems = document.getElementById('cart__items');

// Si le panier est vide on renvoi sur la page index.html sinon la fonction displayProductBasket prednra la suite

if (sofaInLocalStorage == null) {

    alert('Votre panier d\'achat est vide, veuillez choisir un ou plusieurs canapé(s) depuis la page d\'accueil de Kanap.');
    window.location.href = "index.html";

}

/*var totalPrice = 0;*/

var kanapBasket = JSON.parse(sofaInLocalStorage);
console.log(kanapBasket);

for (var i = 0; i < kanapBasket.length; i++) {

    var basketProduct = kanapBasket[i];

    fetch("http://localhost:3000/api/products/" + basketProduct.id)
        .then(response => response.json())
        .then((product) => {
            console.log('product', product);
            console.log('LS', basketProduct);
            displayProductBasket(basketProduct, product);
        })

        .catch(error => {
            console.log('Erreur Serveur Detectée ', error);
        });

}

// Gestion de l'affichage des produits sur la page panier

function displayProductBasket(basketProduct, product) {

    // Insertion Des Canapés

    let creaArticle = document.createElement('article');
    creaArticle.className = 'cart__item';
    creaArticle.setAttribute('data-id', basketProduct.id);
    creaArticle.setAttribute('data-color', basketProduct.color);
    cartItems.appendChild(creaArticle);

    // Insertion de la div contenant l'image

    let creaDivImage = document.createElement('div');
    creaDivImage.className = 'cart__item__img';
    creaArticle.appendChild(creaDivImage);

    // Insertion des images

    let creaImage = document.createElement('img');
    creaImage.setAttribute('src', product.imageUrl);
    creaImage.setAttribute('alt', "Photographie d'un canapé");
    creaDivImage.appendChild(creaImage);

    // Insertion de la div contenant la description

    let creaDivContentDes = document.createElement('div');
    creaDivContentDes.className = 'cart__item__content';
    creaArticle.appendChild(creaDivContentDes);

    // Insertion de la div de description

    let creaDivDescription = document.createElement('div');
    creaDivDescription.className = 'cart__item__content__description';
    creaDivContentDes.appendChild(creaDivDescription);

    // Insertion du titre H2

    let creaTitle = document.createElement('h2');
    creaTitle.textContent = product.name;
    creaDivDescription.appendChild(creaTitle);

    // Insertion du Paragraphe couleur

    let creaParaColor = document.createElement('p');
    creaParaColor.textContent = "Couleur : " + basketProduct.color;
    creaDivDescription.appendChild(creaParaColor);

    // Insertion du Paragraphe prix

    let creapPrice = document.createElement('p');
    creapPrice.textContent = "Prix : " + product.price + " € / Canapé";
    creaDivDescription.appendChild(creapPrice);

    // Insertion de la div content settings

    let creaDivContentSet = document.createElement('div');
    creaDivContentSet.className = 'cart__item__content__settings';
    creaDivContentDes.appendChild(creaDivContentSet);

    // Insertion de la div settings quantity

    let creaDivContentsQuantity = document.createElement('div');
    creaDivContentsQuantity.className = 'cart__item__content__settings__quantity';
    creaDivContentSet.appendChild(creaDivContentsQuantity);

    // Insertion du paragraphe quantité

    let creapQuantity = document.createElement('p');
    creapQuantity.textContent = "Qté :";
    creaDivContentsQuantity.appendChild(creapQuantity);

    // Insertion de la quantité de sofa globale

    let creaInputQuantSofa = document.createElement('input');
    creaInputQuantSofa.className = 'itemQuantity';
    creaInputQuantSofa.setAttribute('type', 'number');
    creaInputQuantSofa.setAttribute('name', 'itemQuantity');
    creaInputQuantSofa.setAttribute('min', '0');
    creaInputQuantSofa.setAttribute('max', '100');
    creaInputQuantSofa.setAttribute('value', basketProduct.quantity);
    creaDivContentsQuantity.appendChild(creaInputQuantSofa);

    /*creaInputQuantSofa.addEventListener('change', (event) => {
        event.preventDefault();
        changeQuantity(event);
    })*/

    // Insertion de la div settings delete

    let creaDivContentsDelete = document.createElement('div');
    creaDivContentsDelete.className = 'cart__item__content__settings__delete';
    creaDivContentSet.appendChild(creaDivContentsDelete);

    // Insertion du paragraphe supprimer

    let creapDelete = document.createElement('p');
    creapDelete.className = 'deleteItem';
    creapDelete.textContent = "Supprimer";
    creaDivContentsDelete.appendChild(creapDelete);

    /*creapDelete.addEventListener('click', (event) => {
        event.preventDefault();
        deleteArticle(event);
    })*/


}

totalQuantity()
totalPrice();


// Fonction de calcul de la quantité totale de canapé du panier

function totalQuantity() {

    const getTotalQuantity = document.getElementById('totalQuantity');
    const cart = JSON.parse(localStorage.getItem('sofa'));
    let totalQuantity = [];

    let totalQty = 0;

    for (let article of cart) {
        totalQty += parseInt(article.quantity);
    }
    totalQuantity.push(totalQty);

    getTotalQuantity.innerText = totalQty;
}

// Fonction de calcul du prix total de tous les canapés du panier

function totalPrice() {

    const getTotalPrice = document.getElementById('totalPrice');
    let getQuantity = document.querySelectorAll('.itemQuantity');
    let getAllCartPrice = document.querySelectorAll('cart__item__content__description');

    let sofaPrice = 0;

    for (let j = 0; j < getAllCartPrice.length; j++) {

        sofaPrice += parseInt(getAllCartPrice[j].lastElementChild.textContent) * getQuantity[j].value;
    }
    getTotalPrice.innerText = sofaPrice;
}

/*// Modification de la quantité de canapé dans le panier

function changeQuantity(event) {

    console.log(event.target)

    let inputQuantity = event.target;

    console.log(inputQuantity.closest('article'))

    let articleProduct = inputQuantity.closest('article');

    console.log(inputQuantity.value)

    alert('Votre modification a bien été prise en compte');*/


// ReGex

var adressRegExp = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
var nameRegExp = new RegExp("^[A-zÀ-ú \-]+$");
var mailRegExp = new RegExp("^[A-Z0-9+_.-]+@[A-Z0-9.-]+$");

var firstNameErrorMsg = document.getElementById('firstNameErrorMsg');

formKanap.firstName.addEventListener('change', function (e) {

    var value = e.target.value;

    if (nameRegExp.test(value)) {
        return true;
    }

    else {
        firstNameErrorMsg.innerText = 'Réponse incorrecte, veuillez renseigner votre prénom.';
    }
});

let lastNameErrorMsg = formKanap.lastName.nextElementSibling;

formKanap.lastName.addEventListener('change', function (e) {

    var value = e.target.value;

    if (nameRegExp.test(value)) {
        return true;
    }

    else {
        lastNameErrorMsg.innerText = 'Réponse incorrecte, veuillez renseigner votre nom.';
    }
});

var adressErrorMsg = document.getElementById('addressErrorMsg');

formKanap.address.addEventListener('change', function (e) {

    var value = e.target.value;

    if (adressRegExp.test(value)) {
        return true;
    }

    else {
        adressErrorMsg.innerText = 'Réponse incorrecte, veuillez renseigner votre adresse postale.';
    }
});

var cityErrorMsg = document.getElementById('cityErrorMsg');

formKanap.city.addEventListener('change', function (e) {

    var value = e.target.value;

    if (nameRegExp.test(value)) {
        return true;
    }

    else {
        cityErrorMsg.innerText = 'Réponse incorrecte, veuillez renseigner votre ville.';
    }
});

var emailErrorMsg = document.getElementById('emailErrorMsg');

formKanap.email.addEventListener('change', function (e) {

    var value = e.target.value;

    if (mailRegExp.test(value)) {
        return true;
    }

    else {
        emailErrorMsg.innerText = 'Réponse incorrecte, veuillez renseigner votre adresse email.';
    }
});