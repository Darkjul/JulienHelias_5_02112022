// Récupération du contenu du panier à partir du Local Storage

let sofaInLocalStorage = localStorage.getItem('sofa');

// Récupération de "cart__items" 

var cartItems = document.getElementById('cart__items');

// Si le panier est vide on renvoi sur la page index.html sinon la fonction displayProductBasket prednra la suite

if (sofaInLocalStorage == null) {

    alert('Votre panier d\'achat est vide, veuillez choisir un ou plusieurs canapé(s) depuis la page d\'accueil de Kanap.');
    window.location.href = "index.html";

}

var kanapBasket = JSON.parse(sofaInLocalStorage);
document.getElementById('totalPrice').innerText = 0;
console.log(kanapBasket);

for (let basketProduct of kanapBasket) {


    fetch("http://localhost:3000/api/products/" + basketProduct.id)
        .then(response => response.json())
        .then((product) => {
            console.log('product', product);
            console.log('LS', basketProduct);
            displayProductBasket(basketProduct, product);
            totalPrice(product.price * basketProduct.quantity);
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

    creaInputQuantSofa.addEventListener('change', (event) => {
        event.preventDefault();
        changeQuantity(event);
    })

    // Insertion de la div settings delete

    let creaDivContentsDelete = document.createElement('div');
    creaDivContentsDelete.className = 'cart__item__content__settings__delete';
    creaDivContentSet.appendChild(creaDivContentsDelete);

    // Insertion du paragraphe supprimer

    let creapDelete = document.createElement('p');
    creapDelete.className = 'deleteItem';
    creapDelete.textContent = "Supprimer";
    creaDivContentsDelete.appendChild(creapDelete);


    const dataId = creapDelete.closest(".cart__item").dataset.id;
    const dataColor = creapDelete.closest(".cart__item").dataset.color;

    creapDelete.addEventListener('click', (event) => {
        event.preventDefault();
        deleteArticle(dataId, dataColor);
    })

}

totalQuantity();

// Fonction de calcul de la quantité totale de canapé du panier

function totalQuantity() {

    // 1 - Récupération de la quantité actuelle

    const getTotalQuantity = document.getElementById('totalQuantity');
    const cart = JSON.parse(localStorage.getItem('sofa'));
    let totalQuantity = [];

    // 2 - Calcul de la quantité totale des articles

    let totalQty = 0;

    for (let article of cart) {
        totalQty += parseInt(article.quantity);
    }
    totalQuantity.push(totalQty);

    // 3 - Insertion du résultat sur la page html

    getTotalQuantity.innerText = totalQty;
}

// Fonction de calcul du prix total de tous les canapés du panier

function totalPrice(priceProduct) {

    // 1 - Récupération du prix actuel

    const getTotalPrice = document.getElementById('totalPrice');

    // 2 - Calcul du prix actuel + nouveaux prix param fonction

    let newPrice = parseInt(getTotalPrice.textContent) + priceProduct;

    // 3 - Insertion du résultat sur la page html

    getTotalPrice.innerText = newPrice;

}

// Suppression d'un produit du panier en fonction de son ID et sa Couleur

function deleteArticle(dataId, dataColor) {

    const cart = JSON.parse(localStorage.getItem('sofa'));

    const cartFilter = cart.filter(
        (article) =>
            (article.id !== dataId && article.color !== dataColor) || (article.id === dataId && article.color !== dataColor)
    );

    let reloadCart = cartFilter;

    localStorage.setItem('sofa', JSON.stringify(reloadCart));
    location.reload();
}

/*// Modification de la quantité de canapé dans le panier

function changeQuantity(event) {

    console.log(event.target)

    let inputQuantity = event.target;

    console.log(inputQuantity.closest('article'))

    let articleProduct = inputQuantity.closest('article');

    console.log(inputQuantity.value)

    alert('Votre modification a bien été prise en compte');*/


// Validation du formulaire de commande

let formKanap = document.querySelector(".cart__order__form");

// ReGex

// Définition des variables de contrôle ReGex du formulaire

var nameRegExp = new RegExp("^[A-zÀ-ú \-]+$");
var adressRegExp = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
var mailRegExp = new RegExp("^[A-Za-z0-9+_.-]+@[a-zA-Z.-]+[.][a-z]{2,4}$");

// Verification du Prénom

var firstNameErrorMsg = document.getElementById('firstNameErrorMsg');

formKanap.firstName.addEventListener('change', function (event) {

    var value = event.target.value;

    if (nameRegExp.test(value)) {
        return true;
    }

    else {
        firstNameErrorMsg.innerText = 'Réponse incorrecte, veuillez renseigner votre prénom.';
    }
});

// Verification du Nom

let lastNameErrorMsg = formKanap.lastName.nextElementSibling;

formKanap.lastName.addEventListener('change', function (event) {

    var value = event.target.value;

    if (nameRegExp.test(value)) {
        return true;
    }

    else {
        lastNameErrorMsg.innerText = 'Réponse incorrecte, veuillez renseigner votre nom.';
    }
});

// Verification de l'adresse

var adressErrorMsg = document.getElementById('addressErrorMsg');

formKanap.address.addEventListener('change', function (event) {

    var value = event.target.value;

    if (adressRegExp.test(value)) {
        return true;
    }

    else {
        adressErrorMsg.innerText = 'Réponse incorrecte, veuillez renseigner votre adresse postale.';
    }
});

// Verification de la ville

var cityErrorMsg = document.getElementById('cityErrorMsg');

formKanap.city.addEventListener('change', function (event) {

    var value = event.target.value;

    if (nameRegExp.test(value)) {
        return true;
    }

    else {
        cityErrorMsg.innerText = 'Réponse incorrecte, veuillez renseigner votre ville.';
    }
});

// Verification de l'E-mail

var emailErrorMsg = document.getElementById('emailErrorMsg');

formKanap.email.addEventListener('change', function (event) {

    var value = event.target.value;

    if (mailRegExp.test(value)) {
        return true;
    }

    else {
        emailErrorMsg.innerText = 'Réponse incorrecte, veuillez renseigner votre adresse email.';
    }
});