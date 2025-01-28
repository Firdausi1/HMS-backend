const mongoose = require('mongoose');

// Define the Queue schema
const queueSchema = new mongoose.Schema(
  {
    patient: { 
      type: mongoose.Schema.Types.ObjectId,  // Reference to the Patient model
      ref: 'Patient',                        // Refers to the 'Patient' model
      required: true,                        // Make sure the patient is required
    },
    patient_name: { 
      type: String, 
      required: true 
    },
    vitals: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    }
  },
  { timestamps: true }  // This will automatically add createdAt and updatedAt fields
);

// Create the Queue model based on the schema
const queueModel = mongoose.model('Queue', queueSchema);

// Export the model
module.exports = queueModel;


