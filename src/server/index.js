const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios").default;
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/analysis", async function (req, res) {
  try {
    const meaningcloudRes = await axios({
      method: "post",
      url: "https://api.meaningcloud.com/sentiment-2.1",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      data: {
        key: process.env.MEANINGCLOUD_LICENSE_KEY,
        lang: "en",
        txt: req.body.text,
      },
    });

    res.send(meaningcloudRes.data);
  } catch (error) {
    throw Error(error);
  }
});

let port = process.env.PORT || 8081;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log("App listening on port 8081!");
});
