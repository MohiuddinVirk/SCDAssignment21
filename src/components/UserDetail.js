import React,{useState} from 'react';
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
import { linkurl } from '../link';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Projectpurchases from './Projectpurchases'
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

const CategoryTable = ({ data }) => {
    const [projectpurchases,setProjectpurchases]=useState(null)
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const columns = [
    { id: 'title', label: 'Title' },
    { id: 'technology', label: 'Technology' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'details', label: 'Details' },
  ];

const handleDetailsDialogClose = () => {
    setProjectpurchases(null);
    setDetailsDialogOpen(false);
  };
  
  const handleGetpurchases=async(id)=>{
    console.log(id)
        try {
          const token = localStorage.getItem('token');
  
          const response = await fetch(`${ linkurl }/user/getallsellerprojectdetailbyid/${id}`, {
            method: 'GET',
            headers: {
              token: `${token}`,
            },
          });
  
          if (response.ok) {
            const userData = await response.json();

const compareDates = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);

// Sort the array based on the date property
const sortedData = userData.sort(compareDates);
            setProjectpurchases(sortedData)
            setDetailsDialogOpen(true); 
          } else {
            console.error('Failed to fetch user data:', response.statusText);
          }
        } catch (error) {
          console.error('Unexpected error during user data fetch:', error);
        }
  }
  return (
    <>
            {projectpurchases?
        <Projectpurchases
              open={detailsDialogOpen}
              handleClose={handleDetailsDialogClose}
        data={projectpurchases}/>:<></>}
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
          {data.map((row,index) => (
            <TableRow key={index}>
            <TableCell>{row.Title}</TableCell>
              <TableCell>{row.Technologies.join(', ')}</TableCell>
              
              <TableCell>{row.Revenue?row.Revenue:0}</TableCell>
              <TableCell>
                <GradientDetailsButton
                  variant="contained"
                  size="small"
                  onClick={() => handleGetpurchases(row._id)}
                  startIcon={<Visibility />}
                  style={{ borderRadius: 10 }}
                >
                  Details
                </GradientDetailsButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

const UserDetailsDialog = ({ user, open, handleClose, selectedUserProjects }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ fontWeight: 'bold' }}>User Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Full Name: {user.FullName}</Typography>
        <Typography variant="body1">Email: {user.Email}</Typography>
        <Typography variant="body1">Experience: {user.Experience}</Typography>
        <Typography variant="body1">Contact: {user.Contact}</Typography>
        <Typography variant="body1">Role: {user.Role}</Typography>
        {/* Add other details you want to display */}
        <Typography variant="body1">Specialities: {user.Specialities.join(', ')}</Typography>
        <Typography variant="body1">Account Balance: {user.AccountBalance || 'N/A'}</Typography>
        {/* Add more fields as needed */}
        <CategoryTable data={selectedUserProjects} />

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

export default UserDetailsDialog;
