document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne le conteneur principal des cartes
  const cardsContainer = document.querySelector(".cards");

  // Sélectionne toutes les cartes individuelles à l'intérieur du conteneur
  const cards = document.querySelectorAll(".card");

  // Variable pour vérifier si la souris est au-dessus du conteneur
  let isMouseOverContainer = false;

  // Ajoute un écouteur d'événement pour le mouvement de la souris sur le document
  document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;

    // Obtient les dimensions et la position du conteneur
    const rectContainer = cardsContainer.getBoundingClientRect();

    // Vérifie si la souris est à l'intérieur du conteneur
    isMouseOverContainer =
      clientX >= rectContainer.left &&
      clientX <= rectContainer.right &&
      clientY >= rectContainer.top &&
      clientY <= rectContainer.bottom;

    // Calcule les coordonnées du centre du conteneur
    const containerX = rectContainer.left + rectContainer.width / 2;
    const containerY = rectContainer.top + rectContainer.height / 2;

    // Calcule les décalages de la souris par rapport au centre du conteneur
    const deltaX = clientX - containerX;
    const deltaY = clientY - containerY;

    let rotateX, rotateY;

    if (isMouseOverContainer) {
      // Le curseur est à l'intérieur du conteneur principal
      cardsContainer.style.transform = `rotateX(0deg) rotateY(0deg)`; // Remettre le conteneur principal droit

      // Calcule les rotations pour un effet plus prononcé
      rotateX = deltaY / 15; // Augmenter le pivot pour un effet plus prononcé
      rotateY = -deltaX / 15; // Augmenter le pivot pour un effet plus prononcé

      // Applique la transformation de rotation et de translation Z aux cartes
      cards.forEach((card) => {
        card.style.transform = `translateZ(55px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    } else {
      // Le curseur est en dehors du conteneur principal

      // Calcule les rotations pour un effet moins prononcé
      rotateX = deltaY / 25;
      rotateY = -deltaX / 25;

      // Supprime la transition lors des mouvements en dehors du conteneur
      cardsContainer.classList.remove("transition");

      // Applique la transformation de rotation au conteneur principal
      cardsContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Applique uniquement l'effet 3D sans rotation aux cartes
      cards.forEach((card) => {
        card.style.transform = `translateZ(50px) rotateX(0deg) rotateY(0deg)`;
      });
    }
  });

  // Ajoute un écouteur d'événement pour l'entrée de la souris dans le conteneur
  cardsContainer.addEventListener("mouseenter", () => {
    cardsContainer.classList.add("transition"); // Ajouter la transition lors de l'entrée dans le conteneur
    cardsContainer.style.transform = "rotateX(0deg) rotateY(0deg)"; // Remettre le conteneur principal droit
  });

  // Ajoute un écouteur d'événement pour la sortie de la souris du conteneur
  cardsContainer.addEventListener("mouseleave", () => {
    if (isMouseOverContainer) return; // Si la souris est toujours au-dessus du conteneur, ne rien faire

    // Applique uniquement l'effet 3D sans rotation aux cartes
    cards.forEach((card) => {
      card.style.transform = "translateZ(30px) rotateX(0deg) rotateY(0deg)";
    });

    // Réinitialise la transformation du conteneur principal
    cardsContainer.style.transform = "rotateX(0deg) rotateY(0deg)";
  });

  // Ajoute un écouteur d'événement pour la fin de la transition
  cardsContainer.addEventListener("transitionend", () => {
    if (!isMouseOverContainer) {
      cardsContainer.classList.remove("transition"); // Supprime la transition après la fin de la transition si la souris n'est pas au-dessus du conteneur
    }
  });
});
