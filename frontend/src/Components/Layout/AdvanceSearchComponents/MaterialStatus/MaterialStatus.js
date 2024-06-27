import React from "react";
import "./MaterialStatus.css";
function MaterialStatus() {
  return (
    <div className="materialstatus">
      <p>MARITAL STATUS</p>
      <span>
        <input type="checkbox" />
        <p>Any</p>
      </span>{" "}
      <span>
        <input type="checkbox" />
        <p>Single</p>
      </span>
       <span>
        <input type="checkbox" />
        <p>Married</p>
      </span>
       <span>
        <input type="checkbox" />
        <p>Divorced</p>
      </span>
      <span>
        <input type="checkbox" />
        <p>Separated</p>
      </span>
       <span>
        <input type="checkbox" />
        <p>Widowed</p>
      </span>
    </div>
  );
}

export default MaterialStatus;
