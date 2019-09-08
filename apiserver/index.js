const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/outlines", async (req, res) => {
  const response = await axios.post("analyzer:8000/get_outline", req.body);
  console.log(response);
  res.send(response);
});

app.post("/keywords", async (req, res) => {
  const response = await axios.post("analyzer:8000/get_keyword", req.body);
  console.log(response);
  res.send(response);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started at port " + PORT));
