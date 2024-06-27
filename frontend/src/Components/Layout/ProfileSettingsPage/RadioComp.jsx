import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

export default function RadioButtonsGroup({
  selectedUserData,
  data,
  selectedValue,
}) {
  const [userSelection, setUserSelection] = React.useState();
  React.useEffect(() => {
    selectedValue(userSelection);

    // console.log(userSelection);
  }, [userSelection]);

  const renderedRadioButtons = data.map((value, index) => {
    return (
      <FormControlLabel
        sx={{
          width: 200,
        }}
        key={index}
        value={value}
        control={
          <Radio
            checked={selectedUserData === value}
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: "white",
              },
            }}
          />
        }
        label={value}
      />
    );
  });
  return (
    <FormControl>
      {/* <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel> */}
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue=''
        onChange={(e) => setUserSelection(e.target.value)}
        name='radio-buttons-group'>
        {/* <FormControlLabel value='female' control={<Radio />} label='Female' />
        <FormControlLabel value='male' control={<Radio />} label='Male' />
        <FormControlLabel value='other' control={<Radio />} label='Other' /> */}
        <div className='grid grid-cols-3 gap-[1rem]'>
          {renderedRadioButtons}
        </div>
      </RadioGroup>
    </FormControl>
  );
}
