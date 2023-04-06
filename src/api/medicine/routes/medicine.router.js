const express = require("express");
const medicineRouter = express.Router();

const medicineCtl = require("../controllers/medicine.controller");
medicineRouter.post("/", medicineCtl.createMedicineCtl);
medicineRouter.get("/", medicineCtl.getAllMedicines);

module.exports = medicineRouter;
