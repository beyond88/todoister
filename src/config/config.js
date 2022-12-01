const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

//connect to db
const dbs = mongoose.connect(
    process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
})
.catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
});
