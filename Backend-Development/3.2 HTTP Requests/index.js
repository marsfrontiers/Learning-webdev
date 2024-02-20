import express from "express";
const app = express();
const port = 3000;

app.get( "/", ( req, res ) => {
    res.send( "<h1>Hello World! whats supp</h1>" );
});

app.get( "/about", (req, res) => {
    res.send("This is about");
});

app.get("/contact", (req, res) => {
    res.send("This page is for contacting us");
});

app.listen(port, () => {
    console.log( `Example app listening on port ${port}`);
});