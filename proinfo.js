const product = new Promise((resolve, reject)=>{
    if(success){
        resolve("operation good");
    } else {
        reject("operation failed");
    }
})
const products = {
    1: "Laptop",
    2: "Phone",
    3: "Tablet"
};
const getproduct = (id)=>{
    return new Promise((resolve , reject)=>{
        if(products[id]){
            resolve(products[id]);
        } else {
            reject("Product not found");
        }
    })
}

getproduct(1).then((product)=>{ 
    console.log(product);
}).catch((error)=> {
    console.error(error);
})