import { cart } from "../data/cart.js";

export function removeFromCart(productId) {
  const index = cart.findIndex(product => product.id === productId);

  if (index === -1) {
    console.log("Product not found in the cart.");
    return;
  }

  const removedProduct = cart.splice(index, 1);

  console.log(`${removedProduct[0].name} has been removed from the cart.`);
}