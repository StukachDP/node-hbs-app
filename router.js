const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const middleware = require("./middleware/middleware.js")


router.get("/search", middleware, controller.getMagazines);
router.get("/individualInfo/:id", controller.getIndividualMagazine);
router.post("/searchByName", controller.findMagazinesByName);
router.post("/searchByScientificDirections", controller.findMagazinesByScientificDirections);
router.get("/create", controller.redirectForCreateMagazinePage);
router.post("/create", controller.createMagazine);
router.get("/edit/:id", controller.getMagazineToEditById);
router.post("/edit", controller.editMagazine);
router.post("/delete/:id", controller.deleteMagazineById);
router.post("/logIn", controller.logInUser);
router.get("/logOut", controller.logOutUser);

module.exports = router;