const express = require("express");
const router = express.Router();
const Event = require("./models/volunteerModels");

router.post("/events", async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = new Event(eventData);
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating event" });
  }
});
router.get("/get/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
});

module.exports = router;
