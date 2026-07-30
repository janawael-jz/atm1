import { cart } from "../data/cart.js";

export function listCart() {
  if (cart.length === 0) {
    console.log("Your cart is empty.");
    return;
  }

  console.log("\n----- Cart Items -----");

  cart.forEach((product, index) => {
    console.log(
      `${index + 1}. ${product.name} - ${product.price} EGP`
    );
  });

  console.log("----------------------");
}