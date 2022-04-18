import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./Landing.scss";

function Landing() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Landing Screen" }),
      };
      fetch("http://localhost:3000/trackView", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(JSON.stringify(data));
        });
  }, []);

  const navigateClicked = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "Pressed Navigate" }),
    };
    fetch("http://localhost:3000/addEvent", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        navigate("/notlanding");
      });
  };

  const pointlessButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "Pressed pointless" }),
    };
    fetch("http://localhost:3000/addEvent", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        setCount(count + 1);
      });
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
