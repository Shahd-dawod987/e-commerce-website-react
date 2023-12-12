import React from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="secondary"
      size="small"
    />
  );
};

export default PaginationComponent;
