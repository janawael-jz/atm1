import { addToCart } from "./moduleadd.js";
import { removeFromCart } from "./moduleremove.js";
import { listCart } from "./modulelist.js";
import { calculateTotal } from "./modulecalc.js";

console.log("========== Shopping Cart ==========");

// Add products
addToCart(1);
addToCart(3);
addToCart(5);
addToCart(2);

// Display cart
listCart();

// Display total
calculateTotal();

// Remove a product
removeFromCart(3);

// Display cart again
listCart();

// Display updated total
calculateTotal();

// Try removing a non-existing product
removeFromCart(10);

// Add another product
addToCart(4);

// Final cart
listCart();

// Final total
calculateTotal();