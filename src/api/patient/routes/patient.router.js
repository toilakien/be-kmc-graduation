const express = require("express");
const patientRouter = express.Router();

const patientCtl = require("../controllers/patient.controller");
patientRouter.get("/total", patientCtl.getTotalPatient);
patientRouter.get("/byMonth", patientCtl.filterByMonth);

patientRouter.get("/", patientCtl.getAllPatient);
patientRouter.post("/", patientCtl.createPatientCtl);
patientRouter.delete("/:id", patientCtl.deletePatient);
patientRouter.get("/:id", patientCtl.getDetailPatient);
patientRouter.put("/:id", patientCtl.editPatient);

module.exports = patientRouter;
