const mongoose = require("mongoose")
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://bsidin79:ZvH0hOxd5hLG2mOr@zedro.z9ijw.mongodb.net/?retryWrites=true&w=majority&appName=zedro"

const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
        });
        console.log("Server is connected to MongoDB");
    } catch (error) {
        console.error(`Error connecting to MongoDB: error`);
    }
}

module.exports = connectDatabase;

