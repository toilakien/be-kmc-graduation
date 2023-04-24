const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MedicalAppointment = new Schema(
  {
    patient: {
      type: String,
    },
    doctor: {
      type: String,
    },
    dateAppointment: {
      type: Date,
    },
    code: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "medical-appointment",
  }
);
const MedicalAppointmentSchema = mongoose.model(
  "MedicalAppointment",
  MedicalAppointment
);
module.exports = MedicalAppointmentSchema;
