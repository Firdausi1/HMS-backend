const appointmentModel = require("../models/appointment.model");
const patientModel = require("../models/patient.model"); // Assuming you have a Patient model



// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { patient, date, doctorName } = req.body;

    // Validate required fields
    if (!patient || !date || !doctorName) {
      return res.status(400).json({ message: "Patient, date, and doctorName are required" });
    }

    // Validate patient ObjectId
    if (!mongoose.Types.ObjectId.isValid(patient)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    // Fetch patient name from the Patient model
    const patientRecord = await patientModel.findById(patient);

    if (!patientRecord) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patient_name = patientRecord.name; // Assuming the Patient model has a 'name' field

    // Create the new appointment
    const newAppointment = new appointmentModel({
      patient,
      patient_name,
      date,
      doctorName,
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      data: savedAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error: error.message });
  }
};

// // Create a new appointment
// const createAppointment = async (req, res) => {
//   try {
//     const { patient_name, date, doctorName } = req.body;

//     // Validate required fields
//     if (!patient_name || !date || !doctorName) {
//       return res.status(400).json({ message: "Patient name, date, and doctor name are required" });
//     }

//     // Fetch patient ID from the Patient model using the patient_name
//     const patientRecord = await patientModel.findOne({ name: patient_name });

//     if (!patientRecord) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const patientId = patientRecord._id;

//     // Create the new appointment
//     const newAppointment = new appointmentModel({
//       patient: patientId,
//       patient_name,
//       date,
//       doctorName,
//     });

//     const savedAppointment = await newAppointment.save();

//     res.status(201).json({
//       message: "Appointment created successfully",
//       data: savedAppointment,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating appointment", error: error.message });
//   }
// };
// Create a new appointment
// const createAppointment = async (req, res) => {
//   try {
//     const { patient, date, doctorName } = req.body;

//     // Validate required fields
//     if (!patient || !date || !doctorName) {
//       return res.status(400).json({ message: "Patient, date, and doctorName are required" });
//     }

//     // Fetch patient name from the Patient model
//     const patientRecord = await Patient.findById(patient);

//     if (!patientRecord) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const patient_name = patientRecord.name; // Assuming the Patient model has a 'name' field

//     // Create the new appointment
//     const newAppointment = new Appointment({
//       patient,
//       patient_name,
//       date,
//       doctorName,
//     });

//     const savedAppointment = await newAppointment.save();

//     res.status(201).json({
//       message: "Appointment created successfully",
//       data: savedAppointment,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating appointment", error: error.message });
//   }
// };

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find()
      .populate("patient", "name email") // Populate patient field with 'name' and 'email'
      .sort({ date: 1 }); // Sort appointments by date (earliest first)

    res.status(200).json({
      message: "Appointments retrieved successfully",
      data: appointments,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error retrieving appointments", error: error.message });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  deleteAppointment,
};
