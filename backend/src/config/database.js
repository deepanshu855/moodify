const mongoose=require("mongoose");

const connectToDb= async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connnected!");
    } catch (err) {
        console.log("Cannot connect to database", err);
    }
}

module.exports= connectToDb;