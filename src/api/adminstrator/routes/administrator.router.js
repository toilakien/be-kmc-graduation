var express = require("express");
const administratorRouter = express.Router();

const Adm_controller = require("../controllers/administrator.controller");
const upload = require("../../../utils/uploadFileImage");
administratorRouter.post("/register", Adm_controller.register);
administratorRouter.post("/login", Adm_controller.login);
administratorRouter.post("/changepassword", Adm_controller.changePassword);
administratorRouter.post(
  "/resetpassword",
  Adm_controller.resetPasswordForSupperAdmin
);
administratorRouter.get("/", Adm_controller.getAllAdministrator);
administratorRouter.delete("/:id", Adm_controller.deleteAdministrator);
administratorRouter.get("/:id", Adm_controller.getDetail);
administratorRouter.put("/:id", upload.any(), Adm_controller.EditAdminstrator);

module.exports = administratorRouter;
