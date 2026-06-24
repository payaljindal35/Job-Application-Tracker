const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    console.log("POST ERROR:");
    console.log(err);
    
    res.status(500).json({ error: "Failed to create job" });
  }
});

router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.put("/:id", async (req, res) => {

  const updated = await Job.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

module.exports = router; 