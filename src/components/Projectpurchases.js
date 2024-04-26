import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Cancel, Visibility } from '@mui/icons-material';

const GradientDetailsButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));
function formatDateTime(inputDateString) {
    const date = new Date(inputDateString);
    
    // Get the year, month, day, hours, minutes, and seconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Construct the formatted date-time string
    const formattedDateTimeString = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedDateTimeString;
  }
  
const CategoryTable = ({ data }) => {
  const columns = [
    { id: 'buyername', label: 'Buyer Name' },
    { id: 'amount', label: 'Amount' },
    { id: 'date', label: 'Date' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.BuyerName}</TableCell>
              <TableCell>{row.Amount}</TableCell>
              <TableCell>
                {formatDateTime(row.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Projectpurchases = ({ open, handleClose, data }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ fontWeight: 'bold' }}>Buyer Details</DialogTitle>
      <DialogContent>
     
        <CategoryTable data={data} />
      </DialogContent>
      <DialogActions>
        <GradientDetailsButton
          variant="contained"
          size="small"
          onClick={handleClose}
          startIcon={<Cancel />}
          style={{ borderRadius: 10 }}
        >
          Close
        </GradientDetailsButton>
      </DialogActions>
    </Dialog>
  );
};

export default Projectpurchases;
