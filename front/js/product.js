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

function displaySofa(formSofa) {

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
    for (var i = 0; i < colors.length; i++) {
        var colorSofa = colors[i];
        var creaOption = document.createElement('option');
        creaOption.setAttribute('value', colorSofa);
        creaOption.textContent = colorSofa;
        sofaOption.appendChild(creaOption);

    }
}