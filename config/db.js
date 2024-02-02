
const mongoose = require ('mongoose')

async function connectDB(){
    try {
        // Database URL
        return await mongoose.connect("mongodb+srv://psarojkumar9:TGtRbGyNwCrapvBo@cluster0.whyovyi.mongodb.net/")
    } catch{
        console.log('Database Connection Error')
    }
}

module.exports = connectDB