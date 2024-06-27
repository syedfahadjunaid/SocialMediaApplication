import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels({ data, state, setState }) {
  //   const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const renderedMenuItems = data.map((value, index) => {
    return (
      <MenuItem key={index} value={value}>
        {value}
      </MenuItem>
    );
  });

  return (
    <div>
      <FormControl sx={{ m: 0, minWidth: "100%" }}>
        <InputLabel id='demo-simple-select-helper-label'>
          Choose a reason
        </InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={state}
          label='Choose a reason'
          onChange={handleChange}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {renderedMenuItems}
        </Select>
      </FormControl>
    </div>
  );
}
