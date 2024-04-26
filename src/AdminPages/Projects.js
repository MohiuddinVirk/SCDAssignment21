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
import { linkurl } from '../link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logoImage from '../assets/DigitalGroveLogo.png';
import { Block, Visibility,Pending,Done,More, Delete, Person, Lock, RawOff, Restore } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import ProjectDetails from '../components/ProjectDetails'
import { useTheme } from '@mui/material/styles';
import {  TextField, Autocomplete, Grid ,Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  height: 40,
  borderRadius: 10,
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));

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
  
const BlockedUsersPage = () => {
  const [unblockedUsersData, setUnblockedUsersData] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [approvedprojects, setApprovedprojects] = useState([]);
  const [deliveredprojects, setDeliveredprojects] = useState([]);
  const [tobeapprovedprojects, setTobeapprovedprojects] = useState([]);
  const [rejected1, setRejected1] = useState([]);
  const [approvedprojects1, setApprovedprojects1] = useState([]);
  const [deliveredprojects1, setDeliveredprojects1] = useState([]);
  const [tobeapprovedprojects1, setTobeapprovedprojects1] = useState([]);
  const [options,setOptions]=useState([])
  const [searchBudget,setSearchBudget]=useState(null)
  const [pagination,setPagination]=useState(5)
  const [searchCategory,setSearchCategory]=useState(null)
  const [searchDate,setSearchDate]=useState(null)
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearch = async () => {
    try {
      let path=""
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found in local storage');
        return;
      }
      if(searchCategory){

         path=(`${ linkurl }/user/getallfreelanceprojectsbytechnology/${encodeURIComponent(searchCategory)}`)
         const response = await fetch(path, {
          method: 'GET',
          headers: {
            token: `${token}`,
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
          let temp1=userData.filter((project) => project.Status==="APPROVED")
          let temp2=userData.filter((project) => project.Status==="DELIVERED")
          let temp3=userData.filter((project) => project.Status==="WAITING FOR APPROVAL")
          let temp4=userData.filter((project) => project.Status==="REJECTED")
        if(temp1.length>pagination){
          let toptemp=temp1.slice(0,pagination);
          setApprovedprojects(toptemp)
          setApprovedprojects1(temp1)
        }
        else{
          setApprovedprojects1(temp1)
          setApprovedprojects(temp1)
        }
        if(temp2.length>pagination){
          let toptemp=temp2.slice(0,pagination);
          setDeliveredprojects(toptemp)
          setDeliveredprojects1(temp2)
        }
        else{
          setDeliveredprojects(temp2)
          setDeliveredprojects1(temp2)
        }
        if(temp3.length>pagination){
          let toptemp=temp3.slice(0,pagination);
          setTobeapprovedprojects(toptemp)
          setTobeapprovedprojects1(temp3)
        }
        else{
          setTobeapprovedprojects(temp3)
          setTobeapprovedprojects1(temp3)
        }
        if(temp4.length>pagination){
          let toptemp=temp4.slice(0,pagination);
          setRejected(toptemp)
          setRejected1(temp4)
        }
        else{
          setRejected(temp4)
          setRejected1(temp4)
        }
        setSearchCategory(null)
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
     
      }else if(searchBudget){
        const response = await fetch(`${ linkurl }/user/getallfreelanceprojects`, {
          method: 'GET',
          headers: {
            token: `${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
        let temp1=userData.filter((project) => project.Budget<=searchBudget&&project.Status==="APPROVED")
        let temp2=userData.filter((project) => project.Budget<=searchBudget&& project.Status==="DELIVERED")
        let temp3=userData.filter((project) => project.Budget<=searchBudget&&project.Status==="WAITING FOR APPROVAL")
        let temp4=userData.filter((project) => project.Budget<=searchBudget&&project.Status==="REJECTED")
      if(temp1.length>pagination){
        let toptemp=temp1.slice(0,pagination);
        setApprovedprojects(toptemp)
        setApprovedprojects1(temp1)
      }
      else{
        setApprovedprojects1(temp1)
        setApprovedprojects(temp1)
      }
      if(temp2.length>pagination){
        let toptemp=temp2.slice(0,pagination);
        setDeliveredprojects(toptemp)
        setDeliveredprojects1(temp2)
      }
      else{
        setDeliveredprojects(temp2)
        setDeliveredprojects1(temp2)
      }
      if(temp3.length>pagination){
        let toptemp=temp3.slice(0,pagination);
        setTobeapprovedprojects(toptemp)
        setTobeapprovedprojects1(temp3)
      }
      else{
        setTobeapprovedprojects(temp3)
        setTobeapprovedprojects1(temp3)
      }
      if(temp4.length>pagination){
        let toptemp=temp4.slice(0,pagination);
        setRejected(toptemp)
        setRejected1(temp4)
      }
      else{
        setRejected(temp4)
        setRejected1(temp4)
      }
        setSearchBudget(0)

      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
      }
      else if(searchDate){
        console.log(searchDate)
        const response = await fetch(`${ linkurl }/user/getallfreelanceprojects`, {
          method: 'GET',
          headers: {
            token: `${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
        let temp1=userData.filter((project) => project.Deadline<=searchDate&&project.Status==="APPROVED")
        let temp2=userData.filter((project) => project.Deadline<=searchDate&& project.Status==="DELIVERED")
        let temp3=userData.filter((project) => project.Deadline<=searchDate&&project.Status==="WAITING FOR APPROVAL")
        let temp4=userData.filter((project) => project.Deadline<=searchDate&&project.Status==="REJECTED")
      if(temp1.length>pagination){
        let toptemp=temp1.slice(0,pagination);
        setApprovedprojects(toptemp)
        setApprovedprojects1(temp1)
      }
      else{
        setApprovedprojects1(temp1)
        setApprovedprojects(temp1)
      }
      if(temp2.length>pagination){
        let toptemp=temp2.slice(0,pagination);
        setDeliveredprojects(toptemp)
        setDeliveredprojects1(temp2)
      }
      else{
        setDeliveredprojects(temp2)
        setDeliveredprojects1(temp2)
      }
      if(temp3.length>pagination){
        let toptemp=temp3.slice(0,pagination);
        setTobeapprovedprojects(toptemp)
        setTobeapprovedprojects1(temp3)
      }
      else{
        setTobeapprovedprojects(temp3)
        setTobeapprovedprojects1(temp3)
      }
      if(temp4.length>pagination){
        let toptemp=temp4.slice(0,pagination);
        setRejected(toptemp)
        setRejected1(temp4)
      }
      else{
        setRejected(temp4)
        setRejected1(temp4)
      }
        setSearchDate(null)

      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
      }
      else if(path===""){
        alert('Choose a filter type');
        return;
      }
      
   
    } catch (error) {
      console.error('Unexpected error during user data fetch:', error);
    }
  };
  const fetchUsersData = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found in local storage');
        return;
      }
      const response = await fetch(`${ linkurl }/user/getallfreelanceprojects`, {
        method: 'GET',
        headers: {
          token: `${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
const response1 = await fetch(`${ linkurl }/user/gettopfreelancerscategories`, {
        method: 'GET',
        headers: {
          token: `${token}`,
        },
      });
      if (response1.ok) {
          const userData1 = await response1.json();
          let temp=[];
          for (let i=0;i<userData1.length;i++){
            temp.push(userData1[i].name)
          }
          setOptions(temp)
          let temp1=userData.filter((project) => project.Status==="APPROVED")
          let temp2=userData.filter((project) => project.Status==="DELIVERED")
          let temp3=userData.filter((project) => project.Status==="WAITING FOR APPROVAL")
          let temp4=userData.filter((project) => project.Status==="REJECTED")
        if(temp1.length>pagination){
          let toptemp=temp1.slice(0,pagination);
          setApprovedprojects(toptemp)
          setApprovedprojects1(temp1)
        }
        else{
          setApprovedprojects1(temp1)
          setApprovedprojects(temp1)
        }
        if(temp2.length>pagination){
          let toptemp=temp2.slice(0,pagination);
          setDeliveredprojects(toptemp)
          setDeliveredprojects1(temp2)
        }
        else{
          setDeliveredprojects(temp2)
          setDeliveredprojects1(temp2)
        }
        if(temp3.length>pagination){
          let toptemp=temp3.slice(0,pagination);
          setTobeapprovedprojects(toptemp)
          setTobeapprovedprojects1(temp3)
        }
        else{
          setTobeapprovedprojects(temp3)
          setTobeapprovedprojects1(temp3)
        }
        if(temp4.length>pagination){
          let toptemp=temp4.slice(0,pagination);
          setRejected(toptemp)
          setRejected1(temp4)
        }
        else{
          setRejected(temp4)
          setRejected1(temp4)
        }
      }
      
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Unexpected error during user data fetch:', error);
    }
  };

  useEffect(() => {
    
    fetchUsersData();
  }, []);
  const Loadmore=async(type)=>{
    if(type==="DELIVERED"){
      if(deliveredprojects1.length>=deliveredprojects.lenth+pagination){
        let toptemp=deliveredprojects1.slice(deliveredprojects.length,pagination);
        setDeliveredprojects(toptemp)
      }
      else{
        setDeliveredprojects(deliveredprojects1)
      }
    }else if(type==="WAITING FOR APPROVAL"){
      if(tobeapprovedprojects1.length>=tobeapprovedprojects.lenth+pagination){
        let toptemp=tobeapprovedprojects1.slice(tobeapprovedprojects.length,pagination);
        setTobeapprovedprojects(toptemp)
      }
      else{
        setTobeapprovedprojects(tobeapprovedprojects1)
      }

    }else if(type==="REJECTED"){
      if(rejected1.length>=rejected.lenth+pagination){
        let toptemp=rejected1.slice(rejected.length,pagination);
        setRejected(toptemp)
      }
      else{
        setRejected(rejected1)
      }
    }
    else if(type==="APPROVED"){
      if(approvedprojects1.length>=approvedprojects.lenth+pagination){
        let toptemp=approvedprojects1.slice(approvedprojects.length,pagination);
        setApprovedprojects(toptemp)
      }
      else{
        setApprovedprojects(approvedprojects1)
      }
    }
   
    
  }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Conditionally set marginLeft and marginRight based on screen size
  const marginLeft = isMobile ? 10 : 300;
  const marginRight = isMobile ? 10 : 50;
  return (
    <>
      <div>
        <SideBar active="/projects" />
      </div>
      <div style={{ marginTop: 30, marginLeft, marginRight }}>
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '16px' }}>
          <Avatar alt="Logo" src={logoImage} sx={{ width: 64, height: 64, marginRight: 2 }} />
          <Typography
            variant="h5"
            sx={{
              marginTop: '8px',
              textAlign: 'center',
              height: 15,
              color: `linear-gradient(to right, #000000, #3533CD)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: isMobile ? 0 : '16px', // Adjusted margin for larger screens
            }}
          >
            Search Projects
          </Typography>
        </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={options}
                value={searchCategory}
                onChange={(event, newValue) => setSearchCategory(newValue)}
                renderInput={(params) => <TextField {...params} label="Category" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Budget"
                variant="outlined"
                type="number"
                value={searchBudget}
                onChange={(e) => setSearchBudget(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Deadline"
                variant="outlined"
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchButton onClick={handleSearch} variant="contained" fullWidth>
                Search
              </SearchButton>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} style={{ padding: '20px',margin:'5px', backgroundColor: 'white', borderRadius: '12px' }}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <Typography variant="h6" color="dark" style={{ fontWeight: 'bold' }}>
  Projects
</Typography>
<GradientDetailsButton
                  variant="contained"
                  size="small"
                  onClick={fetchUsersData}
                  startIcon={<Restore />}
                  style={{ borderRadius: 10,marginBottom:'10px' }}
                >
                  Reset
                </GradientDetailsButton>
          </div>
        <Box>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary">
            <Tab label="Approved" icon={<Person />} />
            <Tab label="Delivered" icon={<Done />} />
            <Tab label="Waiting" icon={<Pending />} />
            <Tab label="Rejected" icon={<Pending />} />
          </Tabs>
          <Box>
            {value === 0 && <>
              <UserTable data={approvedprojects}  />
              {
              (approvedprojects.length!==approvedprojects1.length)?
              <GradientDetailsButton
                  variant="contained"
                  size="small"
                  onClick={()=>Loadmore("APPROVED")}
                  startIcon={<More />}
                  style={{ borderRadius: 10,marginTop:'10px' }}
                >
                  Load More
                </GradientDetailsButton>:<></>
            }
            
            </>}
            {value === 1 && 
            <>
            <UserTable data={deliveredprojects}   />
            {
              (deliveredprojects.length!==deliveredprojects1.length)?
              <GradientDetailsButton
                  variant="contained"
                  size="small"
                  onClick={()=>Loadmore("DELIVERED")}
                  startIcon={<More />}
                  style={{ borderRadius: 10,marginTop:'10px' }}
                >
                  Load More
                </GradientDetailsButton>:<></>
            }
            
            </>
            }
            {value === 2 && 
            <>
            <UserTable data={tobeapprovedprojects}  />
              {
                (tobeapprovedprojects.length!==tobeapprovedprojects1.length)?
                <GradientDetailsButton
                    variant="contained"
                    size="small"
                    onClick={()=>Loadmore("WAITING FOR APPROVAL")}
                    startIcon={<More />}
                    style={{ borderRadius: 10,marginTop:'10px' }}
                  >
                    Load More
                  </GradientDetailsButton>:<></>
              }
              </>
            }
            {value === 3 &&
            <>
            <UserTable data={rejected}  />
            
            {
              (rejected.length!==rejected1.length)?
              <GradientDetailsButton
                  variant="contained"
                  size="small"
                  onClick={()=>Loadmore("REJECTED")}
                  startIcon={<More />}
                  style={{ borderRadius: 10,marginTop:'10px' }}
                >
                  Load More
                </GradientDetailsButton>:<></>
            }
            </>
            }
          </Box>
        </Box>
         </Paper>
      </div>
    </>
  );
};

export default BlockedUsersPage;
