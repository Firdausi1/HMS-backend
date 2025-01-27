const queueModel = require('../models/queue.model');
const patientModel = require('../models/patient.model'); // Assuming you have a Patient schema



const addPatientToQueue = async (req, res) => {
  try {
    const { patient_name } = req.body;

    // Validate that the patient name is provided
    if (!patient_name) {
      return res.status(400).json({ message: 'Patient name is required' });
    }

    // Find the patient by name (assuming 'name' is unique)
    const patient = await patientModel.findOne({ name: patient_name });

    // Check if the patient exists in the database
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if the patient is already in the queue
    const isInQueue = await queueModel.findOne({ patient: patient._id });
    if (isInQueue) {
      return res.status(400).json({ message: 'Patient is already in the queue' });
    }

    // Add the patient to the queue
    const newQueueEntry = new queueModel({ patient: patient._id, patient_name });
    await newQueueEntry.save();

    res.status(201).json({
      message: 'Patient added to the queue successfully',
      data: newQueueEntry,
    });
  } catch (error) {
    console.error('Error adding patient to the queue:', error); // Log for debugging
    res.status(500).json({ message: 'Error adding patient to the queue', error: error.message });
  }
};


// const addPatientToQueue = async (req, res) => {
//   try {
//     const { patient_id } = req.body;

//     // Validate that the patient ID is provided
//     if (!patient_id) {
//       return res.status(400).json({ message: 'Patient ID is required' });
//     }

//     // Check if the patient exists in the database
//     const patientExists = await patientModel.findById(patient_id);
//     if (!patientExists) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     // Check if the patient is already in the queue
//     const isInQueue = await queueModel.findOne({ patient: patient_id });
//     if (isInQueue) {
//       return res.status(400).json({ message: 'Patient is already in the queue' });
//     }

//     // Add the patient to the queue
//     const newQueueEntry = new queueModel({ patient: patient_id });
//     await newQueueEntry.save();

//     res.status(201).json({
//       message: 'Patient added to the queue successfully',
//       data: newQueueEntry,
//     });
//   } catch (error) {
//     console.error('Error adding patient to the queue:', error); // Log for debugging
//     res.status(500).json({ message: 'Error adding patient to the queue', error: error.message });
//   }
// };



// Get all patients in the queue
const getAllPatientsInQueue = async (req, res) => {
  try {
    // Fetch all queue entries and populate the patient information
    const queue = await queueModel.find().populate('patient', 'name'); // Include only the patient's name and email
    res.status(200).json(queue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching queue data', error });
  }
};

// Edit patient in the queue
const editPatientInQueue = async (req, res) => {
  try {
    const { queue_id } = req.params; // Queue entry ID
    const { patient_id, vitals } = req.body; // New patient ID
    

    // Validate the provided queue ID and patient ID
    if (!queue_id || !patient_id || !vitals) {
      return res.status(400).json({ message: 'Queue ID, Patient ID and Vitals are required' });
    }

    // Check if the new patient exists in the database
    const patientExists = await patientModel.findById(patient_id);
    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Validate the `vitals` value
    if (!['Pending', 'Completed'].includes(vitals)) {
      return res.status(400).json({ message: 'Invalid vitals value.' });
    }

    // Update the patient in the queue
    const updatedQueueEntry = await queueModel.findByIdAndUpdate(
      queue_id,
      { patient: patient_id, vitals },
      { new: true }
    ).populate('patient', 'name email');

    if (!updatedQueueEntry) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    res.status(200).json({
      message: 'Patient in the queue updated successfully',
      data: updatedQueueEntry,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient in the queue', error });
  }
};

// Delete patient from the queue
const deletePatientFromQueue = async (req, res) => {
  try {
    const { queue_id } = req.params; // Queue entry ID

    // Validate the provided queue ID
    if (!queue_id) {
      return res.status(400).json({ message: 'Queue ID is required' });
    }

    // Delete the patient from the queue
    const deletedQueueEntry = await queueModel.findByIdAndDelete(queue_id);

    if (!deletedQueueEntry) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    res.status(200).json({
      message: 'Patient removed from the queue successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error removing patient from the queue', error });
  }
};


module.exports = {
  addPatientToQueue,
  getAllPatientsInQueue,
  editPatientInQueue,
  deletePatientFromQueue,
};

