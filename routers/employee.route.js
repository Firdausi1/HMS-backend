const express = require("express");
const {
  getEmployee,
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  loginEmployee,
} = require("../controllers/employee.controller");
const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/register", createEmployee);
router.post("/login", loginEmployee);
router.delete("/:id", deleteEmployee);
router.put("/:id", updateEmployee);

module.exports = router;
