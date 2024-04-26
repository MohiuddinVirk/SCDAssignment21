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
import { Lock, Block, Visibility, Person, Cancel } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import { linkurl } from '../link';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserDetailsDialog from '../components/FreelancerDetails';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useTheme } from '@mui/material/styles';

const GradientBlockButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #D34C4C,#FF6464)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #D34C4C, #FF6464)',
  },
}));

const GradientDetailsButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));

const UserTable = ({ data, isBlocked, handleBlockUnblock, handleUnblockUser, handleBlockDialogOpen ,handleDetailsDialogOpen}) => {
  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'password', label: 'Password' },
    { id: 'block', label: 'Block/Unblock' },
    { id: 'details', label: 'Details' },
  ];
// Pagination
const itemsPerPage = 5;
const [page, setPage] = useState(1);

const handlePageChange = (event, value) => {
  setPage(value);
};

const startIndex = (page - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedData = data.slice(startIndex, endIndex);
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
          {paginatedData.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.FullName}</TableCell>
              <TableCell>{row.Email}</TableCell>
              <TableCell>{row.Password}</TableCell>
              <TableCell>
                <GradientBlockButton
                  variant="contained"
                  size="small"
                  onClick={isBlocked ? () => handleBlockUnblock(row, isBlocked):() => handleBlockDialogOpen(row)}
                  startIcon={<Lock />}
                  style={{ borderRadius: 10 }}
                >
                  {isBlocked ? 'Unblock' : 'Block'}
                </GradientBlockButton>
              </TableCell>
              <TableCell>
                <GradientDetailsButton
                  variant="contained"
                  size="small"
                  onClick={()=>handleDetailsDialogOpen(row)}
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
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
      <Typography>Page: {page}</Typography>
      <Pagination count={Math.ceil(data.length / itemsPerPage)} page={page} onChange={handlePageChange} size="small" />
    </Box>
    </>
  );
};

const BlockedUsersPage = () => {
  const [unblockedUsersData, setUnblockedUsersData] = useState([]);
  const [blockedUsersData, setBlockedUsersData] = useState([]);
  const [value, setValue] = useState(0);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [blockReason, setBlockReason] = useState('');
  const [selectedBlockedUser, setSelectedBlockedUser] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false); // Add state for details dialog
  const [selectedUserDetails, setSelectedUserDetails] = useState(null); // Add state to store details of the selected user
  const [selectedUserProjects, setSelectedUserProjects] = useState([]); // Add state to store details of the selected user

const handleDetailsDialogOpen = async(user) => {
  const fetchUsersData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${ linkurl }/user/getallfreelanceprojectsassignedbyid/${user._id}`, {
        method: 'GET',
        headers: {
          token: `${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setSelectedUserProjects(userData)
        setSelectedUserDetails(user);
        setDetailsDialogOpen(true);
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Unexpected error during user data fetch:', error);
    }
  };

  await fetchUsersData();
};

