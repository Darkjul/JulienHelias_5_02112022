// Récupération des produits de l'api

fetch("http://localhost:3000/api/products")

  .then((response) => response.json())
  .then((products) => {

    for (let product of products) {

      displayProduct(product);
    }

  })

  .catch(error => {
    console.log('Erreur Serveur Detectée ', error);
  });



// Fonction qui affiche les produits de l'api sur la page index.html

function displayProduct(product) {

  let setProduct = document.getElementById('items');

  // Insertion du lien de chaque canapés 

  let creaLinkProduct = document.createElement('a');
  creaLinkProduct.setAttribute('href', "./product.html?id=" + product._id);
  setProduct.appendChild(creaLinkProduct);

  // Insertion des articles

  let creaArticle = document.createElement('article');
  creaLinkProduct.appendChild(creaArticle);

  // Insertion des images

  let creaImage = document.createElement('img');
  creaImage.setAttribute('src', product.imageUrl);
  creaImage.setAttribute('alt', product.altTxt);
  creaArticle.appendChild(creaImage);

  // Insertion des noms dans le titre H3

  let creaTitle = document.createElement('h3');
  creaTitle.className = 'productName';
  creaTitle.textContent = product.name;
  creaArticle.appendChild(creaTitle);

  // Insertion des descriptions dans le paragraphe P

  let creaParagraph = document.createElement('p');
  creaParagraph.className = 'productDescription';
  creaParagraph.textContent = product.description;
  creaArticle.appendChild(creaParagraph);
}



