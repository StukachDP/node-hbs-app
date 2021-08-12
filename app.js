const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "hbs");  
const pool = mysql.createPool({

    connectionLimit: 5,
      
    host: "localhost",
    user: "root",
    database: "sciencemagazines",
    password: ""
}); 


app.get("/individualInfo/:id", function(req, res) {

    const id = req.params.id;

    pool.query("SELECT * FROM sciencemagizenes WHERE id=?", [id], function(err, data) {

        if (err) return console.log(err.message);

        res.render("individualInfo.hbs", {
            user: data[0]
        });
    });
});


app.get("/search", function(req, res) {

    pool.query("SELECT nameOriginal, ISSNprint FROM sciencemagizenes LIMIT 10", function(err, result) {

        if (err) return console.log(err.message);
        res.render("search.hbs", {
            users: result
        });
    });
});


app.get("/create", function(req, res) {

    res.render("create.hbs");
});


app.post("/create", urlencodedParser, function(req, res) {

    if (!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const age = req.body.age;

    pool.query("INSERT INTO sciencemagizenes (name, age) VALUES (?,?)", [name, age], function(err, data) {

        if (err) return console.log(err);
        res.redirect("/search");
    });
});


app.post("/searchByName", urlencodedParser, function(req, res) {

    if (!req.body) return res.sendStatus(400);

    const name = req.body.name;

    pool.query(`SELECT * FROM sciencemagizenes WHERE nameEng LIKE "%"?"%"`, [name], function(err, result) {

        if (err) return console.log(err.message);
        res.render("search.hbs", {
            users: result
        });
    });
});


app.post("/searchByScientificDirections", urlencodedParser, function(req, res) {

    if (!req.body) return res.sendStatus(400);

    const scientificDirection = req.body.scientificDirection;
    console.log(scientificDirection);

    pool.query(`SELECT * FROM sciencemagizenes WHERE scientificDirections LIKE "%"?"%"`, [scientificDirection], function(err, result) {

        if (err) return console.log(err.message);
        res.render("search.hbs", {
            users: result
        });
    });
});


app.get("/edit/:id", function(req, res) {

    const id = req.params.id;

    pool.query("SELECT * FROM sciencemagizenes WHERE id=?", [id], function(err, data) {

        if (err) return console.log(err.message);

        res.render("edit.hbs", {
            user: data[0]
        });
    });
});


app.post("/edit", urlencodedParser, function(req, res) {

    if (!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;

    pool.query("UPDATE sciencemagizenes SET name=?, age=? WHERE id=?", [name, age, id], function(err, result) {

        if (err) return console.log(err.message);
        res.redirect("/search");
    });
});


app.post("/delete/:id", function(req, res) {

    const id = req.params.id;

    pool.query("DELETE FROM sciencemagizenes WHERE id=?", [id], function(err, result) {

        if (err) return console.log(err.message);
        res.redirect("/search");
    });
});


app.post("/checking", urlencodedParser, function(req, res) {

    if (!req.body) return res.sendStatus(400);

    const userName = req.body.userName;
    const password = req.body.psw;

    pool.query("SELECT status FROM admin WHERE userName=? AND password= SHA(?)", [userName, password], function(err, result) {

        if (err) return console.log(err.message);
        res.render("search.hbs", {
            userStatus: result[0]
        });
    });
});


app.listen(3000, function() {

    console.log("Server start working...");
});