var express = require("express");
const administratorRouter = express.Router();

const Adm_controller = require("../controllers/administrator.controller");

administratorRouter.post("/register", Adm_controller.register);
administratorRouter.post("/login", Adm_controller.login);
administratorRouter.get("/", Adm_controller.getAllAdministrator);
administratorRouter.delete("/:id", Adm_controller.deleteAdministrator);
administratorRouter.get("/:id", Adm_controller.getDetail);
administratorRouter.put("/:id", Adm_controller.EditAdminstrator);

module.exports = administratorRouter;
