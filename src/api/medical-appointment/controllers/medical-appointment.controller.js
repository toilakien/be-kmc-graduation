const enum_status = require("../../../enum/status-code.enum");
const MedicalAppointment = require("../../../models/medical-appointment.schema");
const Doctor = require("../../../models/doctor.schema");
const { number } = require("joi");

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
    total: medical.length,
  });
};
const getDetailMedicalAppointment = async (req, res) => {
  const { id } = req.params;
  const medical = await MedicalAppointment.findById(id);
  const doctor = await Doctor.findOne({ name: medical.doctor });
  res.status(enum_status.OK).json({
    message: "Success",
    detail: {
      ...medical._doc,
      phoneNumberDoctor: doctor.phoneNumber,
    },
  });
};
const filterByMonth = async (req, res) => {
  try {
    const list = await MedicalAppointment.find({});
    const filterMonthOne = list.filter((e) => {
      return Number(e.createdAt.getMonth() + 1) === 1;
    });
    const filterMonthTwo = list.filter((e) => {
      return Number(e.createdAt.getMonth() + 1) === 2;
    });
    const filterMonthThree = list.filter((e) => {
      return Number(e.createdAt.getMonth() + 1) === 3;
    });
    const filterMonthFour = list.filter((e) => {
      return Number(e.createdAt.getMonth() + 1) === 4;
    });
    const filterMonthFive = list.filter((e) => {
      return Number(e.createdAt.getMonth() + 1) === 5;
    });
    const filterMonthSix = list.filter((e) => {
      return Number(e.createdAt.getMonth() + 1) === 6;
    });
    const filterMonthSeven = list.filter((e) => {
      return Number(e.createdAt.getMonth() + 1) === 7;
    });
    res.status(enum_status.OK).json({
      message: "Success",
      filterList: [
        filterMonthOne.length,
        filterMonthTwo.length,
        filterMonthThree.length,
        filterMonthFour.length,
        filterMonthFive.length,
        filterMonthSix.length,
        filterMonthSeven.length,
      ],
    });
    console.log(filterMonth);
  } catch (error) {}
};
module.exports = {
  createMedicalAppointmentCtl,
  getDetailMedicalAppointment,
  getAllMedicalAppointmentCtl,
  getTotalMedicalAppointment,
  filterByMonth,
};
