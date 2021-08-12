const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const PORT = 3000;


const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.engine("hbs", expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: "main",
    extname: "hbs"
}));
app.set("view engine", "hbs"); 
hbs.registerPartials(__dirname + "/views/partials");

app.use(urlencodedParser);

app.use(express.static("stylesheet"));
app.use(express.static("images"));
app.use("/", router);

const start = () => {

    try {
        app.listen(PORT, () => console.log("Server started at 3000 port"));
    } catch (error) {
        console.log(error);
    }
}


start();