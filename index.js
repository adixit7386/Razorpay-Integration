const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

const Razorpay = require("razorpay");
app.use(bodyParser.json());
app.use(cors());

var instance = new Razorpay({
  key_id: your_keyId,
  key_secret: your_secretId,
});
// app.use(express.static("public"));

app.post("/capture/:paymentId", (req, res) => {
  try {
    console.log("payment");
    return request(
      {
        method: "POST",
        url: `https://${keyId}:${secredId}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: 10 * 100, // amount == Rs 10 // Same As Order amount
          currency: "INR",
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});
app.get("/order", (req, res) => {
  try {
    console.log("orders");
    const options = {
      amount: 10 * 100, // amount == Rs 10
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0,
      // 1 for automatic capture // 0 for manual capture
    };
    instance.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});
app.listen(3001, () => console.log(`Example app listening on port 3001!`));
