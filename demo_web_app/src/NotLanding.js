import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.scss";

function NotLanding() {
  const navigate = useNavigate();

  useEffect(() => {
    window.Countly.q.push(['track_pageview','Not the Landing Screen']);
  }, []);

  const goBackClicked = () => {
    window.Countly.q.push([
      "add_event",
      {
        key: "Pressed Go Back",
      },
    ]);
    navigate("/Landing_Screen");
  };

  return (
    <section id="entry-page">
      <form>
        <h2>Go Back!</h2>
        <button type="button" onClick={goBackClicked}>
          Go Back now
        </button>
      </form>
    </section>
  );
}

export default NotLanding;
