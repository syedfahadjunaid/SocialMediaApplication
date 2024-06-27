import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxLabels({ selectedData, data, getValue }) {
  const [selectedValue, setSelectedValue] = React.useState([]);
  React.useEffect(() => {
    getValue(selectedValue);
  }, [selectedValue]);

  const renderedCheckboxes = data.map((value, index) => {
    const findSelectedData = selectedData?.find((selectedValue) => {
      return selectedValue === value;
    });
    let checked = false;
    if (findSelectedData === value) {
      checked = true;
    }
    return (
      <FormControlLabel
        key={index}
        control={
          <Checkbox
            checked={checked}
            onChange={(e) =>
              setSelectedValue([...selectedValue, e.target.value])
            }
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: "white",
              },
            }}
          />
        }
        label={value}
        value={value}
      />
    );
  });
  return (
    <>
      <FormGroup>
        {/* <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: "white",
              },
            }}
          />
        }
        label='Male'
      /> */}
        <div className='grid grid-cols-4 gap-[10px]'>{renderedCheckboxes}</div>
        <button
          className='bg-white font-[600] w-fit text-black p-[8px] rounded'
          onClick={(e) => {
            e.preventDefault();
            setSelectedValue([]);
          }}>
          Reset
        </button>
      </FormGroup>
    </>
  );
}
