const express = require("express");
const {
  getEmployee,
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  loginEmployee,
  updatePassword
} = require("../controllers/employee.controller");
const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/register", createEmployee);
router.post("/login", loginEmployee);
router.delete("/:id", deleteEmployee);
router.put("/:id", updateEmployee);
router.put("/update_password/:id", updatePassword);

module.exports = router;
