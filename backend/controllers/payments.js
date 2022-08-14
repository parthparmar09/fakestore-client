const crypto = require("crypto");
const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
const startOrder = (req, res, next) => {
  params = {
    amount : req.body.amount,
    currency: "INR",
    receipt: `${Date.now()}`,
    payment_capture: "1",
  }
  instance.orders
    .create(params)
    .then((data) => {
      res.send({ sub: data, status: "success" });
    })
    .catch((error) => {
      res.send({ sub: error, status: "failed" });
    });
};

const verifyOrder = (req, res, next) => {
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  var response = { status: "failure" };
  if (expectedSignature === req.body.razorpay_signature) {
    response = { status: "success" };
  }
  res.send(response);
};


module.exports = {startOrder , verifyOrder}