const medicine_service = require("../services/medicine.services");
const enum_status = require("../../../enum/status-code.enum");
const createMedicineCtl = async (req, res) => {
  const { name, typeOfMedicine, description, price, quantity } = req.body;
  console.log(req.body);
  try {
    const medicine = await medicine_service.findOneMedicine({ name });
    console.log(medicine);
    if (!medicine) {
      const newMedicine = {
        typeOfMedicine,
        name,
        price,
        description,
        quantity,
      };

      medicine_service.createMedicine(newMedicine);
      return res.status(enum_status.CREATED).json({
        medicine: newMedicine,
        message: "Create successfully !",
      });
    } else {
      return res.status(enum_status.BAD_REQUEST).json({
        message: '"Medicine already exists!"',
      });
    }
  } catch (error) {
    res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getAllMedicines = async (req, res, next) => {
  try {
    const medicines = await medicine_service.findAllMedicine();
    if (medicines) {
      return res.status(enum_status.OK).json({
        message: "Success",
        medicines,
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
module.exports = {
  createMedicineCtl,
  getAllMedicines,
};
