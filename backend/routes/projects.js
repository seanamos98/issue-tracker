const Joi = "@hapi/joi";
const express = require("express");
const router = express.Router();
const Project = require("../model/Projects");

// get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.json({ message: err });
  }
});

// get a project
router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findByid(req.params.projectId);
    res.json(project);
  } catch (err) {
    res.json({ message: err });
  }
});
// post a project
router.post("/", async (req, res) => {
  // const { error } = schema.validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const project = new Project({
    name: req.body.name,
  });
  try {
    const savedProject = await project.save();
    res.status(200).json(savedProject);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete a project
router.delete("/:projectId", async (req, res) => {
  try {
    const removedProject = await Project.removedProject({
      _id: req.params.projectId,
    });
    res.json(removedProject);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a part of a project
router.patch("/:projectId", async (req, res) => {
  try {
    const updatedProject = await Project.updateOne(
      { _id: req.params.projectId },
      { $set: { name: req.body.name } }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res.json({ message: err });
  }
});

// update a project
router.put("/:projectId", async (req, res) => {
  try {
    const updatedProject = await Project.update({ _id: req.params.projectId });

    res.status(200).json(updatedProject);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
