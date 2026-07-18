function isSorted(arr) {

    for (let i = 0; i < arr.length - 1; i++) {

        if (arr[i] > arr[i + 1]) {
            return false;
        }

    }

    return true;
}

const numbers = [1, 2, 3, 4, 5];

console.log(isSorted(numbers));


function greaterThan(arr, value) {

    let result = [];

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] > value) {
            result.push(arr[i]);
        }

    }

    return result;
}

const numbers = [10, 5, 20, 8, 30];

console.log(greaterThan(numbers, 10));