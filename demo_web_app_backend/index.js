const express = require("express");
const cors = require("cors");
const Countly = require("countly-sdk-nodejs");
const app = express();
const port = 3000;
const corsOptions ={
   origin:'*',
   credentials:false,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.post("/innitSession", (req, res) => {
  try {
    Countly.init({
      debug: false,
      app_key: "YOUR_APP_KEY",
      device_id: "1234-1234-1234-1234",
      url: "https://try.count.ly",
      app_version: "1.2",
      country_code: "LV",
      city: "Riga",
      ip_address: "83.140.15.1",
      http_options: function (options) {
        options.headers["user-agent"] = "Test";
      },
      metrics: {
        _os: "Ubuntu",
        _os_version: "16.04",
        _device: "aws-server",
      },
    });
    Countly.begin_session(noHeartBeat);
    res.sendStatus(200);
  } catch (ex) {
    res.sendStatus(500);
  }
});

app.post("/endSession", (req, res) => {
  try {
    Countly.end_session()
    res.sendStatus(200);
  } catch (ex) {
    res.sendStatus(500);
  }
});

app.post("/trackView", (req, res) => {
  console.log('req', JSON.stringify(req))
  try {
    console.log('Got', req.body.name)
    // Countly.track_view(req.body.name);
    res.sendStatus(200);
  } catch (ex) {
    console.log(JSON.stringify(ex))
    res.sendStatus(500);
  }
});

app.post("/addEvent", (req, res) => {
  console.log('req', JSON.stringify(req))
  try {
    console.log('Got', req.body.key)
    // Countly.add_event({
    //   key: req.body.key,
    //   count: 1,
    // });
    res.sendStatus(200);
  } catch (ex) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`demo_web_app_backend listening on port ${port}`);
});
