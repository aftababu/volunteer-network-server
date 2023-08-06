const mongoose = require("mongoose");

const memberShipSchema = new mongoose.Schema({
  usernameOrEmail: String,
  item: [
    {
      _id: String,
      banner: String,
      description: String,
      eventDate: String,
      eventTitle: String,
      joiningDate: Date,
      whyJoining: String,
      fullName: String,
    },
  ],
});

const MemberShip = mongoose.model(
  "MemberShip",
  memberShipSchema,
  "memberShips"
);

module.exports = MemberShip;
