const express = require("express");
const doctorRouter = express.Router();

const doctorCtl = require("../controllers/doctor.controller");
doctorRouter.post("/", doctorCtl.createDoctorCtl);
doctorRouter.get("/", doctorCtl.getAllDoctors);
doctorRouter.delete("/:id", doctorCtl.deleteDoctor);
doctorRouter.put("/:id", doctorCtl.editDoctor);

module.exports = doctorRouter;
