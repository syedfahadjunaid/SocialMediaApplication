import React from "react";
import "./ProfileMembers.css";
function ProfileMembers() {
  return (
    <div className="materialstatus">
      <p>Choose Interests</p>
      <span>
        <input type="checkbox" />
        <p>Who are bisexual (or bi-curious)</p>
      </span>{" "}
      <span>
        <input type="checkbox" />
        <p>Who can accommodate</p>
      </span>
      <span>
        <input type="checkbox" />
        <p>Who can travel</p>
      </span>
      <span>
        <input type="checkbox" />
        <p>New in the past 5 days</p>
      </span>
    </div>
  );
}

export default ProfileMembers;
