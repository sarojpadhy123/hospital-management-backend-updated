const mongoose = require ('mongoose')

async function connectDB(){
    try {
        // Database URL
        return await mongoose.connect('mongodb+srv://psarojkumar9:sarojpass123@hospitalcluster.gikam2z.mongodb.net/')
    } catch(error){
        console.log(error);
    }
}

module.exports = connectDB