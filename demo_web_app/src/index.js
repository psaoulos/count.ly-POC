import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Countly from "countly-sdk-web";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NotLanding from "./NotLanding";

window.Countly = Countly;
Countly.init({
  app_key: "279592198841457c4cf818070149ae365d668bb6",
  url: "http://localhost",
  session_update: 10,
  use_session_cookie: true,
  debug: false,
  require_consent: true,
  namespace: "demo_web_app",
  inactivity_time: 1,
  offline_mode: false,
  // device_id: "cly-device-demo-id" //Set only if you dont want to use countly generated device_id
});
Countly.q.push([
  "group_features",
  {
    activity: ["sessions", "events", "views", "location"],
    interaction: ["scrolls", "clicks", "crashes"],
    whereabouts: ["users"],
  },
]);
if (typeof localStorage !== "undefined") {
  var consents = localStorage.getItem("consents");

  if (consents) {
    Countly.q.push(["add_consent", JSON.parse(consents)]);
  } else {
    var consent = window.confirm(
      "We are going to track you. Do you give your consent ?"
    );
    consents = ["activity", "interaction", "whereabouts"];
    if (consent) {
      Countly.q.push(["add_consent", consents]);
      localStorage.setItem("consents", JSON.stringify(consents));
    } else {
      Countly.q.push(["remove_consent", consents]);
      localStorage.removeItem("consents");
    }
  }
}
Countly.q.push(["track_sessions"]);
Countly.q.push(["track_scrolls"]);
Countly.q.push(["track_clicks"]);
Countly.q.push(["track_links"]);
Countly.q.push(["track_errors"]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="landing" element={<App />} />
      <Route path="notlanding" element={<NotLanding />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
