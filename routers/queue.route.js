const express = require('express');
const { addPatientToQueue, getAllPatientsInQueue, editPatientInQueue, deletePatientFromQueue } = require('../controllers/queue.controller');

const router = express.Router();



router.post('/add', addPatientToQueue);
router.get('/', getAllPatientsInQueue);
router.put('/:queue_id', editPatientInQueue); 
router.delete('/:queue_id', deletePatientFromQueue); 
module.exports = router;
