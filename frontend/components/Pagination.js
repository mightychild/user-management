import { Pagination as MuiPagination, Stack } from '@mui/material';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <Stack spacing={2} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        color="primary"
      />
    </Stack>
  );
}