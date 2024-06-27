import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import { grey } from "@mui/material/colors";

export default function RadioButtonsGroup({ data, selection }) {
  const renderedRadioBtns = data.map((data, index) => {
    return (
      <FormControlLabel
        key={index}
        value={data}
        control={
          <Radio
            sx={{
              color: grey[200],
              "&.Mui-checked": {
                color: grey[200],
              },
            }}
          />
        }
        label={data}
      />
    );
  });
  return (
    <FormControl>
      {/* <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel> */}
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue={data[0]}
        name='radio-buttons-group'
        
        onChange={(e) => selection(e.target.value)}>
        {renderedRadioBtns}
      </RadioGroup>
    </FormControl>
  );
}
