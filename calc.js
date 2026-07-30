function  calculateShipping(weight){
    const shippingCost = weight * 5;
    
    return new Promise ((resolve ,reject)=>{
        if(weight > 0){
            resolve(shippingCost);
        } else {
            reject("Invalid weight. Please enter a positive value.");
        }
    })
}
