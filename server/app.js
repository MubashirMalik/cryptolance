require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const userRoutes = require('./routes/user');
const projectRoutes = require("./routes/project");
const proposalRoutes = require("./routes/proposal");

app.use(express.json())
app.use(cors());

// routes
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/proposal", proposalRoutes)

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    })
    .then(() => {
    console.log("Connected to database.");
    })
    .catch((err) => console.log(err));

const port = process.env.PORT || 3001
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})