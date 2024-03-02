import React from 'react';
import { Pagination as MUIPagination, Stack } from '@mui/material';
import {PaginationProps} from '../types/product'

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }:PaginationProps) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" padding={2}>
      <MUIPagination count={pageCount} page={currentPage} onChange={handleChange} variant="outlined" shape="rounded" />
    </Stack>
  );
};

export default Pagination;
