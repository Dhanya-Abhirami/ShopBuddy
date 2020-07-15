import mongoose from 'mongoose' // Object Relational Mapper
const connection = {};

async function connectDb () {
    if (connection.isConnected) {
        // Use exixting database connection
        console.log('Using existing connection')
        return;
    }
    // Use a new databse connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex : true,
        useFindAndModify : false,
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    console.log('DB connected')
    connection.isConnected = db.connections[0].readyState; // for serverless
}

export default connectDb;