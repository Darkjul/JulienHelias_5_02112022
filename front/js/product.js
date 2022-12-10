// Récupération de l'id du produit via l' URL

let params = new URL(window.location.href).searchParams;
let newID = params.get('id');

fetch("http://localhost:3000/api/products/" + newID)

    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        document.title = data.name;

        displaySofa(data);
    })

    .catch(error => {
        console.log('Erreur Serveur Detectée ', error);
    });



function displaySofa() {

    let sofaImage = document.querySelector('.item__img');

    // Insertion image du canapé
    var creaSofaImage = document.createElement('img');
    creaSofaImage.setAttribute('src', formSofa.imageUrl);
    creaSofaImage.setAttribute('alt', formSofa.altTxt);
    sofaImage.appendChild(creaSofaImage);

    // Insertion nom du canapé
    let sofaTitle = document.getElementById('title');
    sofaTitle.textContent = formSofa.name;

    // Insertion du prix du canapé
    let sofaPrice = document.getElementById('price');
    sofaPrice.textContent = formSofa.price;

    // Insertion de la description du canapé
    let sofaDescription = document.getElementById('description');
    sofaDescription.textContent = formSofa.description;

    // Récupération des couleurs possibles du canapé
    let sofaOption = document.getElementById('colors');

    // Insertion des couleurs dans une variable
    var colors = formSofa.colors;

    // Lecture du tableau des couleurs et insertion de celles-ci dans les disponibilités

    for (let colorSofa of colors) {
        var creaOption = document.createElement('option');
        creaOption.setAttribute('value', colorSofa);
        creaOption.textContent = colorSofa;
        sofaOption.appendChild(creaOption);

    }
}

// Creation de l'evennement au clique eventListener pour ajouter le produit au panier

const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
    event.preventDefault();

    // Récuperation des informations de choix du client

    const selectQuantity = document.getElementById('quantity').value;
    const selectColors = document.getElementById('colors').value;

    const sofaFinalChoice = {
        id: newID,
        color: selectColors,
        quantity: selectQuantity,
    };

    if (selectQuantity < 1 || selectQuantity > 100 || selectColors === '') {
        alert('Veuillez choisir un nombre de canapé entre 1 et 100 ainsi qu\'une couleur');
        return;
    }

    // Déclaration d'une variable sofaInLocalStorage pour stocker les valeurs clés dans le Local Storage
    // Parse pour convertir du JSON en Javascript

    let sofaInLocalStorage = JSON.parse(localStorage.getItem('sofa'));

    // Gestion multiples articles du Local Storage

    // Si le Local Storage n'est pas vide

    let check = false;

    if (sofaInLocalStorage) {

        // On va vérifier que le canapé ne soit pas deja dans le Local Storage avec une couleur identique

        sofaInLocalStorage.forEach(function (sofaCheck, key) {
            if (sofaCheck.id == newID && sofaCheck.color == selectColors) {
                sofaInLocalStorage[key].quantity = parseInt(sofaCheck.quantity) + parseInt(selectQuantity);
                check = true;
            }
        });

        if (!check) {

            // Récupération de la sélection de l'utilisateur dans un tableau :

            sofaInLocalStorage.push(sofaFinalChoice);
        }
    }

    // Si le Local Storage est vide

    else {

        // Les éléments de choix de l'utilisateur sont stockés dans un tableau

        sofaInLocalStorage = [];
        sofaInLocalStorage.push(sofaFinalChoice);
    }

    localStorage.setItem('sofa', JSON.stringify(sofaInLocalStorage));
    alert('Votre choix de canapé a bien été ajouté à votre panier');

});