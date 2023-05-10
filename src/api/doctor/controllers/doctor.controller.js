const doctor_service = require("../services/doctor.services");
const enum_status = require("../../../enum/status-code.enum");
const { findAllDoctor } = require("../services/doctor.services");
const Doctor = require("../../../models/doctor.schema");

const createDoctorCtl = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    gender,
    worktime,
    phoneNumber,
    dateOfBirth,
    address,
  } = req.body;
  try {
    const doctor = await doctor_service.findOneDoctor({ email });
    if (!doctor) {
      const newDoctor = {
        email,
        firstName,
        lastName,
        gender,
        worktime,
        phoneNumber,
        dateOfBirth,
        address,
      };
      doctor_service.createDoctor(newDoctor);
      return res.status(enum_status.CREATED).json({
        doctor: newDoctor,
        message: "Create successfully !",
      });
    } else {
      return res.status(enum_status.BAD_REQUEST).json({
        message: '"Email already exists!"',
      });
    }
  } catch (error) {
    res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getAllDoctors = async (req, res, next) => {
  let perPage = 9;
  let { search, page, time } = req.query;
  const pageCount = await Doctor.find({});
  const a = Math.ceil(Number(pageCount.length) / Number(perPage));
  if (!search && !time) {
    Doctor.find()
      .skip((Number(page) - 1) * Number(perPage))
      .limit(Number(perPage))
      .sort({ createdAt: -1 })
      .then((data) => {
        res.status(enum_status.OK).json({
          message: "Success",
          doctors: data,
          currentPage: Number(page),
          pageCount: a,
        });
      })
      .catch((error) => {
        return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
      });
  } else {
    if (!search && time) {
      Doctor.find({ worktime: time })
        .skip((Number(page) - 1) * Number(perPage))
        .limit(Number(perPage))
        .sort({ createdAt: -1 })
        .then((data) => {
          res.status(enum_status.OK).json({
            message: "Success",
            doctors: data,
            currentPage: Number(page),
            pageCount: Math.ceil(Number(data.length) / Number(perPage)),
          });
        })
        .catch((error) => {
          return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
        });
    }
    if (!time && search) {
      Doctor.find({
        $or: [
          { firstName: new RegExp(search, "i") },
          { lastName: new RegExp(search, "i") },
        ],
      })
        .skip((Number(page) - 1) * Number(perPage))
        .limit(Number(perPage))
        .sort({ createdAt: -1 })
        .then((data) => {
          res.status(enum_status.OK).json({
            message: "Success",
            doctors: data,
            currentPage: Number(page),
            pageCount: Math.ceil(Number(data.length) / Number(perPage)),
          });
        })
        .catch((error) => {
          return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
        });
    }
  }
};
const deleteDoctor = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const doctor = await doctor_service.findByIdDoctor(id);
    if (doctor) {
      const removeDoctor = await doctor_service.findByIdAndDeleteDoctor(id);
      res.status(enum_status.OK).json({
        status: "Success",
        doctor,
      });
    }
  } catch (error) {
    return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
  }
};
const editDoctor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doctor = await doctor_service.findByIdDoctor(id);
    const {
      firstName,
      lastName,
      email,
      gender,
      phoneNumber,
      dateOfBirth,
      address,
    } = req.body;
    if (firstName) {
      doctor.firstName = firstName;
    }
    if (lastName) {
      doctor.lastName = lastName;
    }
    if (email) {
      doctor.email = email;
    }
    if (phoneNumber) {
      doctor.phoneNumber = phoneNumber;
    }
    if (dateOfBirth) {
      doctor.dateOfBirth = dateOfBirth;
    }
    if (gender) {
      doctor.gender = gender;
    }
    if (address) {
      doctor.address = address;
    }
    await doctor_service.findByIdAndUpdateDoctor(id, doctor);
    res.status(enum_status.OK).json({
      message: "Success",
      doctor: doctor,
    });
  } catch (error) {
    return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getDetailDoctors = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doctor = await doctor_service.findByIdDoctor(id);
    if (doctor) {
      return res.status(enum_status.OK).json({
        message: "Success",
        doctor,
      });
    } else {
      return res.status(enum_status.BAD_REQUEST).json({
        message: "error",
      });
    }
  } catch (error) {
    return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getTotalDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.find({});
    res.status(enum_status.OK).json({
      message: "Success",
      total: doc.length,
    });
  } catch (e) {
    console.log(e);
    e && res.json(e);
  }
};
module.exports = {
  createDoctorCtl,
  getAllDoctors,
  deleteDoctor,
  editDoctor,
  getDetailDoctors,
  getTotalDoctor,
};
