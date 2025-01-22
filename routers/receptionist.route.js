const express= require("express");
const { registerReceptionist, loginReceptionist, getAllReceptionist, editReceptionist, deleteReceptionist } = require("../controllers/receptionist.controller");

const router = express.Router();

router.post("/register",registerReceptionist);
router.post("/login", loginReceptionist);
router.get("/", getAllReceptionist);
router.put("/:receptionist_id", editReceptionist); // Edit a receptionist
router.delete("/:receptionist_id", deleteReceptionist); // Delete a receptionist





module.exports = router;