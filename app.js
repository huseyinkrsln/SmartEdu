import express from "express";
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import pageRoute from './routes/pageRoute.js'
import courseRoute from './routes/courseRoute.js'


const app = express();

//DB Connect
mongoose.connect('mongodb://127.0.0.1:27017/smartedudb')
.then(() =>{
  console.log("Db connected Succesfuly");
});

//Template engine

app.set("view engine", "ejs");

//MW
app.use(express.static("public"));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//Routes
app.use("/",pageRoute);
app.use("/courses",courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started port on ${port}`);
});
