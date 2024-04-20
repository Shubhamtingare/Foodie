const express = require("express");
const router = express.Router();

router.get("/fooddata", (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.send("server error");
  }
});

module.exports = router;
