const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

//Connection to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
        () =>  console.log("Connected to db")           
);

//import routes
const listingRoutes = require("./routes/listing");
const userRoutes = require("./routes/user")

//Middleware
app.use(express.json());
app.use(cors());

//route middlewares
app.use("/api/listings", listingRoutes);
app.use("/api/user", userRoutes);

app.listen(3000, () => {
    console.log("Server successfully running on port 3000!");
});