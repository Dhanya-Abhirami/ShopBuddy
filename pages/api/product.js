import Product from '../../models/Product'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'

connectDb();

async function handleGetRequest(req,res){
    const { _id } = req.query
    const product = await Product.findOne({ _id }); // Template literals : same as { _id : _id }
    res.status(200).json(product); // 200 => OK
}

async function handlePostRequest(req,res){
    try{
        const { name, price, description, imageUrl} = req.body
        if (!name || !price || !description || !imageUrl){
            return res.status(422).send('Product missing one or more fields'); // Unprocessable entity
        }
        else{
            const product = await new Product({
                name,
                price,
                description,
                imageUrl
            }).save()
            res.status(201).json(product)
        }
    }
    catch(error){
        console.error(error)
        res.status(500).send('Server Error in creating product')
    }
}

async function handleDeleteRequest(req,res){ // not an atomic update, cascade delete
    const { _id } = req.query
    try{
        // delete product by id
        await Product.findOneAndDelete({ _id }); 
        // remove product from all carts, referenced as 'product'
        await Cart.updateMany(
            {'products.product' : _id},
            {$pull: { products : {product : _id}}} // remove only that product from the cart
        )
        res.status(204).json({}); // 204 => No content
    }
    catch(error){
        console.error(error);
        res.status().send('Error deleting product')
    }
}

export default async (req,res) => {
    switch (req.method){
        case 'GET':
            await handleGetRequest(req,res);
            break;
        case 'POST':
            await handlePostRequest(req,res);
            break;
        case 'DELETE':
            await handleDeleteRequest(req,res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`); // Error on user's side
            break;
    }
    
}