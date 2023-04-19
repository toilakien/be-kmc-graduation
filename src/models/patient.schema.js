const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Patient = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minHeight: 1,
      trim: true,
    },
      gender:{
        type:Number,
          enum:[0,1]
      },
    age: {
      type: Number,
      required: [true, "Age is required"],
      trim: true,
    },
      symptom:{
          type: String,
          trim: true,
      },
    address: {
      type: String,
      trim: true,
    },
    code: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "patients",
  }
);
const PatientSchema = mongoose.model("Patient", Patient);
module.exports = PatientSchema;
