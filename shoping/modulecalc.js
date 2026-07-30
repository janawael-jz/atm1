import { cart } from "../data/cart.js";

export function calculateTotal() {
  const total = cart.reduce((sum, product) => {
    return sum + product.price;
  }, 0);

  console.log(`Total Price: ${total} EGP`);

  return total;
}