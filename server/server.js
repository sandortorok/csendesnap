const cors = require("cors");
const bodyparser = require("body-parser");

const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(
  "sk_test_51MiKQsAMXAbMlIgogb78I7ZBEjRbVciSjwcn48fL3jbfIVihDhSdY0sWwFXYiBw3Pi3Qs22HXWeaVoK3OeF2VXRL00hLXnjIzQ"
);
app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/checkout", async (req, res, next) => {
  console.log("try");
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price: "price_1MiLBFAMXAbMlIgobpcSYy1w",
        quantity: 2,
      })),
      mode: "payment",
      success_url: "http://130.61.91.43/success.html",
      cancel_url: "http://130.61.91.43/cancel.html",
    });
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
  console.log("finish");
});

app.listen(4242, () => {
  console.log("App is running on 4242");
});
