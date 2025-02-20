require("dotenv").config();

const express = require("express");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const doctorRouter = require("./routers/doctor.route");
const accountantRouter = require("./routers/accountant.route");
const prescriptionRouter = require("./routers/prescription.route");
const medicationRoute = require("./routers/medicationRoute");
const patientRoute = require("./routers/patient.route");
const nurseRoute = require("./routers/nurseRoute");
const bedAllotmentRoute = require("./routers/bedAllotmentRoute");
const bedRoute = require("./routers/bedRoute");
const vitalsRoute = require("./routers/vitalsRoute");
const pharmacistRoute = require("./routers/pharmacistRoute");
const receptionistRoute = require("./routers/receptionist.route");
const queueRoute = require("./routers/queue.route");
const appointmentRoute = require("./routers/appointment.route");
const adminRoute = require("./routers/admin.route");
const departmentRoute = require("./routers/department.route");
const employeeRoute = require("./routers/employee.route");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("connected to database");
    app.listen(3001, () => {
      console.log("Running on port 3001");
    });
  })
  .catch((err) => console.log(err));

//middlewares
app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URI,
    }),
    cookie: { maxAge: new Date(Date.now() + 3600000) },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.send("Welcome to HMS api");
});

app.use("/api/nurse", nurseRoute);
app.use("/api/vitals", vitalsRoute);
app.use("/api/bedallotment", bedAllotmentRoute);
app.use("/api/bed", bedRoute);
app.use("/api/doctor", doctorRouter);
app.use("/api/accountant", accountantRouter);
app.use("/api/prescription", prescriptionRouter);
app.use("/api/patients", patientRoute);
app.use("/api/receptionist", receptionistRoute);
app.use("/api/queue", queueRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/nurse", nurseRoute);
app.use("/api/vitals", vitalsRoute);
app.use("/api/admin", adminRoute);
app.use("/api/department", departmentRoute);
app.use("/api/medication", medicationRoute);
app.use("/api/pharmacist", pharmacistRoute);
app.use("/api/employee", employeeRoute);

