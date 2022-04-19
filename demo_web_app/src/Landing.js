import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./Landing.scss";

function Landing() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.Countly.q.push(['track_pageview','Landing Screen']);
  }, []);

  const navigateClicked = () => {
    window.Countly.q.push([
      "add_event",
      {
        key: "Pressed Navigate",
      },
    ]);
    navigate("/Not_Landing_Screen");
  };

  const pointlessButtonPressed = () => {
    window.Countly.q.push([
      "add_event",
      {
        key: "Pressed Pointless",
      },
    ]);
    setCount(count + 1);
  };

  return (
    <section id="entry-page">
      <form>
        <h2>Welcome Back!</h2>
        <button type="button" onClick={navigateClicked}>
          Navigate
        </button>
        <button type="button" onClick={pointlessButtonPressed}>
          Pointless Button {count > 0 ? "x " + count : ""}
        </button>
      </form>
    </section>
  );
}

export default Landing;
