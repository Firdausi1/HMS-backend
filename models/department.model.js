const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

const departmentModel = mongoose.model("Department", DepartmentSchema);
module.exports = departmentModel;
