const express = require("express");
const MedicalAppointmentRouter = express.Router();
const MedicalAppointmentCtl = require("../controllers/medical-appointment.controller");
MedicalAppointmentRouter.get(
    "/total",
    MedicalAppointmentCtl.getTotalMedicalAppointment
);
MedicalAppointmentRouter.post(
  "/",
  MedicalAppointmentCtl.createMedicalAppointmentCtl
);
MedicalAppointmentRouter.get(
  "/",
  MedicalAppointmentCtl.getAllMedicalAppointmentCtl
);
module.exports = MedicalAppointmentRouter;
