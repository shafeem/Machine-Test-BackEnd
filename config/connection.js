const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const DBconnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully ..");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        // You might want to handle the error here, such as retrying the connection or terminating the application
    }
}

module.exports = DBconnect;
