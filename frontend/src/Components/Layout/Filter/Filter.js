import React from "react";
import "./Filter.css";
import FilterAlt from "@mui/icons-material/FilterAlt";
import Done from "@mui/icons-material/Done";
function Filter({
  setProfileMembers,
  profileMembers,
  setMaterialStatus,
  materialStatus,
  setNationality,
  nationality,
  setOrigin,
  origin,
  setInterset,
  interset,
  smoker,
  setSmoker,
  basic,
  setBasic,
  location,
  setLocation,
}) {
  const filterHandle = (e) => {
    console.log(e.target.textContent);
    if (e.target.textContent === `Basic`) {
      setBasic(true);
      setLocation(false);
      setSmoker(false)
      setInterset(false)
      setOrigin(false)
      setNationality(false)
      setMaterialStatus(false)
      setProfileMembers(false)
    }
    if (e.target.textContent === `LOCATION`) {
      setBasic(false);
      setLocation(true);
      setSmoker(false)
      setInterset(false)
      setOrigin(false)
      setNationality(false)
      setMaterialStatus(false)
      setProfileMembers(false)
    }
    if (e.target.textContent === `SMOKERS`) {
      setBasic(false);
      setLocation(false);
      setSmoker(true)
      setInterset(false)
      setOrigin(false)
      setNationality(false)
      setMaterialStatus(false)
      setProfileMembers(false)
    }
     if (e.target.textContent === `INTERESTS`) {
      setBasic(false);
      setLocation(false);
      setSmoker(false)
      setInterset(true)
      setOrigin(false)
      setNationality(false)
      setMaterialStatus(false)
      setProfileMembers(false)
    } 
    if (e.target.textContent === `ORIGIN`) {
      setBasic(false);
      setLocation(false);
      setSmoker(false)
      setInterset(false)
      setOrigin(true)
      setNationality(false)
      setMaterialStatus(false)
      setProfileMembers(false)
    }
    if (e.target.textContent === `MARITAL STATUS`) {
      setBasic(false);
      setLocation(false);
      setSmoker(false)
      setInterset(false)
      setOrigin(false)
      setNationality(false)
      setMaterialStatus(true)
      setProfileMembers(false)
    }  
      if (e.target.textContent === `PROFILE MEMBERS`) {
      setBasic(false);
      setLocation(false);
      setSmoker(false)
      setInterset(false)
      setOrigin(false)
      setNationality(false)
      setMaterialStatus(false)
      setProfileMembers(true)
    }
  };
  return (
    <div className="filter">
      <div className="filter_heading">
        <h3>
          FILTERS <FilterAlt />
        </h3>
      </div>
      <span
        className={basic ? "filter_span_active " : "filter_span"}
        onClick={filterHandle}
      >
        <p>Basic</p>
        <span
          className={basic ? "filter_span_icon_active" : "filter_span_icon"}
        >
          <Done style={{fontSize:'12px'}}/>
        </span>
      </span>{" "}
      <span
        className={location ? "filter_span_active " : "filter_span"}
        onClick={filterHandle}
      >
        <p>LOCATION</p>
        <span
          className={location ? "filter_span_icon_active" : "filter_span_icon"}
        >
         <Done style={{fontSize:'12px'}}/>
        </span>
      </span>{" "}
      <span  className={smoker ? "filter_span_active " : "filter_span"} onClick={filterHandle}>
        <p>SMOKERS</p>
        <span className={smoker ? "filter_span_icon_active" : "filter_span_icon"}>
        <Done style={{fontSize:'12px'}}/>
        </span>
      </span>{" "}
      <span className={interset ? "filter_span_active " : "filter_span"} onClick={filterHandle}>
        <p>INTERESTS</p>
        <span className={interset ? "filter_span_icon_active" : "filter_span_icon"}>
        <Done style={{fontSize:'12px'}}/>
        </span>
      </span>{" "}
      <span className={origin ? "filter_span_active " : "filter_span"} onClick={filterHandle}>
        <p>ORIGIN</p>
        <span className={origin ? "filter_span_icon_active" : "filter_span_icon"}>
        <Done style={{fontSize:'12px'}}/>
        </span>
      </span>{" "}
      <span className={nationality ? "filter_span_active " : "filter_span"} onClick={filterHandle}>
        <p>NATIONALITY</p>
        <span className={nationality ? "filter_span_icon_active" : "filter_span_icon"}>
        <Done style={{fontSize:'12px'}}/>
        </span>
      </span>{" "}
      <span className={materialStatus ? "filter_span_active " : "filter_span"} onClick={filterHandle}>
        <p>MARITAL STATUS</p>
        <span className={materialStatus ? "filter_span_icon_active" : "filter_span_icon"}>
        <Done style={{fontSize:'12px'}}/>
        </span>
      </span>{" "}
      <span className={profileMembers ? "filter_span_active " : "filter_span"} onClick={filterHandle}>
        <p>PROFILE MEMBERS</p>
        <span className={profileMembers ? "filter_span_icon_active" : "filter_span_icon"}>
        <Done style={{fontSize:'12px'}}/>
        </span>
      </span>
      <div className="filter_button">
        <button>Reset</button>
        <button>Search</button>
      </div>
    </div>
  );
}

export default Filter;
