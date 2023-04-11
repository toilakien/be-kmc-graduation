const Doctor = require("../../../models/doctor.schema");
const createDoctor = (doctor) => {
  return Doctor.create(doctor);
};
const findOneDoctor = (email) => {
  return Doctor.findOne(email);
};
const findByIdAndDeleteDoctor = (id) => {
  return Doctor.findByIdAndDelete(id);
};
const findByIdAndUpdateDoctor = (id, params) => {
  return Doctor.findByIdAndUpdate(id, params);
};
const findByIdDoctor = (id) => {
  return Doctor.findById(id);
};

module.exports = {
  findOneDoctor,
  createDoctor,
  findByIdAndDeleteDoctor,
  findByIdDoctor,
  findByIdAndUpdateDoctor,
};
