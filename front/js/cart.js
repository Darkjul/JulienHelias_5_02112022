// Récupération du contenu du panier à partir du Local Storage

let sofaInLocalStorage = localStorage.getItem('sofa');


// Récupération de "cart__items" 

var cartItems = document.getElementById('cart__items');

// Si le panier est vide on affichera "panier vide" sinon on utilise la fonction displayProductBasket 

if (sofaInLocalStorage == null) {
    var creapEmpty = document.createElement('p');
    creapEmpty.textContent = 'Votre panier d\'achat est vide, veuillez choisir un ou plusieurs canapé(s) depuis la page d\'accueil de Kanap.';
    cartItems.appendChild(creapEmpty);

    /*alert('Votre panier d\'achat est vide, veuillez choisir un ou plusieurs canapé(s) depuis la page d\'accueil de Kanap.');
    window.location.href = "index.html";*/

}

var totalPrice = 0;

var kanapBasket = JSON.parse(sofaInLocalStorage);
console.log(kanapBasket);

for (var i = 0; i < kanapBasket.length; i++) {

    basketProduct = kanapBasket[i];

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

    var creaArticle = document.createElement('article');
    creaArticle.className = 'cart__item';
    creaArticle.setAttribute('data-id', basketProduct.id);
    creaArticle.setAttribute('data-color', basketProduct.color);
    cartItems.appendChild(creaArticle);

    // Insertion de la div contenant l'image

    var creaDivImage = document.createElement('div');
    creaDivImage.className = 'cart__item__img';
    creaArticle.appendChild(creaDivImage);

    // Insertion des images

    var creaImage = document.createElement('img');
    creaImage.setAttribute('src', product.imageUrl);
    creaImage.setAttribute('alt', "Photographie d'un canapé");
    creaDivImage.appendChild(creaImage);

    // Insertion de la div contenant la description

    var creaDivContentDes = document.createElement('div');
    creaDivContentDes.className = 'cart__item__content';
    creaArticle.appendChild(creaDivContentDes);

    // Insertion de la div de description

    var creaDivDescription = document.createElement('div');
    creaDivDescription.className = 'cart__item__content__description';
    creaDivContentDes.appendChild(creaDivDescription);

    // Insertion du titre H2

    var creaTitle = document.createElement('h2');
    creaTitle.textContent = product.name;
    creaDivDescription.appendChild(creaTitle);

    // Insertion du Paragraphe couleur

    var creaParaColor = document.createElement('p');
    creaParaColor.textContent = "Couleur : " + basketProduct.color;
    creaDivDescription.appendChild(creaParaColor);

    // Insertion du Paragraphe prix

    var creapPrice = document.createElement('p');
    creapPrice.textContent = "Prix : " + product.price + " € / canapé";
    creaDivDescription.appendChild(creapPrice);

    // Insertion de la div content settings

    var creaDivContentSet = document.createElement('div');
    creaDivContentSet.className = 'cart__item__content__settings';
    creaDivContentDes.appendChild(creaDivContentSet);

    // Insertion de la div settings quantity

    var creaDivContentsQuantity = document.createElement('div');
    creaDivContentsQuantity.className = 'cart__item__content__settings__quantity';
    creaDivContentSet.appendChild(creaDivContentsQuantity);

    // Insertion du paragraphe quantity

    var creapQuantity = document.createElement('p');
    creapQuantity.textContent = "Qté :";
    creaDivContentsQuantity.appendChild(creapQuantity);

    // Insertion de la quantité de sofa globale

    var creaInputQuantSofa = document.createElement('input');
    creaInputQuantSofa.className = 'itemQuantity';
    creaInputQuantSofa.setAttribute('type', 'number');
    creaInputQuantSofa.setAttribute('name', 'itemQuantity');
    creaInputQuantSofa.setAttribute('min', '0');
    creaInputQuantSofa.setAttribute('max', '100');
    creaInputQuantSofa.setAttribute('value', basketProduct.quantity);
    creaDivContentsQuantity.appendChild(creaInputQuantSofa);

    // Insertion de la div settings delete

    var creaDivContentsDelete = document.createElement('div');
    creaDivContentsDelete.className = 'cart__item__content__settings__delete';
    creaDivContentSet.appendChild(creaDivContentsDelete);

    // Insertion du paragraphe supprimer

    var creapDelete = document.createElement('p');
    creapDelete.className = 'deleteItem';
    creapDelete.textContent = "Supprimer";
    creaDivContentsDelete.appendChild(creapDelete);
}

