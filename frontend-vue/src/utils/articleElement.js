import { addToCart } from "./cart.js";

export const articleElement = (product) => {
  const article = document.createElement("article");
  article.classList.add("col");

  const card = document.createElement("div");
  card.classList.add("card", "shadow-sm");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = product.productName;

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = product.description;

  const cardPrice = document.createElement("p");
  cardPrice.classList.add("card-text");
  cardPrice.textContent = `$${product.price}`;

  const button = document.createElement("button");
  button.classList.add("btn", "btn-sm", "btn-outline-success", "mt-2");
  button.textContent = "Add to Cart";
  button.addEventListener("click", () => addToCart(product));

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(button);

  card.appendChild(cardBody);
  article.appendChild(card);

  return article;
};
