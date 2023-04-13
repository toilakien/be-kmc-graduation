const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Administrator = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      minHeight: 4,
      trim: true,
    },
    password: {
      type: String,
      minHeight: 6,
      required: [true, "password is required"],
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    gender: {
      type: Number,
      enum: [1, 2],
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "ACCOUNT_ADMIN",
  }
);
const AdministratorSchema = mongoose.model("Administrator", Administrator);
module.exports = AdministratorSchema;
