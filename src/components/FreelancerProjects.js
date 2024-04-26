import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import SideBar from '../components/AdminSideBar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Pending } from '@mui/icons-material';
import ProjectDetails from './FreelanceProjectDetails'
import { Done } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Block, Visibility, Delete, Person, Lock, RawOff } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GradientBlockButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #FF6464, #D34C4C)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #FF6464, #D34C4C)',
  },
}));

const GradientDetailsButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));


const UserTable = ({ data, handleBlockUnblock, handleUnblockUser }) => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false); // Add state for details dialog
  const [selectedUserDetails, setSelectedUserDetails] = useState(null); 
  const columns = [
    { id: 'title', label: 'Title' },
    { id: 'budget', label: 'Budget' },
    { id: 'deadline', label: 'Deadline' },
    { id: 'details', label: 'Details' },
  ];
  const handleDetailsDialogClose = () => {
    setSelectedUserDetails(null);
    setDetailsDialogOpen(false);
  };
  const handleDetailsDialogOpen = (user) => {

   
    setSelectedUserDetails(user);
    setDetailsDialogOpen(true);
  };

  return (
    <>
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
              <TableCell>{row.Title}</TableCell>
              <TableCell>{row.Budget}</TableCell>
              <TableCell>{row.Deadline}</TableCell>
              <TableCell>
                <GradientDetailsButton
                  variant="contained"
                  size="small"
                  onClick={() => handleDetailsDialogOpen(row)}
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
    {selectedUserDetails? <ProjectDetails
    
    project={selectedUserDetails}
    open={detailsDialogOpen}
    handleClose={handleDetailsDialogClose}
    />:<></>}
   
    </>
  );
};

const FreelancerProjects = ({approvedprojects,deliveredprojects,tobeapprovedprojects }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Conditionally set marginLeft and marginRight based on screen size
  const marginLeft = isMobile ? 10 : 300;
  const marginRight = isMobile ? 10 : 50;
  return (
    <>
            <Paper elevation={3} style={{ padding: '10px',margin:'5px', backgroundColor: 'white', borderRadius: '12px' }}>
      <Typography variant="h6" color="dark" style={{ fontWeight: 'bold' }}>
  Projects
</Typography>
        <Box>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary">
            <Tab label="Approved" icon={<Person />} />
            <Tab label="Delivered" icon={<Done />} />
            <Tab label="Waiting" icon={<Pending />} />
          </Tabs>
          <Box>
            {value === 0 && <UserTable data={approvedprojects}  />}
            {value === 1 && <UserTable data={deliveredprojects}   />}
            {value === 2 && <UserTable data={tobeapprovedprojects}  />}
          </Box>
        </Box>
         </Paper>
    </>
  );
};

export default FreelancerProjects;
