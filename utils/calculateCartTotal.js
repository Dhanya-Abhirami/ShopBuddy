function calculateCartTotal(products){
    const total = products.reduce( (acc, el)=>{ // acc means accumulator
        acc += el.product.price * el.quantity;
        return acc;
    },0) // default value is zero
    const cartTotal = ((total * 100) / 100).toFixed(2);
    const stripeTotal = Number((total * 100).toFixed(2));
    return {cartTotal,stripeTotal}
}   

export default calculateCartTotal