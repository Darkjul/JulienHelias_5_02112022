// Récupération du contenu du panier à partir du Local Storage

let sofaInLocalStorage = localStorage.getItem('sofa');

// Récupération de "cart__items" 

var cartItems = document.getElementById('cart__items');

// Si le panier est vide on renvoi sur la page index.html sinon la fonction displayProductBasket prendra la suite

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


    const dataSofaId = creapDelete.closest(".cart__item").dataset.id;
    const dataSofaColor = creapDelete.closest(".cart__item").dataset.color;

    creapDelete.addEventListener('click', (event) => {
        event.preventDefault();
        deleteArticle(dataSofaId, dataSofaColor);
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

// Suppression d'un produit du panier

function deleteArticle(dataSofaId, dataSofaColor) {

    // On récupère le panier stocké dans le Local Storage

    const cart = JSON.parse(localStorage.getItem('sofa'));

    // Le produit à supprimer est filtré par son ID et sa couleur

    const cartFilter = cart.filter(
        (article) =>
            (article.id !== dataSofaId && article.color !== dataSofaColor) || (article.id === dataSofaId && article.color !== dataSofaColor)
    );

    let reloadCart = cartFilter;

    // On sauvegarde la modification dans le Local Storage

    if (cartFilter.length > 0) {

        localStorage.setItem('sofa', JSON.stringify(reloadCart));

    }

    // Si le panier est vide on purge le Local Storage et retour à la page d'acceuil

    else {

        localStorage.removeItem('sofa');
    }

    // On recharge la page panier avec les modifications 

    window.location.reload();
}

// Modification de la quantité de canapé dans le panier

function changeQuantity(event) {

    let inputQuantity = event.target;

    let articleProduct = inputQuantity.closest('article');

    const newQuantity = inputQuantity.value;

    // Contrôle de la quantité modifiée, si inférieure à 1 ou supérieur à 100 on affiche l'alerte

    if (newQuantity < 1 || newQuantity > 100) {

        alert('Veuillez insérer une quatité entre 1 et 100');
        return;
    }

    // On récupère le panier stocké dans le LS

    let cart = JSON.parse(localStorage.getItem('sofa'));

    // On crée des variables de récuperation de l'ID et de la couleur

    let getSofaID = articleProduct.getAttribute("data-id");
    let getSofaColor = articleProduct.getAttribute("data-color");

    for (let i = 0; i < cart.length; i++) {

        const sofaActInLs = cart[i];

        // On vérifie l'ID et la couleur du Sofa pour sauvegarder sa nouvelle quantité

        if (getSofaID === sofaActInLs.id && getSofaColor === sofaActInLs.color) {

            sofaActInLs.quantity = newQuantity;

            // On sauvegarde la modification dans le Local Storage

            localStorage.setItem('sofa', JSON.stringify(cart));
        }
    }

    // On recharge la page panier avec les modifications 

    window.location.reload();
}

// Validation du formulaire de commande

// Récupération des élements de paragraphes pour afficher les messages d'erreurs correspondants

let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let emailErrorMsg = document.getElementById("emailErrorMsg");
let cityErrorMsg = document.getElementById("cityErrorMsg");

// ReGex

// Définition des variables de contrôle ReGex du formulaire

var nameRegExp = new RegExp("^[A-zÀ-ú \-]+$");
var adressRegExp = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
var mailRegExp = new RegExp("^[A-Za-z0-9+_.-]+@[a-zA-Z.-]+[.][a-z]{2,10}$");

// On teste la correspondance ReGex dans une chaîne de caractère qui aura pour réponse vrai ou faux

const testRegexName = (value) => {
    return nameRegExp.test(value);
};

const testRegexAdress = (value) => {
    return adressRegExp.test(value);
};

const testRegexEmail = (value) => {
    return mailRegExp.test(value);
};

// Fonction de contrôle du prénom

function checkFirstName() {

    let inputFirstName = document.getElementById("firstName").value;

    if (testRegexName(inputFirstName)) {
        firstNameErrorMsg.textContent = "Prénom validé";
        return true;

    } else {
        firstNameErrorMsg.textContent = "Veuillez renseigner un prénom valide !";

        return false;
    }
}

// Fonction de contrôle du nom

function checkLastName() {

    let inputLastName = document.getElementById("lastName").value;

    if (testRegexName(inputLastName)) {
        lastNameErrorMsg.textContent = "Nom validé";
        return true;

    } else {
        lastNameErrorMsg.textContent = "Veuillez renseigner un nom valide !";

        return false;
    }
}

// Fonction de contrôle de la ville

function checkCity() {

    let inputCity = document.getElementById("city").value;

    if (testRegexAdress(inputCity)) {
        cityErrorMsg.textContent = "Ville validée";
        return true;

    } else {
        cityErrorMsg.textContent = "Veuillez renseigner une ville valide !";

        return false;
    }
}

// Fonction de contrôle de l'adresse

function checkAdress() {

    let inputAddress = document.getElementById("address").value;

    if (testRegexAdress(inputAddress)) {
        addressErrorMsg.textContent = "Adresse validée";
        return true;

    } else {
        addressErrorMsg.textContent = "Veuillez saisir une adresse valide !";

        return false;
    }
}

// Fonction de contrôle de l'adresse e-mail

function checkEmail() {

    let inputEmail = document.getElementById("email").value;

    if (testRegexEmail(inputEmail)) {
        emailErrorMsg.textContent = "E-Mail Validé";
        return true;

    } else {
        emailErrorMsg.textContent = "Veuillez saisir une adresse email valide !";

        return false;
    }
}

// Création de la variable qui servira à la validation de la commande au clic du bouton "Commander"

let orderButton = document.getElementById("order");

orderButton.addEventListener("click", (event) => {
    event.preventDefault(event);

    // On sauvegarde les valeurs du formulaire client

    contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        city: document.getElementById("city").value,
    };

    sendFinalOrder(contact);
});

// Fonction qui envoie la requête POST d'envoi de la commande si le formulaire et valide
// Récupération de l'orderId de la commande en retour et redirection vers la page confirmation.html

function sendFinalOrder(contact) {

    let products = [];
    const cart = JSON.parse(localStorage.getItem('sofa'));
    for (const article of cart) {
        products.push(article.id);
    }

    if (cart !== null &&
        checkFirstName() &&
        checkLastName() &&
        checkAdress() &&
        checkCity() &&
        checkEmail()
    ) {
        // Requête POST

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify({
                contact,
                products: products,
            }),

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            // Récupération et stockage de la réponse de l'API qui nous donne l'orderId

            .then((response) => {
                return response.json();
            })

            .then((server) => {

                const orderId = server.orderId;

                // Si l'ID de la commande a bien été récupéré, on redirige le client vers la page de Confirmation

                if (orderId != "") {
                    window.location.href = "confirmation.html?orderid=" + orderId;
                }
            });
    }
}