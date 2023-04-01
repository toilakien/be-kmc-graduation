const express = require("express");
const doctorRouter = express.Router();

const doctorCtl = require("../controllers/doctor.controller");
doctorRouter.post("/", doctorCtl.createDoctorCtl);
doctorRouter.get("/", doctorCtl.getAllDoctors);

module.exports = doctorRouter;
