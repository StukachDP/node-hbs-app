const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const pool = mysql.createPool({

    connectionLimit: 5,
      
    host: "localhost",
    user: "root",
    database: "sciencemagazines",
    password: ""
}); 


const generateAccessToken = (id, userName, status) => {

    const payload = {
        id,
        userName,
        status
    }
    return jwt.sign(payload, secret, { expiresIn: "1h" });
}


function isEmptyObject(object) {

    for (var key in object) {
        return false;
    }
    return true;
}

let adminStatus = false;

class Controller {


    async getMagazines(req, res) {

        pool.query("SELECT * FROM sciencemagizenes LIMIT 10", function(err, result) {

            if (err) return console.log(err.message);
            res.render("search", {
                title: "Search page",
                users: result,
                adminStatus
            });
        });
    }


    async getIndividualMagazine(req, res) {

        const id = req.params.id;

        pool.query("SELECT * FROM sciencemagizenes WHERE id=?", [id], function(err, data) {

            if (err) return console.log(err.message);
            res.render("individualInfo", {
                title: "Magazine exactly",
                user: data[0]
            });
        });
    }


    async findMagazinesByName(req, res) {

        if (!req.body) return res.sendStatus(400);

        const name = req.body.name;
        pool.query(`SELECT * FROM sciencemagizenes WHERE nameEng LIKE "%"?"%"`, [name], function(err, result) {

            if (err) return console.log(err.message);
            res.render("search", {
                title: "Search page",
                users: result,
                adminStatus
            });
        });
    }


    async findMagazinesByScientificDirections(req, res) {

        if (!req.body) return res.sendStatus(400);

        const scientificDirection = req.body.scientificDirection;

        pool.query(`SELECT * FROM sciencemagizenes WHERE scientificDirections LIKE "%"?"%"`, [scientificDirection], function(err, result) {

            if (err) return console.log(err.message);
            res.render("search", {
                title: "Search page",
                users: result,
                adminStatus
            });
        });
    }


    async redirectForCreateMagazinePage(req, res) {

        res.render("create", {
            title: "Create magazine"
        });
    }


    async createMagazine(req, res) {

        if (!req.body) return res.sendStatus(400);
        const nameOriginal = req.body.nameOriginal;
        const nameRus = req.body.nameRus;
        const nameEng = req.body.nameEng;
        const ISSNprint = req.body.ISSNprint;
        const ISSNonline = req.body.ISSNonline;
        const publisher = req.body.publisher;
        const publisherEng = req.body.publisherEng;
        const scientificDirections = req.body.scientificDirections;
        const webPage = req.body.webPage;
        const accessTextArticles = req.body.accessTextArticles;
        const dataStartArchieve = req.body.dataStartArchieve;
        const dataEndArchieve = req.body.dataEndArchieve;
        const embargoTerm = req.body.embargoTerm;
        const prefixDOI = req.body.prefixDOI;
        const includedRSCI = req.body.includedRSCI;
        const linkELibrary = req.body.linkELibrary;
        const accessArticleELibrary = req.body.accessArticleELibrary;
        const dataStartArchieveELibrary = req.body.dataStartArchieveELibrary;
        const dataEndArchieveELibrary = req.body.dataEndArchieveELibrary;
        const bibliometricIndicatorsRSCI = req.body.bibliometricIndicatorsRSCI;
        const yearsIndexingScopus = req.body.yearsIndexingScopus;
        const yearsIndexingWebOfScience = req.body.yearsIndexingWebOfScience;
        const description = req.body.description;

        pool.query("INSERT INTO sciencemagizenes (nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience, description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience, description],
            function(err, data) {

                if (err) return console.log(err);
                res.redirect("/search");
            });
    }


    async deleteMagazineById(req, res) {

        const id = req.params.id;

        pool.query("DELETE FROM sciencemagizenes WHERE id=?", [id], function(err, result) {

            if (err) return console.log(err.message);
            res.redirect("/search");
        });
    }


    async getMagazineToEditById(req, res) {

        const id = req.params.id;

        pool.query("SELECT * FROM sciencemagizenes WHERE id=?", [id], function(err, data) {

            if (err) return console.log(err.message);

            res.render("edit", {
                title: "Edit magazine info",
                user: data[0]
            });
        });
    }


    async editMagazine(req, res) {

        if (!req.body) return res.sendStatus(400);

        const id = req.body.id;
        const nameOriginal = req.body.nameOriginal;
        const nameRus = req.body.nameRus;
        const nameEng = req.body.nameEng;
        const ISSNprint = req.body.ISSNprint;
        const ISSNonline = req.body.ISSNonline;
        const publisher = req.body.publisher;
        const publisherEng = req.body.publisherEng;
        const scientificDirections = req.body.scientificDirections;
        const webPage = req.body.webPage;
        const accessTextArticles = req.body.accessTextArticles;
        const dataStartArchieve = req.body.dataStartArchieve;
        const dataEndArchieve = req.body.dataEndArchieve;
        const embargoTerm = req.body.embargoTerm;
        const prefixDOI = req.body.prefixDOI;
        const includedRSCI = req.body.includedRSCI;
        const linkELibrary = req.body.linkELibrary;
        const accessArticleELibrary = req.body.accessArticleELibrary;
        const dataStartArchieveELibrary = req.body.dataStartArchieveELibrary;
        const dataEndArchieveELibrary = req.body.dataEndArchieveELibrary;
        const bibliometricIndicatorsRSCI = req.body.bibliometricIndicatorsRSCI;
        const yearsIndexingScopus = req.body.yearsIndexingScopus;
        const yearsIndexingWebOfScience = req.body.yearsIndexingWebOfScience;
        const description = req.body.description;

        pool.query("UPDATE sciencemagizenes SET nameOriginal=?, nameRus=?, nameEng=?, ISSNprint=?, ISSNonline=?, publisher=?, publisherEng=?, scientificDirections=?, webPage=?, accessTextArticles=?, dataStartArchieve=?, dataEndArchieve=?, embargoTerm=?, prefixDOI=?, includedRSCI=?, linkELibrary=?, accessArticleELibrary=?, dataStartArchieveELibrary=?, dataEndArchieveELibrary=?, bibliometricIndicatorsRSCI=?, yearsIndexingScopus=?, yearsIndexingWebOfScience=?, description=? WHERE id=?", [id, nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience, description], function(err, result) {

            if (err) return console.log(err.message);
            res.redirect("/search");
        });
    }


    async logInUser(req, res) {

        if (!req.body) return res.sendStatus(400);

        const userName = req.body.userName;
        const password = req.body.psw;

        pool.query("SELECT * FROM admin WHERE userName=? AND password= SHA(?)", [userName, password], function(err, result) {

            if (err) return console.log(err.message);
            let adminCandidate = result[0];
            console.log(adminCandidate);
            console.log(isEmptyObject(adminCandidate));
            if (!isEmptyObject(adminCandidate)) {

                adminStatus = generateAccessToken(adminCandidate.id, adminCandidate.userName, adminCandidate.status);
                res
                    .status(201)
                    .setHeader("Authorization", adminStatus);
            }
            res.redirect("/search");

        });
    }


    async logOutUser(req, res) {

        adminStatus = false;
        res.redirect("/search");
    }
}


module.exports = new Controller();