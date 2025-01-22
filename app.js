require("dotenv").config();

const express = require("express");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const patientRoute = require("./routers/patient.route");
<<<<<<< HEAD
const nurseRoute = require("./routers/nurseRoute");
const vitalsRoute = require("./routers/vitalsRoute");
=======
const receptionistRoute = require("./routers/receptionist.route");
const queueRoute = require("./routers/queue.route");
const appointmentRoute = require("./routers/appointment.route");
>>>>>>> c6e8412285f44bebe7c651ba5302683d3f06e609
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

app.use("/api/patients", patientRoute);
app.use("/api/nurse", nurseRoute);
app.use("/api/vitals", vitalsRoute);
app.get("/api", (req, res) => {
  res.send("Welcome to HMS api");
});

app.use("/api/patients", patientRoute);
app.use("/api/receptionist", receptionistRoute);
app.use("/api/queue",queueRoute);
app.use("/api/appointment",appointmentRoute);

