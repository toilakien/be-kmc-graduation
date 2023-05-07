const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Doctor = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minHeight: 1,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minHeight: 1,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minHeight: 4,
      trim: true,
    },
    gender: {
      type: Number,
      enum: [0, 1],
      required: [true, "Gender is required"],
    },
    //worktime (1:ca ngay ,2:ca dem )
    worktime: {
      type: Number,
      enum: [1, 2, 3],
      required: [true, "Worktime is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "doctors",
  }
);
const DoctorSchema = mongoose.model("Doctor", Doctor);
module.exports = DoctorSchema;
