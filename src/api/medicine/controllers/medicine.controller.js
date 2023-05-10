const medicine_service = require("../services/medicine.services");
const enum_status = require("../../../enum/status-code.enum");
const Medicine = require("../../../models/medicine.schema");

const createMedicineCtl = async (req, res) => {
  const { name, typeOfMedicine, description, price, quantity } = req.body;
  try {
    const medicine = await medicine_service.findOneMedicine({ name });
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
    const { search } = req.query;
    if (search) {
      const medicines = await Medicine.find({
        name: new RegExp(search, "i"),
      }).sort({ createdAt: -1 });
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
    } else {
      const medicines = await medicine_service
        .findAllMedicine()
        .sort({ createdAt: -1 });
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
    }
  } catch (error) {
    return res.status(enum_status.INTERNAL_SERVER_ERROR).json(error);
  }
};
const deleteMedicine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findOne({ id });
    if (medicine) {
      const dMedicine = await Medicine.findByIdAndDelete(id);
      res.status(enum_status.OK).json({
        message: "Success",
        medicine: dMedicine,
      });
    } else {
      res.status(enum_status.BAD_REQUEST).json({
        message: "Medicine not find !",
      });
    }
  } catch (e) {
    res.status(enum_status.INTERNAL_SERVER_ERROR).json(e);
  }
};
const getDetailMedicine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findOne({ id });
    if (medicine) {
      res.status(enum_status.OK).json({
        message: "Success",
        medicine: medicine,
      });
    } else {
      res.status(enum_status.BAD_REQUEST).json({
        message: "Medicine not find !",
      });
    }
  } catch (e) {
    res.status(enum_status.INTERNAL_SERVER_ERROR).json(e);
  }
};
const editMedicine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, typeOfMedicine, description, price, quantity } = req.body;
    const medicine = await Medicine.findOne({ id });
    if (medicine === null) {
      res.status(enum_status.BAD_REQUEST).json({
        message: "Medicine need edit not find !",
      });
    }
    if (name) {
      medicine.name = name;
    }
    if (typeOfMedicine) {
      medicine.typeOfMedicine = typeOfMedicine;
    }
    if (description) {
      medicine.description = description;
    }
    if (price) {
      medicine.price = price;
    }
    if (quantity) {
      medicine.quantity = quantity;
    }
    const update = await Medicine.findByIdAndUpdate(id, medicine);
    res.status(enum_status.OK).json({
      message: "Success",
      medicine: medicine,
    });
  } catch (e) {
    if (e) {
      res.status(enum_status.INTERNAL_SERVER_ERROR).json(e);
    }
  }
};
module.exports = {
  createMedicineCtl,
  getAllMedicines,
  deleteMedicine,
  editMedicine,
  getDetailMedicine,
};
