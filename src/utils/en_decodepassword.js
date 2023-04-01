const bcrypt = require("bcryptjs");
const fn_encode = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
const fn_checkcode = (password, encode) => {
  return bcrypt.compareSync(password, encode);
};
module.exports = { fn_encode, fn_checkcode };
