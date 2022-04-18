import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.scss";

function NotLanding() {
  const navigate = useNavigate();

  useEffect(() => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Not the Landing Screen" }),
      };
      fetch("http://localhost:3000/trackView", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(JSON.stringify(data));
        });
  }, []);

  const goBackClicked = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "Pressed Go Back" }),
    };
    fetch("http://localhost:3000/addEvent", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        navigate("/");
      });
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
