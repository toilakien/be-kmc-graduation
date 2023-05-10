const express = require("express");
const MedicalAppointmentRouter = express.Router();
const MedicalAppointmentCtl = require("../controllers/medical-appointment.controller");
MedicalAppointmentRouter.get(
  "/total",
  MedicalAppointmentCtl.getTotalMedicalAppointment
);
MedicalAppointmentRouter.get("/byMonth", MedicalAppointmentCtl.filterByMonth);
MedicalAppointmentRouter.post(
  "/",
  MedicalAppointmentCtl.createMedicalAppointmentCtl
);
MedicalAppointmentRouter.put(
  "/:id",
  MedicalAppointmentCtl.editMedicalAppointment
);
MedicalAppointmentRouter.delete("/:id", MedicalAppointmentCtl.deleteMedical);
MedicalAppointmentRouter.get(
  "/",
  MedicalAppointmentCtl.getAllMedicalAppointmentCtl
);
MedicalAppointmentRouter.get(
  "/:id",
  MedicalAppointmentCtl.getDetailMedicalAppointment
);
module.exports = MedicalAppointmentRouter;
