import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function BasicAccordion({ heading, content }) {
  const style = {
    bgcolor: "transparent",
    color: "white",
  };
  return (
    <div>
      <Accordion sx={style}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography>
            <h3 className='text-[22px] font-[600]'>{heading}</h3>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
          {content}
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'>
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'>
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
}

// import React, { useState } from "react";
// import "./DropdownComp.css";

// import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

// export default function DropdownComp({ heading }) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   return (
//     <div className='profileSettingsDropdownComp p-[1rem]'>
//       <div className='flex flex-row justify-between border-b-[#B36779] border-solid border-b-[1px] py-[10px] items-center'>
//         {heading}
//         {!dropdownOpen ? (
//           <IoIosArrowDown
//             className='text-[25px] cursor-pointer'
//             onClick={() => setDropdownOpen(true)}
//           />
//         ) : (
//           <IoIosArrowUp
//             className='text-[25px] cursor-pointer'
//             onClick={() => setDropdownOpen(false)}
//           />
//         )}
//       </div>
//       {dropdownOpen && (
//         <div className={`${dropdownOpen ? "slide-bottom" : "slide-out-top"} `}>
//           Dropdown Opened
//         </div>
//       )}
//     </div>
//   );
// }
