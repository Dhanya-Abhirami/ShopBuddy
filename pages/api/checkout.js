import Stripe from 'stripe'
import uuidv4 from 'uuid/v4'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Order from '../../models/Order'
import calculateCartTotal from '../../utils/calculateCartTotal'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req,res) => {
    const { paymentData } = req.body
    try{
        // verify and get userid from token
        const {userId} = jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        // find cart based on userid, populate it
        const cart = await Cart.findOne({user: userId}).populate({
            path : 'products.product',
            model : 'Product'
        })
        // console.log('cart',cart)
        // calculate cart totals again from cart products (for security)
        const { cartTotal, stripeTotal } = calculateCartTotal(cart.products)
        // get email for payment data and check if email is linked with existing Stripe customer
        const prevCustomer = await stripe.customers.list({
            email : paymentData.email,
            limit : 1 // return only one custmer
        })
        const isExistingCustomer = prevCustomer.data.length > 0;
        // if not, create one based on email
        let newCustomer;
        if (!isExistingCustomer){
            newCustomer = await stripe.customers.create({
                email : paymentData.email,
                source : paymentData.id
            })
        }
        const customer = (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
        // create charge with total, send recipient email
        const charge = await stripe.charges.create({
            currency : 'INR',
            amount : stripeTotal,
            receipt_email : paymentData.email,
            customer,
            description : `Checkout | ${paymentData.email} | ${paymentData.id}`
        },{
            idempotencyKey: uuidv4()// prevent charges getting calculated twice
        })
        // add order data to database
        await new Order({
            user: userId,
            email : paymentData.email,
            total : cartTotal,
            products : cart.products
        }).save()
        // clear products in cart
        await Cart.findOneAndUpdate(
            {_id:cart._id},
            { $set : { products : [] }}
        )
        // send back success response   
        res.status(200).send('Checkout successful')
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error processing charge')
    }
}