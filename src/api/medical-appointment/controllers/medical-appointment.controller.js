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
  const medical = await MedicalAppointment.find({}).sort({ createdAt: -1 });
  res.status(enum_status.OK).json({
    message: "Success",
    medicalAppointments: medical,
  });
};
const editMedicalAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { patient, doctor, dateAppointment } = req.body;
    const medicalAppointment = await MedicalAppointment.findOne({ id });
    if (medicalAppointment === null) {
      res.status(enum_status.BAD_REQUEST).json({
        message: "MedicalAppointment need edit not find !",
      });
    }
    if (patient) {
      medicalAppointment.patient = patient;
    }
    if (doctor) {
      medicalAppointment.doctor = doctor;
    }
    if (dateAppointment) {
      medicalAppointment.dateAppointment = dateAppointment;
    }

    const update = await MedicalAppointment.findByIdAndUpdate(
      id,
      medicalAppointment
    );
    res.status(enum_status.OK).json({
      message: "Success",
      medicalAppointment: medicalAppointment,
    });
  } catch (e) {
    if (e) {
      res.status(enum_status.INTERNAL_SERVER_ERROR).json(e);
    }
  }
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
const deleteMedical = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      await MedicalAppointment.findByIdAndDelete(id);
      res.status(enum_status.OK).json({
        message: "Success!",
      });
    } else {
      res.status.status(enum_status.BAD_REQUEST).json({
        message: "No exits id",
      });
    }
  } catch (error) {
    console.log(error);
  }
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
  deleteMedical,
  editMedicalAppointment,
  createMedicalAppointmentCtl,
  getDetailMedicalAppointment,
  getAllMedicalAppointmentCtl,
  getTotalMedicalAppointment,
  filterByMonth,
};
