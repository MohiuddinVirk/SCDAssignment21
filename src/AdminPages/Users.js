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

const UserTable = ({ data, isBlocked, handleBlockUnblock, handleUnblockUser }) => {
  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'password', label: 'Password' },
    { id: 'block', label: 'Block/Unblock' },
    { id: 'details', label: 'Details' },
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
              <TableCell>{row.FullName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.Password}</TableCell>
              <TableCell>
                <GradientBlockButton
                  variant="contained"
                  size="small"
                  onClick={() => handleBlockUnblock(row, isBlocked)}
                  style={{ borderRadius: 10 }}
                >
                  {isBlocked ? 'Unblock' : 'Block'}
                </GradientBlockButton>
              </TableCell>
              <TableCell>
                <GradientDetailsButton
                  variant="contained"
                  size="small"
                  onClick={() => handleBlockUnblock(row, !isBlocked)}
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
  );
};

const BlockedUsersPage = () => {
  const [unblockedUsersData, setUnblockedUsersData] = useState([]);
  const [blockedUsersData, setBlockedUsersData] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBlockUnblock = async (row, block) => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }
  
      const endpoint = !block ? 'disableuser' : 'ableuser';
      console.log(endpoint)
      const response = await fetch(`http://localhost:3000/user/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          reason: block ? 'Block' : 'Unblock',
          UserId: row._id,
        }),
      });
  
      if (response.ok) {
        const updatedUserData = await response.json();
  
          if (!block) {
            

            let index;
            let temparr=[...unblockedUsersData]
            for(let i=0;i<unblockedUsersData.length;i++){
              if(unblockedUsersData===row._id){
                index=i;
              }
            }
            temparr.splice(index,1);
            setUnblockedUsersData(temparr);
            let newtemp=[...blockedUsersData];
            newtemp.push(row);
            setBlockedUsersData(newtemp)
          } else {
            let index;
            let temparr=[...blockedUsersData]
            for(let i=0;i<blockedUsersData.length;i++){
              if(blockedUsersData===row._id){
                index=i;
              }
            }
            temparr.splice(index,1);
            setBlockedUsersData(temparr);
            let newtemp=[...unblockedUsersData];
            newtemp.push(row);
            setUnblockedUsersData(newtemp)
          }
          console.log(`${block ? 'Block' : 'Unblock'} successful for:`, row);
        
      } else {
        console.error(`${block ? 'Block' : 'Unblock'} user failed:`, response.statusText);
      }
    } catch (error) {
      console.error(`Unexpected error during ${block ? 'block' : 'unblock'} user:`, error);
    }
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token not found in local storage');
          return;
        }
        const response = await fetch('http://localhost:3000/user/getallusers', {
          method: 'GET',
          headers: {
            token: `${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUnblockedUsersData(userData.filter((user) => !user.blocked));
          setBlockedUsersData(userData.filter((user) => user.blocked));
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Unexpected error during user data fetch:', error);
      }
    };

    fetchUsersData();
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Conditionally set marginLeft and marginRight based on screen size
  const marginLeft = isMobile ? 10 : 300;
  const marginRight = isMobile ? 10 : 50;
  return (
    <>
      <div>
        <SideBar active="/users" />
      </div>
      <div style={{ marginTop: 30, marginLeft, marginRight }}>
        <Box>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary">
            <Tab label="Unblocked Users" icon={<Person />} />
            <Tab label="Blocked Users" icon={<Lock />} />
          </Tabs>
          <Box>
          <Paper elevation={3} style={{ padding: '20px',margin:'10px', backgroundColor: 'white', borderRadius: '12px' }}>
      <Typography variant="h6" color="dark" style={{ fontWeight: 'bold' }}>
  Top Customers
</Typography>
            {value === 0 && <UserTable data={unblockedUsersData} isBlocked={false} handleBlockUnblock={handleBlockUnblock} />}
            {value === 1 && <UserTable data={blockedUsersData} isBlocked={true} handleBlockUnblock={handleBlockUnblock} />}
         </Paper>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default BlockedUsersPage;
