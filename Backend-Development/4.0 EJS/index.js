import express from "express";

const app = express();
const port = 3000;


app.get("/", (req, res) => {
    const d =new Date();
    const day = d.getDay();

    let type = "a Weekday";
    let adv = "Work hard today rest on weekend";

    if (day === 0 || day === 6 ) {
        type = "Weekend Day";
        adv = "Rest and Relax, Todays a fun day!";
    }

    res.render("index.ejs", {
        dayType: type,
        advice: adv,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
