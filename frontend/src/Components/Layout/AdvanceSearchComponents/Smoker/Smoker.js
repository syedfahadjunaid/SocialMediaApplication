import React from "react";
import "./Smoker.css";
function Smoker() {
  return (
    <div className="smoker">
      <p>Choose Smoking Status</p>
      <span>
        <input type="checkbox" />
        <p>Dont Mind</p>
      </span>{" "}
      <span>
        <input type="checkbox" />
        <p>Only Show Smokers</p>
      </span>{" "}
      <span>
        <input type="checkbox" />
        <p>Don’t Show Smokers</p>
      </span>
    </div>
  );
}

export default Smoker;
