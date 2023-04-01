const adm_service = require("../services/administrator.service");
const enum_status = require("../../../enum/status-code.enum");
const e_d_code = require("../../../utils/en_decodepassword");
var jwt = require("jsonwebtoken");
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const acountTrue = await adm_service.findOneAdministrator({ email });
    if (acountTrue) {
      if (e_d_code.fn_checkcode(password, acountTrue.password)) {
        const token = jwt.sign(
          { _id: acountTrue._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
        );
        return res.status(enum_status.CREATED).json({
          message: "Success",
          data: {
            token: token,
            user: {
              email,
              avatar: "",
            },
          },
        });
      } else {
        return res.status(enum_status.BAD_REQUEST).json({
          status: enum_status.BAD_REQUEST,
          message: "Tài khoản hoặc mật khẩu không chính xác !",
        });
      }
    } else {
      res.status(enum_status.BAD_REQUEST).json("NOT FOUND 404!");
    }
  } catch (error) {
    res.status(enum_status.NOT_FOUND).json(error);
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) res.status(status_code.FORBIDDEN).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res
      .status(status_code.UNAUTHORIZED)
      .json("You are not authenticated!");
  }
};
const register = async (req, res) => {
  const { email } = req.body;
  const password = e_d_code.fn_encode(req?.body?.password);
  try {
    const user = await adm_service.findOneAdministrator({ email });
    if (!user) {
      const newUser = {
        email: email,
        password: password,
      };
      console.log("newUser", newUser);
      adm_service.createAdministrator(newUser);
      return res.status(200).json("Create successfully !");
    } else {
      return res.status(404).json("email already exists!");
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const getAllAdministrator = async (req, res, next) => {
  try {
    const Admins = await adm_service.findAllAdministrator();
    res.status(enum_status.OK).json({
      status: "Success",
      administrator: Admins,
    });
  } catch (error) {
    res.status(enum_status.BAD_REQUEST).json({
      status: "Fail",
      message: error,
    });
  }
};
const deleteAdministrator = async (req, res, next) => {
  try {
    const id = req.params.id;
    const adm = await adm_service.findByIdAdministrator(id);
    await adm_service.findByIdAndDeleteAdministrator(id);
    res.status(enum_status.OK).json({
      status: "Success",
      administrator: adm,
    });
  } catch (error) {
    res.status(enum_status.BAD_REQUEST).json({
      status: "Fail",
      message: error,
    });
  }
};
module.exports = {
  verifyToken,
  login,
  register,
  getAllAdministrator,
  deleteAdministrator,
};