const handleDetailsDialogClose = () => {
  setSelectedUserDetails(null);
  setDetailsDialogOpen(false);
};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBlockDialogOpen = (user) => {

    setSelectedBlockedUser(user);
    setBlockDialogOpen(true);
  };

  const handleBlockDialogClose = () => {
    setSelectedBlockedUser(null);
    setBlockDialogOpen(false);
    setBlockReason('');
  };

  const handleBlockUnblock = async (row, block) => {
    console.log(block)
    if (!block) {
      // If blocking, open the dialog
      handleBlockDialogOpen(row);
    } else {
      // If unblocking, proceed directly
      await performBlockUnblock(row, block);
    }
  };

  const performBlockUnblock = async (row, block) => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }
  
      const endpoint = !block ? 'disablefreelancer' : 'ablefreelancer';
      const response = await fetch(`${ linkurl }/user/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          reason: block ? '': blockReason,
          UserId: row._id,

        }),
      });
  
      if (response.ok) {
        const updatedUserData = await response.json();
  
        if (!block) {
          let index;
          let temparr = [...unblockedUsersData];
          for (let i = 0; i < unblockedUsersData.length; i++) {
            if (unblockedUsersData[i]._id === row._id) {
              index = i;
              break;
            }
          }
          temparr.splice(index, 1);
          setUnblockedUsersData(temparr);
          let newtemp = [...blockedUsersData];
          newtemp.push(row);
          setBlockedUsersData(newtemp);
        } else {
          let index;
          let temparr = [...blockedUsersData];
          for (let i = 0; i < blockedUsersData.length; i++) {
            if (blockedUsersData[i]._id === row._id) {
              index = i;
              break;
            }
          }
          temparr.splice(index, 1);
          setBlockedUsersData(temparr);
          let newtemp = [...unblockedUsersData];
          newtemp.push(row);
          setUnblockedUsersData(newtemp);
        }
        console.log(`${block ? 'Block' : 'Unblock'} successful for:`, row);
      } else {
        console.error(`${block ? 'Block' : 'Unblock'} user failed:`, response.statusText);
      }
    } catch (error) {
      console.error(`Unexpected error during ${block ? 'block' : 'unblock'} user:`, error);
    }
  };

  const handleBlockConfirm = async () => {
    if (blockReason.trim() === '') {
      // Optionally handle an empty reason (you may want to show a message)
      alert('Reason cannot be empty.');
      return;
    }
    // Proceed with blocking
    await performBlockUnblock(selectedBlockedUser, false);

    // Close the dialog
    handleBlockDialogClose();
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${ linkurl }/user/getfreelancers`, {
          method: 'GET',
          headers: {
            token: `${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUnblockedUsersData(userData.filter((user) => !user.Blocked));
          setBlockedUsersData(userData.filter((user) => user.Blocked));
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
        <SideBar active="/freelancers" />
      </div>
      <div style={{ marginTop: 30, marginLeft, marginRight }}>
        <Box>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary">
            <Tab label="Unblocked Users" icon={<Person />} />
            <Tab label="Blocked Users" icon={<Lock />} />
          </Tabs>
          <Box>
            <Paper elevation={3} style={{ padding: '20px', margin: '10px', backgroundColor: 'white', borderRadius: '12px' }}>
              <Typography variant="h6" color="dark" style={{ fontWeight: 'bold' }}>
                Freelancers
              </Typography>
              {value === 0 && <UserTable data={unblockedUsersData} isBlocked={false} handleBlockUnblock={handleBlockUnblock} handleBlockDialogOpen={handleBlockDialogOpen}   handleDetailsDialogOpen={handleDetailsDialogOpen} selectedUserProjects={selectedUserProjects} />}
              {value === 1 && <UserTable data={blockedUsersData} isBlocked={true} handleBlockUnblock={handleBlockUnblock} handleBlockDialogOpen={handleBlockDialogOpen}   handleDetailsDialogOpen={handleDetailsDialogOpen} selectedUserProjects={selectedUserProjects}/>}
            </Paper>
            {selectedUserDetails?
              <UserDetailsDialog
              user={selectedUserDetails}
              open={detailsDialogOpen}
              handleClose={handleDetailsDialogClose}
              approvedprojects={selectedUserProjects.filter((project) => project.Status==="APPROVED")}
              deliveredprojects={selectedUserProjects.filter((project) => project.Status==="DELIVERED")}
              tobeapprovedprojects={selectedUserProjects.filter((project) => project.Status==="WAITING FOR APPROVAL")}
            />:<></>}
          

          </Box>
        </Box>
      </div>

      {/* Block Dialog */}
      <Dialog open={blockDialogOpen} onClose={handleBlockDialogClose}>
        <DialogTitle>Block User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason for blocking the user.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="blockReason"
            label="Reason"
            type="text"
            fullWidth
            value={blockReason}
            onChange={(e) => {
              setBlockReason(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
           <GradientBlockButton
                  variant="contained"
                  size="small"
                  onClick={handleBlockConfirm}
                  startIcon={<Lock />}
                  style={{ borderRadius: 10 }}
                >
                  Block
                </GradientBlockButton>
                 <GradientDetailsButton
                  variant="contained"
                  size="small"
                  onClick={handleBlockDialogClose}
                  startIcon={<Cancel />}
                  style={{ borderRadius: 10 }}
                >
                  Cancel
                </GradientDetailsButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlockedUsersPage;
