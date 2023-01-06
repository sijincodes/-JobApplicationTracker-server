const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Job = require("./../models/Job.model.js");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

// CRUD  --> Create Read Update Delete

//Creat Job
router.post("/job", isAuthenticated, async (req, res, next) => {
  const { jobRole, companyName, jobUrl, salary, notes, interviewStage } =
    req.body;
  try {
    const jobs = await Job.create({
      jobRole: jobRole,
      companyName: companyName,
      jobUrl: jobUrl,
      salary: salary,
      notes: notes,
      interviewStage: interviewStage,
      userId: req.payload._id,
    });
    res.status(201).json(jobs);
  } catch (error) {
    next(error);
  }
});

// Get Job
router.get("/job", isAuthenticated, async (req, res, next) => {
  try {
    const searchResults = await Job.find({
      userId: req.payload._id,
    });
    res.status(201).json(searchResults);
  } catch (error) {
    next(error);
  }
});

//Update Job
router.put("/job/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { jobRole, companyName, jobUrl, salary, notes, interviewStage } =
    req.body;
  try {
    const jobUpdate = await Job.findByIdAndUpdate(
      id,
      {
        jobRole,
        companyName,
        jobUrl,
        salary,
        notes,
        interviewStage,
      },
      { new: true }
    );
    jobUpdate.save();
    res.status(200).json(jobUpdate);
  } catch (error) {
    next(error);
  }
});

// Delete Job
router.delete("/job/:id",isAuthenticated,async(req,res,next)=>{
  const {id} = req.params
  try {
    const jobDeleted = await Job.findByIdAndRemove(id);
    res.status(200).json(jobDeleted);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
