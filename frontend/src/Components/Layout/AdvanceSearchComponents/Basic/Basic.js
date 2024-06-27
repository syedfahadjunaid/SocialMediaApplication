import React from "react";
import "./Basic.css";
function Basic() {
  return (
    <div className="basic">
      <div className="basic_div">
        <p>Looking for</p>
        <span>
          <input type="checkbox" />
          <p>a man</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>a woman</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>a couple (Male/Female)</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>a male couple (2 men)</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>a female couple (2 women)</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>TV/TS</p>
        </span>
      </div>
      <div className="basic_div">
        <p>Who wants to meet:</p>
        <span>
          <input type="checkbox" />
          <p>Man</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>Woman</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>Couple (Male/Female)</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>Male couple (2 men)</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>Female couple (2 women)</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>TV/TS</p>
        </span>
      </div>
      <div className="basic_div">
        <p>Orientation</p>
        <span>
          <input type="checkbox" />
          <p>Spankee</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>Spanker</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>Switch</p>
        </span>
      </div>{" "}
      <div className="basic_div">
        <p>Aged Between:</p>
        <span>
          <select>
            <option>18</option>
            <option>19</option>
            <option>20</option>
          </select> 

          <p style={{marginLeft:'10px',marginRight:'10px'}}> to </p>

          <select>
            <option>58</option>
            <option>59</option>
            <option>60</option>
          </select>
        </span>
        <span>
            <input type="checkbox"/>
            <p>I must confirm the basic age requirements</p>
        </span>
      </div>{" "}
      <div className="basic_div">
        <p>Preferred Spanking</p>
        <span>
          <input type="checkbox" />
          <p>Very Light</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>Light</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>Normal</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>Hard</p>
        </span>
        <span>
          <input type="checkbox" />
          <p>Very Hard</p>
        </span>
      </div>
    </div>
  );
}

export default Basic;
