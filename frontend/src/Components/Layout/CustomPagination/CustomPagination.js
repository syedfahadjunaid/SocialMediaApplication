import React from "react";
import "./CustomPagination.css";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
function CustomPagination({ count, setPage }) {
  // console.log(count);
  return (
    <Stack
      spacing={2}
      style={{
        backgroundColor: "rgba(217, 217, 217, 0.50)",
        borderRadius: "4px",
        Padding: "5px",
      }}>
      <Pagination
        count={count}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 0);
        }}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}

export default CustomPagination;
