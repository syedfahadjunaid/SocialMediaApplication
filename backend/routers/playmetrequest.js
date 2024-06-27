// PlaymetRequestRoutes.js
const express = require("express");
const router = express.Router();
const PlaymetRequest = require("../models/PlaymetRequestSchema");

// Create a PlaymetRequest
router.post("/PlaymetRequests", async (req, res) => {
  try {
    const newPlaymetRequest = await PlaymetRequest.create(req.body);
    res.status(201).json(newPlaymetRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all PlaymetRequests
router.get("/PlaymetRequests", async (req, res) => {
  try {
    const PlaymetRequests = await PlaymetRequest.find();
    res.json(PlaymetRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific PlaymetRequest by ID
router.get("/PlaymetRequests/:id", async (req, res) => {
  try {
    const PlaymetRequest = await PlaymetRequest.findById(req.params.id);
    if (!PlaymetRequest) {
      return res.status(404).json({ error: "PlaymetRequest not found" });
    }
    res.json(PlaymetRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a PlaymetRequest status by ID
router.put("/PlaymetRequests/:id", async (req, res) => {
  try {
    const updatedPlaymetRequest = await PlaymetRequest.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true }
    );
    if (!updatedPlaymetRequest) {
      return res.status(404).json({ error: "PlaymetRequest not found" });
    }
    res.json(updatedPlaymetRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a PlaymetRequest by ID
router.delete("/PlaymetRequests/:id", async (req, res) => {
  try {
    const deletedPlaymetRequest = await PlaymetRequest.findByIdAndDelete(req.params.id);
    if (!deletedPlaymetRequest) {
      return res.status(404).json({ error: "PlaymetRequest not found" });
    }
    res.json({ message: "PlaymetRequest deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
