const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./db/db");
const userRoute = require("./routes/userRoutes")

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
dbConnection();

app.use(cors());


app.use("/api/user",userRoute);


app.listen(port,()=>{
    console.log("server connected successfully");
})