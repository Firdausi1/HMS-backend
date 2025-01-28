const express = require("express");
const {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department.controller");
const router = express.Router();

router.get("/", getDepartments);
router.get("/:department_id", getDepartment);
router.post("/", createDepartment);
router.put("/:department_id", updateDepartment);
router.delete("/:department_id", deleteDepartment);

module.exports = router;
