const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.order_date });

    let eId = await Order.findOne({ email: req.body.email });

    if (eId === null) {
      try {
        await Order.create({
          email: req.body.email,
          order_data: [data],
        }).then(() => {
          res.json({ success: true });
        });
      } catch (error) {
        res.send(error);
      }
    } else {
      try {
        await Order.findOneAndUpdate(
          { email: req.body.email },
          {
            $push: { order_data: data },
          }
        ).then(() => {
          res.json({ success: true });
        });
      } catch (error) {
        res.send(error);
      }
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/myOrderData",async(req,res)=>{
  try {
    const orderData = await Order.findOne({"email":req.body.email})
    res.json({orderData : orderData})

  } catch (error) {
    res.send(error);
  }
})

module.exports = router;
