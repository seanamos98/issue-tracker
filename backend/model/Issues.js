const mongoose = require("mongoose");

// create Schema
const issuesSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  identified_by_persn_id: {
    type: String,
    required: true,
  },
  identified_date: {
    type: Date,
    default: Date.now,
  },
  related_project_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  target_resolution_date: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: String,
    required: true,
  },
  actual_resolution_date: {
    type: Date,
    default: Date.now,
  },
  resolution_summary: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
    required: true,
  },
  modified_on: {
    type: Date,
    default: Date.now,
  },
  modified_by: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("issues", issuesSchema);
