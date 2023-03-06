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
app.get("/api", (req, res) => {
  res.send("api");
});
app.get("/api/teszt", (req, res) => {
  res.send("teszt");
});
app.get("/api/success", (req, res) => {
  res.send("success");
});
app.get("/api/cancel", (req, res) => {
  res.send("cancel");
});
app.post("/api/checkout", async (req, res, next) => {
  console.log("try");
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price: item.item_id,
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://130.61.91.43/api/success",
      cancel_url: "http://130.61.91.43/api/cancel",
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
