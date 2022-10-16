import express from "express";

const app = express();

//Template engine

app.set("view engine", "ejs");

//MW
app.use(express.static("public"));

//Routes
app.get("/", (req, res) => {
  res.status(200).render("index",{
    page_name:"index",
  });
});
app.get("/about", (req, res) => {
  res.status(200).render("about",{
    page_name:"about"
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App started port on ${port}`);
});
