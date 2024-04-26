import React, { useState,useEffect } from 'react';
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
import SideBar from '../components/SideBar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { PeopleAlt, Person, Visibility } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const UserTable = ({ data, icon, buttonText }) => {
  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'details', label: 'Details' },
  ];
  const GradientFollowButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(to right, #000000, #3533CD)',
    color: '#ffffff',
    '&:hover': {
      background: 'linear-gradient(to right, #000000, #3533CD)',
    },
  }));
  
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
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
              <GradientFollowButton  variant="contained" size="small" style={{ marginLeft: '8px',borderRadius:10,height:35 }} onClick={handleDetails}>
            Detail
          </GradientFollowButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const handleDetails = (row) => {
  // Implement the logic to handle details button click
  
};

const FollowingAndFollowersTabs = () => {
  const [userData,setUserData]=useState(null);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const followingData = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Doe', email: 'jane.doe@example.com' },
    // Add more data as needed
  ];

  const followersData = [
    { name: 'User1', email: 'user1@example.com' },
    { name: 'User2', email: 'user2@example.com' },
    // Add more data as needed
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Conditionally set marginLeft and marginRight based on screen size
  const marginLeft = isMobile ? 10 : 300;
  const marginRight = isMobile ? 10 : 50;

useEffect(()=>{
  const fetchUserData=async()=>{
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        // Handle case where token is not available (user not logged in)
        console.error('Token not found in local storage');
        return;
      }
console.log(token)
      const response = await fetch('http://localhost:3000/user/getprofile', {
          method: 'GET',
        headers: {
          token: `${token}`, // Include the token in the Authorization header
        },
      });

    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      
    } else {
      console.error('Error fetching user data:', response.statusText);
    }
  } catch (error) {
    console.error('Unexpected error during fetching user data:', error);
  }
  }
  fetchUserData();
},[])
  return (
    <>
         <div>
        <SideBar active="/community" />
      </div>
      <div style={{ marginTop: 30, marginLeft, marginRight }}>
    <Box>
      <Tabs value={value} onChange={handleChange} indicatorColor="primary">
        <Tab label="Following" icon={<PeopleAlt />} />
        <Tab label="Followers" icon={<Person />} />
      </Tabs>
      <Box>
        {value === 0 && (
          <UserTable data={followingData} icon={<Visibility />} buttonText="Details" />
        )}
        {value === 1 && (
          <UserTable data={followersData} icon={<Visibility />} buttonText="Details" />
        )}
      </Box>
    </Box>
    </div>
    </>
  );
};

export default FollowingAndFollowersTabs;
