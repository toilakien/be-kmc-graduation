const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

/*================================*/
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
/*================================*/

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

/*================================*/
const cookieParser = require("cookie-parser");
app.use(cookieParser());
/*================================*/

app.use("/static", express.static("./uploads"));

const Port = process.env.PORT;
const DB = process.env.MONGO_URI;
/*================================*/

//router

const administratorRouter = require("./api/adminstrator/routes/administrator.router");
app.use("/api/v1/administrator", administratorRouter);
const doctorRouter = require("./api/doctor/routes/doctor.router");
app.use("/api/v1/doctor", doctorRouter);
const medicineRouter = require("./api/medicine/routes/medicine.router");
app.use("/api/v1/medicine", medicineRouter);

/*================================*/

app.listen(Port, () => {
  console.log(`Localhost listening on to ${Port} ...`);
  mongoose
    .connect(DB)
    .then(() => {
      console.log("Successfully connected ");
    })
    .catch((error) => {
      console.log(`can not connect to database, ${error}`);
    });
});
