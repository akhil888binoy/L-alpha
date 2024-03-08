import React from "react";
import { Pagination } from "@mui/material";
import {useMediaQuery} from "@mui/material";
const SponsorCustomPagination = ({ page, limit, total, setPage }) => {
  const pageCount = Math.ceil(total / limit);

  const handleChange = (sponsor,value) => {
    setPage(value);
  };
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (

    <Pagination
   size={isNonMobileScreens? "large" : "small"}
      count={pageCount}
      page={page}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      color="primary"
    />
  );
};

export default SponsorCustomPagination;
