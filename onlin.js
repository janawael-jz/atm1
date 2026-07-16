const order = {
    id: "13",
    status: "valid",
    stock: 5,
    amount: 50
};

console.log(order);

let totalRevenue = 0;
let successfulOrder = 0;
let skippedInRow = 0;
let stockFailed = 0;

if (
    order.status === "canceled" ||
    order.status === "invalid" ||
    order.stock === 0
) {
    console.log("Order not valid");

    skippedInRow++;

    if (order.stock === 0) {
        stockFailed++;
    }

} else {

    totalRevenue += order.amount;
    successfulOrder++;

    skippedInRow = 0;
}

console.log("Total Revenue:", totalRevenue);
console.log("Successful Orders:", successfulOrder);
console.log("Skipped in a Row:", skippedInRow);
console.log("Stock Failed:", stockFailed);