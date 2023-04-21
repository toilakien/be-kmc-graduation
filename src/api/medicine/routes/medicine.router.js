const express = require("express");
const medicineRouter = express.Router();

const medicineCtl = require("../controllers/medicine.controller");
medicineRouter.post("/", medicineCtl.createMedicineCtl);
medicineRouter.get("/", medicineCtl.getAllMedicines);
medicineRouter.delete("/:id", medicineCtl.deleteMedicine);
medicineRouter.get("/:id", medicineCtl.getDetailMedicine);
medicineRouter.put("/:id", medicineCtl.editMedicine);

module.exports = medicineRouter;
