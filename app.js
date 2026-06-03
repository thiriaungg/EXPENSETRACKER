const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let expenses = [];

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/expenses", (req, res) => {
    res.render("expenses", { expenses });
});

app.get("/add", (req, res) => {
    res.render("addExpense");
});

app.post("/add", (req, res) => {
    expenses.push({
        name: req.body.name,
        amount: req.body.amount,
        category: req.body.category
    });

    res.redirect("/expenses");
});

app.get("/edit/:id", (req, res) => {
    res.render("editExpense", {
        expense: expenses[req.params.id],
        id: req.params.id
    });
});

app.post("/edit/:id", (req, res) => {
    expenses[req.params.id] = {
        name: req.body.name,
        amount: req.body.amount,
        category: req.body.category
    };

    res.redirect("/expenses");
});

app.get("/delete/:id", (req, res) => {
    expenses.splice(req.params.id, 1);
    res.redirect("/expenses");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});