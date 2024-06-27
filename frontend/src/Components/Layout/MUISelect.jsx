import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { grey } from "@mui/material/colors";

export default function SelectVariants({
  data,
  selection,
  selectedValue,
  heading,
}) {
  //   const [age, setAge] = React.useState("");

  const renderedOptions = data.map((option, index) => {
    return (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    );
  });

  const handleChange = (event) => {
    selection(event.target.value);
  };

  return (
    <div>
      <FormControl
        variant='filled'
        sx={{ width: "100%", color: "white", borderRadius: "4px" }}>
        <InputLabel id='demo-simple-select-filled-label'>
          <p className='text-white'>{heading}</p>
        </InputLabel>
        <Select
          sx={{
            color: "white",
          }}
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={selectedValue}
          onChange={handleChange}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {renderedOptions}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}
