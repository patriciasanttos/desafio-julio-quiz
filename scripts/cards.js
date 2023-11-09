let cards = document.querySelectorAll(".flip-card-inner");

[...cards].forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("flip");
  });
});