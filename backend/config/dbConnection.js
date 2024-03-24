const mongoose = require('mongoose')


const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Database")
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDb;