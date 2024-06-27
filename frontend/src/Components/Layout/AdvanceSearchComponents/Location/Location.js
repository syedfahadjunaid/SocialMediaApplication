import React from "react";
import "./Location.css";
function Location() {
  return (
    <div className="location">
      <div className="location_top">
        <span>
          <p>ENTER OR YOUR COUNTRY</p>
          <input type="text" placeholder="ENTER COUNTRY" />
        </span>
        <span>
          <p>ENTER YOUR POSTCODE</p>
          <input type="text" placeholder="POSTCODE" />
        </span>
      </div>  
      <div className="location_bottom">
        <span>
          <p>ENTER OR YOUR COUNTRY</p>
          <input type="text" placeholder="ENTER COUNTRY" />
        </span>
        <span>
          <p>ENTER YOUR POSTCODE</p>
          <input type="text" placeholder="POSTCODE" />
        </span>
      </div>
    </div>
  );
}

export default Location;
