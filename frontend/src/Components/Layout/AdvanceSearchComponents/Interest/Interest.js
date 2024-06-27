import React from "react";
import "./Interest.css";
function Interest() {
  return (
    <div className="interest">
      <p>Choose Interests</p>
      <div className="interest_div">
        <span>
          <input type="checkbox" />
          <p>Any</p>
        </span>{" "}
        <span>
          <input type="checkbox" />
          <p>Any</p>
        </span>{" "}
        <span>
          <input type="checkbox" />
          <p>Any</p>
        </span>{" "}
        <span>
          <input type="checkbox" />
          <p>Any</p>
        </span>{" "}
        <span>
          <input type="checkbox" />
          <p>Any</p>
        </span>  <span>
          <input type="checkbox" />
          <p>Any</p>
        </span>
      </div>
    </div>
  );
}

export default Interest;
