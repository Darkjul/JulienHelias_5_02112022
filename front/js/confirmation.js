// Récupération du numéro de commande et affichage de celle-ci avec la commande validée

const productId = new URL(window.location.href).searchParams.get("orderid");

const orderId = document.getElementById('orderId');
orderId.innerHTML = productId;

// Suppression du panier une fois la commande finalisée et purge du Local Storage

localStorage.clear();