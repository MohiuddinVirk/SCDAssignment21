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
import { More, Restore } from '@mui/icons-material';
import { linkurl } from '../link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logoImage from '../assets/DigitalGroveLogo.png';
import { Block, Visibility,Pending,Done, Delete, Person, Lock, RawOff } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import Projectpurchases from '../components/Projectpurchases'
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


const UserTable = ({ data }) => {
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
              
              <TableCell>{row.Revenue}</TableCell>
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
const BlockedUsersPage = () => {
  const [allprojects, setAllprojects] = useState([]);
  const [allprojects1, setAllprojects1] = useState([]);
  const [pagination,setPagination]=useState(5)
  const [options,setOptions]=useState([])
  const [searchBudget,setSearchBudget]=useState(null)
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

         path=(`${ linkurl }/user/getallsellerprojectsbytechnology/${encodeURIComponent(searchCategory)}`)
         const response = await fetch(path, {
          method: 'GET',
          headers: {
            token: `${token}`,
          },
        });
  
        if (response.ok) {
          const userData = await response.json();

          if(userData.length>pagination){
            let toptemp=userData.slice(0,pagination);
            setAllprojects(toptemp)
            setAllprojects1(userData)
          }
          else{
            setAllprojects1(userData)
            setAllprojects(userData)
          }
        setSearchCategory(null)
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
     
      }else if(searchBudget){
        const response = await fetch(`${ linkurl }/user/getallsellerprojects`, {
          method: 'GET',
          headers: {
            token: `${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          let tempfilter=userData.filter((project)=>project.Price<=searchBudget)
          if(tempfilter.length>pagination){
            let toptemp=tempfilter.slice(0,pagination);
            setAllprojects(toptemp)
            setAllprojects1(tempfilter)
          }
          else{
            setAllprojects1(tempfilter)
            setAllprojects(tempfilter)
          }
        setSearchBudget(0)

      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
      }
      else if(searchDate){
        const response = await fetch(`${ linkurl }/user/getallsellerprojects`, {
          method: 'GET',
          headers: {
            token: `${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
        //   console.log(setSearchDate)
        //   let temparr=[]
        //   for(let i=0;i<userData.length;i++){
        //     if(userData[i].Revenue<=){
        //         temparr.push({})
        //     }
        //   }
        let tempfilter=userData.filter((project)=>project.Revenue<=searchDate)
          if(tempfilter.length>pagination){
            let toptemp=tempfilter.slice(0,pagination);
            setAllprojects(toptemp)
            setAllprojects1(tempfilter)
          }
          else{
            setAllprojects1(tempfilter)
            setAllprojects(tempfilter)
          }
        setSearchDate(0)

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
      const response = await fetch(`${ linkurl }/user/getallsellerprojects`, {
        method: 'GET',
        headers: {
          token: `${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
const response1 = await fetch(`${ linkurl }/user/gettopsellerscategories`, {
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
          if(userData.length>pagination){
            let toptemp=userData.slice(0,pagination);
            setAllprojects(toptemp)
            setAllprojects1(userData)
          }
          else{
            setAllprojects1(userData)
            setAllprojects(userData)
          }
          setOptions(temp)
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
  const Loadmore=async()=>{
    if(allprojects1.length>=allprojects.lenth+pagination){
      let toptemp=allprojects1.slice(allprojects.length,pagination);
      setAllprojects(toptemp)
    }
    else{
      setAllprojects(allprojects1)
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
        <SideBar active="/products" />
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
            Search Products
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
                label="Revenue"
                variant="outlined"
                type="number"
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
  Products
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
          <Box>
            <UserTable data={allprojects} />
            {
              (allprojects.length!==allprojects1.length)?
              <GradientDetailsButton
                  variant="contained"
                  size="small"
                  onClick={Loadmore}
                  startIcon={<More />}
                  style={{ borderRadius: 10,marginTop:'10px' }}
                >
                  Load More
                </GradientDetailsButton>:<></>
            }
            
          </Box>
        </Box>
         </Paper>
      </div>
    </>
  );
};

export default BlockedUsersPage;
