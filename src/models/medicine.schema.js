const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Medicine = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minHeight: 1,
      trim: true,
    },
    typeOfMedicine: {
      type: String,
      required: [true, "Type Of Medicine is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "medicines",
  }
);
const MedicineSchema = mongoose.model("Medicine", Medicine);
module.exports = MedicineSchema;
