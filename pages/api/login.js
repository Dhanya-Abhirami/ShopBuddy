import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
connectDb();

export default async (req,res) => {
    const {email, password } = req.body    
    try{
        // check if user exists with provided email
        const user = await User.findOne({ email }).select('+password');
        if (user){
            // check if password matches with one in db 
            const passwordsMatch = await bcrypt.compare(password, user.password) 
            if (passwordsMatch){
                // generate token
                const token = jwt.sign({ userId : user._id},process.env.JWT_SECRET,{ expiresIn : '1d'}) // executes synchronously
                // send token to client
                res.status(200).json(token)
            }
            else{
                res.status(401).send('Passwords do not match');
            }
        }
        else{
            // return error
            return res.status(404).send('No user exists with that email');
        }
    }
    catch(error){
        console.error(error)
        res.status(501).send('Error logging in')
    }
}