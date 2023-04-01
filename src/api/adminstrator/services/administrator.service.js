const Administrator = require("../../../models/administrator.schema");
const createAdministrator = (obj) => {
  return Administrator.create(obj);
};
const findOneAdministrator = (email) => {
  return Administrator.findOne(email);
};
const findAllAdministrator = () => {
  return Administrator.find({});
};
const findByIdAndDeleteAdministrator = (id) => {
  return Administrator.findByIdAndDelete(id);
};
const findByIdAdministrator = (id) => {
  return Administrator.findById(id);
};
module.exports = {
  findOneAdministrator,
  createAdministrator,
  findAllAdministrator,
  findByIdAndDeleteAdministrator,
  findByIdAdministrator,
};
