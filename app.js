import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).send('merhaba');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App started port on ${port}`);
});
