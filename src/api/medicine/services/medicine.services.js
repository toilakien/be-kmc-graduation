const Medicine = require("../../../models/medicine.schema");
const createMedicine = (medicine) => {
  return Medicine.create(medicine);
};
const findOneMedicine = (name) => {
  return Medicine.findOne(name);
};
const findAllMedicine = () => {
  return Medicine.find({});
};
const findByIdAndDeleteMedicine = (id) => {
  return Medicine.findByIdAndDelete(id);
};
const findByIdAndUpdateMedicine = (id, params) => {
  return Medicine.findByIdAndUpdate(id, params);
};
const findByIdMedicine = (id) => {
  return Medicine.findById(id);
};
module.exports = {
  findOneMedicine,
  createMedicine,
  findAllMedicine,
  findByIdAndDeleteMedicine,
  findByIdMedicine,
  findByIdAndUpdateMedicine,
};
