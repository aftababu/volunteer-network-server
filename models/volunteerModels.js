const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  eventDate: { type: Date, required: true },
  description: { type: String },
  banner: { type: String },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
