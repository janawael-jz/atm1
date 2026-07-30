import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

export function addToCart(productId) {
  const product = products.find(product => product.id === productId);

  if (!product) {
    console.log("Product not found!");
    return;
  }

  cart.push(product);

  console.log(`${product.name} has been added to the cart.`);
}