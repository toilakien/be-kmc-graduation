const enum_status = require("../../../enum/status-code.enum");
const MedicalAppointment = require("../../../models/medical-appointment.schema");

const createMedicalAppointmentCtl = async (req, res) => {
  try {
    const { patient, doctor, dateAppointment } = req.body;
    if (patient && doctor && dateAppointment) {
      let x = Math.floor(Math.random() * 10000 + 1);
      let a = await MedicalAppointment.create({
        patient,
        doctor,
        dateAppointment,
        code: x,
      });

      res.status(enum_status.CREATED).json({
        message: "Success",
        medicalAppointment: {
          ...a._doc,
          code: x,
        },
      });
    }
  } catch (error) {
    res
      .status(enum_status.INTERNAL_SERVER_ERROR)
      .json({ error: error?.message });
  }
};
const getAllMedicalAppointmentCtl = async (req, res) => {
  const medical = await MedicalAppointment.find({});
  res.status(enum_status.OK).json({
    message: "Success",
    medicalAppointments: medical,
  });
};
const getTotalMedicalAppointment = async (req, res) => {
  const medical = await MedicalAppointment.find({});
  res.status(enum_status.OK).json({
    message: "Success",
    total: medical.length
  });
}

module.exports = {
  createMedicalAppointmentCtl,
  getAllMedicalAppointmentCtl,
  getTotalMedicalAppointment
};
