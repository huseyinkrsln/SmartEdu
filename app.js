import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import methodOverride from "method-override";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import pageRoute from "./routes/pageRoute.js";
import courseRoute from "./routes/courseRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();

//DB Connect
mongoose.connect("mongodb://127.0.0.1:27017/smartedudb").then(() => {
  console.log("Db connected Succesfuly");
});

//Template engine
app.set("view engine", "ejs");

//GlobalVariable(for session)
global.userIn = null;
//global.userName ="";

//MW
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/smartedudb",
    }),
    //cookie: { secure: true }
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));


//Routes
app.use("*", (req, res, next) => {
  userIn = req.session.userID;
  //userName = req.session.userName;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started port on ${port}`);
});
