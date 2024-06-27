import React, { useState } from "react";
import "./AdvanceSearch.css";
import Filter from "../Filter/Filter";
import Basic from "../AdvanceSearchComponents/Basic/Basic";
import Location from "../AdvanceSearchComponents/Location/Location";
import Smoker from "../AdvanceSearchComponents/Smoker/Smoker";
import Interest from "../AdvanceSearchComponents/Interest/Interest";
import Orgin from "../AdvanceSearchComponents/Orgin/Orgin";
import MaterialStatus from "../AdvanceSearchComponents/MaterialStatus/MaterialStatus";
import ProfileMembers from "../AdvanceSearchComponents/ProfileMembers/ProfileMembers";
function AdvanceSearch() {
  const [basic, setBasic] = useState(true);
  const [location, setLocation] = useState(false);
  const [smoker, setSmoker] = useState(false);
  const [interset, setInterset] = useState(false);
  const [origin, setOrigin] = useState(false);
  const [nationality, setNationality] = useState(false);
  const [materialStatus, setMaterialStatus] = useState(false);
  const [profileMembers, setProfileMembers] = useState(false);
  return (
    <div className="advancesearch">
      <div className="advancesearch_left">
        <Filter
          setProfileMembers={setProfileMembers}
          profileMembers={profileMembers}
          setMaterialStatus={setMaterialStatus}
          materialStatus={materialStatus}
          setNationality={setNationality}
          nationality={nationality}
          setOrigin={setOrigin}
          origin={origin}
          setInterset={setInterset}
          interset={interset}
          smoker={smoker}
          setSmoker={setSmoker}
          basic={basic}
          setBasic={setBasic}
          setLocation={setLocation}
          location={location}
        />
      </div>
      <div className="advancesearch_right">
        <h3>ADVANCED SEARCH FORM</h3>
        {basic && <Basic />}
        {location && <Location />}
        {smoker && <Smoker />}
        {interset && <Interest />}
        {origin && <Orgin />}
        {materialStatus && <MaterialStatus />}
        {profileMembers && <ProfileMembers />}
      </div>
    </div>
  );
}

export default AdvanceSearch;
