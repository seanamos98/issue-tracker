const Joi = require("@hapi/joi");
express = require("express");
const router = express.Router();
const Issue = require("../model/Issues");

// get all issues
router.get("/", async (req, res) => {
  res.send("we are on getting all issues route");
  // try {
  //   const issues = await Issue.find();
  //   res.json(issues);
  // } catch (err) {
  //   res.json({ message: err });
  // }
});

// get a issue
router.get("/:issueId", async (req, res) => {
  try {
    const issue = await Issue.findByid(req.params.issuesId);
    res.json(issue);
  } catch (err) {
    res.json({ message: err });
  }
});
// post a issues
router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const issue = new Issue({
    summary: req.body.summary,
    description: req.body.description,
    identified_by_person_id: req.body.identified_by_person_id,
    related_project_id: req.body.related_project_id,
    status: req.body.status,
    priority: req.body.priority,
    progress: req.body.progress,
    resolution_summary: req.body.resolution_summary,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
  });
  try {
    const savedIssue = await issue.save();

    res.status(200).json(savedIssue);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete a issues
router.get("/:issueId", async (req, res) => {
  try {
    const removedIssue = await Issue.removedIssues({
      _id: req.params.issueId,
    });
    res.status(200).json(removedIssue);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a part of a issues
router.patch("/:issueId", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const updatedIssue = await Issue.updateOne(
      { _id: req.params.issuesId },
      { $set: { name: req.body.name } }
    );

    res.status(200).json(updatedIssue);
  } catch (err) {
    res.json({ message: err });
  }
});

// update a issues
router.put("/:issueId", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const updatedIssue = await Issue.update({ _id: req.params.issueId });
    res.status(200).json(updatedIssue);
  } catch (err) {
    res.json({ message: err });
  }
});

//validate issues

const schema = {
  summary: Joi.string,
  description: Joi.string,
};

// const schema = {
//   summary: Joi.string().min(10).require(),
//   description: Joi.string().min(20).require(),
//   identified_by_person_id: Joi.string().min(3).require(),
//   related_project_id: Joi.string().min(3).require(),
//   status: Joi.string().min(6).require(),
//   priority: Joi.string().min(3).require(),
//   progress: Joi.string().min(6).require(),
//   resolution_summary: Joi.string().min(10).require(),
//   created_by: Joi.string().min(5).require(),
//   modified_by: Joi.string().min(5).require(),
// };

module.exports = router;
