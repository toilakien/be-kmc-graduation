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
