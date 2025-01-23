const Doctor = require("../models/doctor.model");
const bcrypt = require("bcryptjs");

const getDoctor = (req, res) => {
  if (req.query.username) {
    Doctor.find({ username: req.query.username }, { password: 0, __v: 0 })
      .then((resp) => {
        res.send({
          type: "success",
          status_code: 200,
          data: {
            id: resp._id,
            firstName: resp.firstName,
            lastName: resp.lastName,
            email: resp.email,
            username: resp.username,
            specialization: resp.specialization,
            phoneNo: resp.phoneNo,
            address: resp.address,
            departmentId: resp.departmentId,
          },
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    Doctor.find({}, { password: 0, __v: 0 })
      .then((resp) => {
        res.send({
          type: "success",
          status_code: 200,
          data: resp.map((doctor) => ({
            id: doctor._id,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            email: doctor.email,
            username: doctor.username,
            specialization: doctor.specialization,
            phoneNo: doctor.phoneNo,
            address: doctor.address,
            departmentId: doctor.departmentId,
          })),
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};

const getSingleDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const my_doctor = await Doctor.findById(id);
    res.send({
      type: "success",
      status_code: 200,
      data: my_doctor,
    });
  } catch (err) {
    res.send({
      type: "error",
      message: "could not get single Doctor",
      error: err.message,
    });
  }
};

const DocRegister = async (req, res) => {
  try {
    const find_doctor = await Doctor.findOne({ email: req.body.email });
    if (find_doctor) {
      res.send({
        type: "error",
        status_code: 401,
        message: "Doctor Already Exists",
      });
      return;
    }
    const encrypt_password = await bcrypt.hash(req.body.password, 12);
    const doctor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      specialization: req.body.specialization,
      phoneNo: req.body.phoneNo,
      password: encrypt_password,
      address: req.body.address,
      departmentId: req.departmentId
    };
    const create_doctor = new Doctor(doctor);
    const resp = await create_doctor.save();
    res.send({
      type: "success",
      status_code: 201,
      data: {
        id: resp._id,
        firstName: resp.firstName,
        lastName: resp.lastName,
        email: resp.email,
        username: resp.username,
        specialization: resp.specialization,
        phoneNo: resp.phoneNo,
        address: resp.address,
        departmentId: resp.departmentId
      },
    });
  } catch (err) {
    res.send({
      type: "error",
      message: "could not create Doctor",
      error: err.message,
    });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const doctor_email = req.body.email;
    const doctor_password = req.body.password;
    if (doctor_email && doctor_password) {
      const find_doctor = await Doctor.findOne({ email: doctor_email });
      if (!find_doctor) {
        res.send({ type: "error", message: "Doctor Not Found" });
        return;
      }
      const find_password = await bcrypt.compare(
        doctor_password,
        find_doctor.password
      );
      if (!find_password) {
        res.send({ type: "error", message: "Invalid email or Password" });
        return;
      }
      res.send({
        type: "success",
        message: "Doctor Login Successful",
        data: {
          id: find_doctor._id,
          firstName: find_doctor.firstName,
          email: find_doctor.email,
        },
      });
    } else {
      res.send({ type: "error", message: "Invalid Credentials" });
    }
  } catch (err) {
    res.send({
      type: "error",
      message: "Could not Login Doctor",
      error: err.message,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    await Doctor.findByIdAndDelete(id);
    res.send({
      type: "success",
      status_code: 200,
      message: "Doctor Deleted Successfully",
    });
  } catch (err) {
    res.send({
      type: "error",
      message: "Could not delete Doctor",
      error: err.message,
    });
  }
};

const updateDoctor = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, address, specialization, departmentId } =
    req.body;
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    id,
    { name, email, phone, address, specialization, departmentId },
    { new: true }
  );
  res.send({ type: "success", status_code: 200, data: updatedDoctor });
};

module.exports = {
  getDoctor,
  DocRegister,
  deleteDoctor,
  updateDoctor,
  loginDoctor,
  getSingleDoctor,
};
