const express = require("express");
const doctorRouter = express.Router();

const doctorCtl = require("../controllers/doctor.controller");
doctorRouter.get("/total", doctorCtl.getTotalDoctor);
doctorRouter.post("/", doctorCtl.createDoctorCtl);
doctorRouter.get("/:id", doctorCtl.getDetailDoctors);
doctorRouter.get("/", doctorCtl.getAllDoctors);
doctorRouter.delete("/:id", doctorCtl.deleteDoctor);
doctorRouter.put("/:id", doctorCtl.editDoctor);


module.exports = doctorRouter;