// Modification de la quantité de canapé dans le panier

function changeQuantity() {

    let sofaQuantity = document.querySelectorAll('.itemQuantity');

    for (let j = 0; j < sofaQuantity.length; j++) {

        sofaQuantity[j].addEventListener('change', (event) => {

            event.preventDefault();

            // Choix de la nouvelle quantité qui sera sauvegardé dans le Local Storage avec les éléments déjà présent

            let sofaNewQty = sofaQuantity[j].value;

            const updatedLocalStorage = {
                id: sofaInLocalStorage[j].id,
                image: sofaInLocalStorage[j].image,
                alt: sofaInLocalStorage[j].alt,
                name: sofaInLocalStorage[j].name,
                color: sofaInLocalStorage[j].color,
                price: sofaInLocalStorage[j].price,
                quantity: sofaNewQty,
            };

            // Actualisation du Local Storage avec les nouvelles entrées 

            sofaInLocalStorage[j] = updatedLocalStorage;

            localStorage.setItem('sofa', JSON.stringify(sofaInLocalStorage));

            // Alerte pour avertir de la MAJ du panier

            alert('Votre panier a été mis à jour.');
            totalSofa();
            finalBasketPrice();
        })
    }
}
changeQuantity();

// Suppression d'un produit du panier

function deleteArticle() {

    const deleteSofa = document.querySelectorAll('.deleteItem');

    for (let k = 0; k < deleteSofa.length; k++) {

        deleteSofa[k].addEventListener('click', (event) => {
            event.preventDefault();

            // Enregistrement de l'id et de la couleur séléctionnés pour suppression

            let delID = sofaInLocalStorage[k].id;
            let delColor = sofaInLocalStorage[k].color;

            // Filtration de l'élément du click           

            sofaInLocalStorage = sofaInLocalStorage.filter(elt => elt.id !== delID || elt.color !== delColor);

            // Actualisation du Local Storage avec les nouvelles entrées 

            localStorage.setItem('sofa', JSON.stringify(sofaInLocalStorage));

            // Alerte pour avertir de la MAJ du panier

            alert('Votre canapé a bien été supprimé.');
            window.location.href = "cart.html";
        });
    }
}
deleteArticle();

// Affichage du total des canapés dans le panier

function totalSofa() {

    let totalSofas = 0;

    for (l in sofaInLocalStorage) {

        // On convertit la valeur 'quantité' dans le Local Storage en une chaîne et on renvoit un entier décimal

        const newSofaQuantity = parseInt(sofaInLocalStorage[l].quantity, 10);

        // attribuer la valeur retournée par parseInt à la variable totalSofas

        totalSofas += newSofaQuantity;
    }

    // On attribut à #totalQuantity la valeur de totalSofas

    const totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalSofas;
}
totalSofa();

// Calcul du montant total du panier

function finalBasketPrice() {

    const priceCalc = [];

    for (m = 0; m < sofaInLocalStorage.length; m++) {

        // Calcul du prix de l'article par quantité * prix

        const basketAmount = sofaInLocalStorage[m].price * sofaInLocalStorage[m].quantity;
        priceCalc.push(basketAmount);

        // Reduce() permet de garder en mémoire les résultats de l'opération demandée en acculant tout en gardant la valeur courante

        const redux = (previousValue, currentValue) => previousValue + currentValue;
        total = priceCalc.reduce(redux);
    }
    const finalTotalPrice = document.getElementById('totalPrice');

    finalTotalPrice.textContent = total;
}
finalBasketPrice();

