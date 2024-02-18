import React from "react";
import { Pagination } from "@mui/material";
const CustomPagination = ({ page, limit, total, setPage }) => {
  const pageCount = Math.ceil(total / limit);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Pagination
    color="primary"
      count={pageCount}
      page={page}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
    />
  );
};

export default CustomPagination;
