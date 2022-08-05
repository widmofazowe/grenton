const express = require("express");
const miio = require("miio");

require("dotenv").config();

const app = express();
const port = 4000;

app.get("/roborock/:method", async (req, res) => {
  const { method } = req.params;
  try {
  const device = await miio
    .device({
      address: process.env.ROBOROCK_IP,
      token: process.env.ROBOROCK_TOKEN,
    });
    console.log("Connected to", device);
    console.log("Running", method);

    const result = await device[method]();
    res.json({ result });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: err });
  };
});

app.listen(port, () => {
  console.log(`MI-HOME API listening at http://localhost:${port}`);
  console.log(process.env.ROBOROCK_IP);
});