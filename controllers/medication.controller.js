const Medication = require("../models/medication.model");



// Add Medication
    const addMedication = async (req, res) => {
    const { name, description } = req.body;
    const medication = new Medication({ name, description });
  
    try {
      await medication.save();
      res.send('Medication added successfully');
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: 'Failed to add medication', details: err.message });
    }
  };

  
  // Get All Medications
  const getAllMedications = async (req, res) => {
    try {
      const medications = await Medication.find();
      res.json(medications);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  
  // Delete Medication
  const DeleteMedication = async (req, res) => {
    try {
      await Medication.findByIdAndDelete(req.params.id);
      res.send('Medication deleted successfully');
    } catch (err) {
      res.status(400).send(err);
    }
  };

  module.exports = {addMedication, getAllMedications, DeleteMedication};