const express = require("express");
const router = express.Router();
const MemberShip = require("./models/memberShipModels"); // Assuming you have a Membership model

router.post("/add", async (req, res) => {
  try {
    const { fullName, usernameOrEmail, date, description, item } = req.body;
    // const { usernameOrEmail, item } = req.body;

    // Check if user exists by usernameOrEmail
    let existingMember = await MemberShip.findOne({ usernameOrEmail });

    if (existingMember) {
      // If user exists, update the item if it doesn't already exist
      const existingItem = existingMember.item.find((i) => i._id === item._id);

      //   if (existingItem) {
      //     // Update existing item properties if needed
      //     existingItem.banner = item.banner;
      //     existingItem.description = item.description;
      //     existingItem.eventDate = item.eventDate;
      //     existingItem.eventTitle = item.eventTitle;
      //   } else {
      //     // Add new item to the array
      //     existingMember.item.push(item);
      //   }
      if (existingItem) {
        return res.status(200).json({ error: "Item already exists" });
      }

      // Add new item to the array
      existingMember.item.push({
        ...item,
        joiningDate: date,
        fullName,
        whyJoining: description,
      });
      await existingMember.save();

      //   await existingMember.save();

      return res.status(200).json({ message: "Item updated successfully" });
    } else {
      // If user doesn't exist, create a new member
      const newMemberItem = {
        joiningDate: date,
        fullName,
        whyJoining: description,
        ...item,
      };

      const newMember = new MemberShip({
        usernameOrEmail,
        item: [newMemberItem],
      });
      await newMember.save();

      return res
        .status(201)
        .json({ message: "New member created successfully" });
    }
  } catch (error) {
    console.error("Error posting data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const { email } = req.query;
    const productForUser = await MemberShip.find({ usernameOrEmail: email });
    // console.log(email);
    res.status(200).json(productForUser[0]);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    // Find the user by userId
    const user = await MemberShip.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the item to be deleted
    const itemIndex = user.item.findIndex((item) => item._id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Remove the item from the user's membership array
    user.item.splice(itemIndex, 1);

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
