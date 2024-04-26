// ExampleComponent.js
import React,{useEffect, useState} from 'react';
import SideBar from '../components/AdminSideBar';
import GraphCard from '../components/GraphCard'
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BarChart from '../components/charts/BarChart'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import GradientLineChart from '../components/charts/GradientLineChart'
import CustomCard from '../components/StatCard';
import { AutoGraph } from '@mui/icons-material';
import {linkurl} from '../link'
import UserDetailsDialog from '../components/UserDetail';
import UserDetailsDialog1 from '../components/FreelancerDetails';
import UserDetailsDialog2 from '../components/CustomerDetails';
import { Block, Visibility, Delete, Person, Lock, RawOff } from '@mui/icons-material';
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
const UserTable = ({ data, isBlocked, handleBlockUnblock, handleUnblockUser ,handleDetailsDialogOpen}) => {
    const columns = [
      { id: 'name', label: 'Name' },
      { id: 'revenue', label: 'Revenue' },
      { id: 'email', label: 'Email' },
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
                <TableCell>{row.Revenue}</TableCell>
                <TableCell>{row.Email}</TableCell>
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
    );
  };
  
  const CutomerTable = ({ data, isBlocked, handleBlockUnblock, handleUnblockUser,handleDetailsDialogOpen }) => {
    const columns = [
      { id: 'name', label: 'Name' },
      { id: 'spending', label: 'Spending' },
      { id: 'email', label: 'Email' },
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
                <TableCell>{row.TotalSpending}</TableCell>
                <TableCell>{row.Email}</TableCell>
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
    );
  };
   
  const CategoryTable = ({ data, isBlocked, handleBlockUnblock, handleUnblockUser }) => {
    const columns = [
      { id: 'technology', label: 'Technology' },
      { id: 'revenue', label: 'Revenue' },
      // { id: 'details', label: 'Details' },
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
                <TableCell>{row.technology}</TableCell>
                <TableCell>{row.revenue}</TableCell>
                {/* <TableCell>
                  <GradientDetailsButton
                    variant="contained"
                    size="small"
                    onClick={() => handleBlockUnblock(row, !isBlocked)}
                    startIcon={<Visibility />}
                    style={{ borderRadius: 10 }}
                  >
                    Details
                  </GradientDetailsButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
const ExampleComponent = () => {
    const [blockedUsersData, setBlockedUsersData] = useState([]);
    const [selllers, setSellers] = useState([]);
    const [freelancers, setFreelancers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [sellercategories, setSellercategories] = useState([]);
    const [freelancerscategories, setFreelancecategories] = useState([]);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const [selectedUserProjects, setSelectedUserProjects] = useState([]);
    const [detailsDialogOpen1, setDetailsDialogOpen1] = useState(false);
    const [selectedUserDetails1, setSelectedUserDetails1] = useState(null);
    const [selectedUserProjects1, setSelectedUserProjects1] = useState([]);
    const [detailsDialogOpen2, setDetailsDialogOpen2] = useState(false);
    const [selectedUserDetails2, setSelectedUserDetails2] = useState(null);
    const [selectedUserProjects2, setSelectedUserProjects2] = useState([]);
    const [sortedTechnologieslabelsfreelancers, setSortedTechnologieslabelsfreelancers] = useState([]);
    const [sortedTechnologieslabels, setSortedTechnologieslabels] = useState([]);
    const [sortedTechnologiesvalues, setSortedTechnologiesvalues] = useState([]);

    const [technologieslabels, setTechnologieslabels] = useState([]);
    const [technologiesvalues, setTechnologiesvalues] = useState([]);
    const [loading,setLoading]=useState(false)
    const [sortedTechnologiesvaluesfreelancers, setSortedTechnologiesvaluesfreelancers] = useState([]);
    const [purchases,setPurchases]=useState([])
    const [stats,setStats]=useState({
      totalRevenue:"",
      totalRevenuefreelence:"",
      assignednumber:"",
      deliverednumber:"",
      soldnumber:"",
      sortedTechnologies:[],
      sortedTechnologiesseller:[],
      freelancesortedTechnologies:[]
    })
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleBlockUnblock=async()=>{

  }
 
    // Conditionally set marginLeft and marginRight based on screen size
    const marginLeft = isMobile ? 10 : 300;
    const marginRight = isMobile ? 10 : 50;
    useEffect(() => {
      // console.log(datajson.freelancesortedTechnologies)
      // const data =  datajson
      

      const getAllBlogs = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        try {
          const response = await fetch(`${linkurl}/user/gettopsellers`, {
            method: 'GET',
            headers: {
              token: `${token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            const topsellers=data.slice(0,5)
            setSellers(topsellers); 
          } else {
            console.error('Error fetching sellers:', response.statusText);
            // Handle error, e.g., show error message to the user
          }
        } catch (error) {
          console.error('Unexpected error during fetching:', error);
        }
        try {
          const response = await fetch(`${linkurl}/user/gettopfreelancers`, {
            method: 'GET',
            headers: {
              token: `${token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setFreelancers(data); 
          } else {
            console.error('Error fetching :', response.statusText);
            // Handle error, e.g., show error message to the user
          }
        } catch (error) {
          console.error('Unexpected error during fetching :', error);
        }
        try {
          const response = await fetch(`${linkurl}/user/gettopcustomers`, {
            method: 'GET',
            headers: {
              token: `${token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setCustomers(data); 
          } else {
            console.error('Error fetching :', response.statusText);
            // Handle error, e.g., show error message to the user
          }
        } catch (error) {
          console.error('Unexpected error during fetching :', error);
        }
        try {
          const response = await fetch(`${linkurl}/user/gettopsellercategoriesbyrevenue`, {
            method: 'GET',
            headers: {
              token: `${token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setSellercategories(data); 
          } else {
            console.error('Error fetching :', response.statusText);
            // Handle error, e.g., show error message to the user
          }
        } catch (error) {
          console.error('Unexpected error during fetching :', error);
        }
        try {
  
          const response = await fetch(`${linkurl}/user/gettopfreelancecategoriesbyrevenuesort`, {
            method: 'GET',
            headers: {
              token: `${token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setFreelancecategories(data); 
          } else {
            console.error('Error fetching :', response.statusText);
            // Handle error, e.g., show error message to the user
          }
        } catch (error) {
          console.error('Unexpected error during fetching :', error);
        }
        try {
  
          const response = await fetch(`${linkurl}/user/getadminstats`, {
            method: 'GET',
            headers: {
              token: `${token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            let tempsellerlabels=[]
            let tempsellervalues=[]
            let tempfreelancerlabels=[]
            let tempfreelancervalues=[]
            let temptechlablels=[]
            let temptechvalues=[]
            for(let i=0;i<data.freelancesortedTechnologies.length;i++){
              tempfreelancerlabels.push(data.freelancesortedTechnologies[i].technology)
              tempfreelancervalues.push(data.freelancesortedTechnologies[i].revenue)
            }
            for(let i=0;i<data.sortedTechnologiesseller.length;i++){
              tempsellerlabels.push(data.sortedTechnologiesseller[i].technology)
              tempsellervalues.push(data.sortedTechnologiesseller[i].revenue)
            }
            for(let i=0;i<data.sortedTechnologies.length;i++){
              temptechlablels.push(data.sortedTechnologies[i].name)
              temptechvalues.push(data.sortedTechnologies[i].occurrence)
            }
            if(tempsellervalues.length>12){
      
              temptechlablels=temptechlablels.slice(0,12)
              temptechvalues=temptechvalues.slice(0,12)
            }
            if(tempsellervalues.length>12){
      
              tempsellerlabels=tempsellerlabels.slice(0,12)
              tempsellervalues=tempsellervalues.slice(0,12)
            }
            if(tempfreelancerlabels.length>12){
      
              tempfreelancerlabels=tempfreelancerlabels.slice(0,12)
              tempfreelancervalues=tempfreelancervalues.slice(0,12)
            }
            setTechnologieslabels(temptechlablels)
      setTechnologiesvalues(temptechvalues)
            setSortedTechnologieslabelsfreelancers(tempfreelancerlabels)
            setSortedTechnologieslabels(tempsellerlabels)
            setSortedTechnologiesvaluesfreelancers(tempfreelancervalues)
            setSortedTechnologiesvalues(tempsellervalues)
            setStats(data); 
            setLoading(true)
          } else {
            console.error('Error fetching :', response.statusText);
            // Handle error, e.g., show error message to the user
          }
        } catch (error) {
          console.error('Unexpected error during fetching :', error);
        }
      };
  
      getAllBlogs();
    }, []);
    const handleDetailsDialogClose = () => {
      setSelectedUserDetails(null);
      setDetailsDialogOpen(false);
    };
    const handleDetailsDialogOpen = async (user) => {
      const fetchUsersData = async () => {
        try {
          const token = localStorage.getItem('token');
  
          const response = await fetch(`${linkurl}/user/getallsellerprojectsbyid/${user._id}`, {
            method: 'GET',
            headers: {
              token: `${token}`,
            },
          });
  
          if (response.ok) {
            const userData = await response.json();
            setSelectedUserProjects(userData);
          } else {
            console.error('Failed to fetch user data:', response.statusText);
          }
        } catch (error) {
          console.error('Unexpected error during user data fetch:', error);
        }
      };
  
      await fetchUsersData();
      setSelectedUserDetails(user);
      setDetailsDialogOpen(true);
    };
    const handleDetailsDialogOpen1 = async(user) => {
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
            setSelectedUserProjects1(userData)
            setSelectedUserDetails1(user);
            setDetailsDialogOpen1(true);
          } else {
            console.error('Failed to fetch user data:', response.statusText);
          }
        } catch (error) {
          console.error('Unexpected error during user data fetch:', error);
        }
      };
    
      await fetchUsersData();
    };
    const handleDetailsDialogClose1 = () => {
      setSelectedUserDetails1(null);
      setDetailsDialogOpen1(false);
    };
    const handleDetailsDialogOpen2 = async(user) => {
      const fetchUsersData = async () => {
        try {
          const token = localStorage.getItem('token');
    
          const response = await fetch(`${ linkurl }/user/getallfreelanceprojectsuploadedbyid/${user._id}`, {
            method: 'GET',
            headers: {
              token: `${token}`,
            },
          });
    
          if (response.ok) {
            const userData = await response.json();
            const response1 = await fetch(`${ linkurl }/user/getallpurchasesincludedetail/${user._id}`, {
              method: 'GET',
              headers: {
                token: `${token}`,
              },
            });
            if (response1.ok) {
              const userData1 = await response1.json();
              setPurchases(userData1)
              setSelectedUserProjects2(userData)
              setSelectedUserDetails2(user);
              setDetailsDialogOpen2(true);
            }
          } else {
            console.error('Failed to fetch user data:', response.statusText);
          }
        } catch (error) {
          console.error('Unexpected error during user data fetch:', error);
        }
      };
    
      await fetchUsersData();
    };
    
    const handleDetailsDialogClose2 = () => {
      setSelectedUserDetails2(null);
      setDetailsDialogOpen2(false);
    };
    
    
  return (
    <>
    <div>
    <SideBar active="/" />
  </div>
  <div style={{ marginTop: 30, marginLeft, marginRight }}>
  <div style={{display:"flex",flexWrap:'wrap'}}>
  <CustomCard
      subtitle="Revenue"
      title={stats.totalRevenue+stats.totalRevenuefreelence}
      icon={<AutoGraph />}
      size={"small"}
      month="February 2023"
    />
    <CustomCard
      subtitle="Assigned"
      title={stats.assignednumber}
      icon={<AutoGraph />}
      size={"small"}
      month="February 2023"
    />
    <CustomCard
      subtitle="Completed"
      title={stats.deliverednumber}
      icon={<AutoGraph />}
      size={"small"}
      month="February 2023"
    />
    <CustomCard
      subtitle="Projects Sold"
      title={stats.soldnumber}
      icon={<AutoGraph />}
      size={"small"}
      month="February 2023"
    />
    </div>
{loading?
 <div style={{display:"flex",flexWrap:'wrap'}}>
      
 <GraphCard size="medium">
   <BarChart
    values={technologiesvalues}
   lables={technologieslabels}
   name={"Freelance Categories Occurence"}
   />
 </GraphCard>
 <GraphCard size="medium">
   <GradientLineChart data={stats.sortedTechnologiesseller}
   lables={sortedTechnologieslabels}
   values={sortedTechnologiesvalues}
   name={"Top Freelance Categories"}
   />
 </GraphCard>
 <GraphCard size="medium">
   <GradientLineChart data={stats.freelancesortedTechnologies}
   values={sortedTechnologiesvaluesfreelancers}
   lables={sortedTechnologieslabelsfreelancers}
   name={"Top Seller Categories"}
   />
 </GraphCard>
</div>:<></>
}
 
    {/* <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Adjust this value based on your layout needs
    > */}
      <Paper elevation={3} style={{ padding: '20px',margin:'10px', backgroundColor: 'white', borderRadius: '12px' }}>
      <Typography variant="h6" color="dark" style={{ fontWeight: 'bold' }}>
  Top Sellers
</Typography>
<UserTable data={selllers} isBlocked={true} handleBlockUnblock={handleBlockUnblock} handleDetailsDialogOpen={handleDetailsDialogOpen}/>
{selectedUserDetails?
            <UserDetailsDialog
            user={selectedUserDetails}
            open={detailsDialogOpen}
            handleClose={handleDetailsDialogClose}
            selectedUserProjects={selectedUserProjects}
          />:<></>}
        

      </Paper>
      <Paper elevation={3} style={{ padding: '20px',margin:'10px', backgroundColor: 'white', borderRadius: '12px' }}>
      <Typography variant="h6" color="dark" style={{ fontWeight: 'bold' }}>
  Top Freelancers
</Typography>
<UserTable data={freelancers} isBlocked={true} handleBlockUnblock={handleBlockUnblock} handleDetailsDialogOpen={handleDetailsDialogOpen1}/>
{selectedUserDetails1?
              <UserDetailsDialog1
              user={selectedUserDetails1}
              open={detailsDialogOpen1}
              handleClose={handleDetailsDialogClose1}
              approvedprojects={selectedUserProjects1.filter((project) => project.Status==="APPROVED")}
              deliveredprojects={selectedUserProjects1.filter((project) => project.Status==="DELIVERED")}
              tobeapprovedprojects={selectedUserProjects1.filter((project) => project.Status==="WAITING FOR APPROVAL")}
            />:<></>}
          
      </Paper>
      <Paper elevation={3} style={{ padding: '20px',margin:'10px', backgroundColor: 'white', borderRadius: '12px' }}>
      <Typography variant="h6" color="dark" style={{ fontWeight: 'bold' }}>
  Top Customers
</Typography>
<CutomerTable data={customers} isBlocked={true} handleBlockUnblock={handleBlockUnblock} handleDetailsDialogOpen={handleDetailsDialogOpen2}/>
{selectedUserDetails2?
              <UserDetailsDialog2
              user={selectedUserDetails2}
              open={detailsDialogOpen2}
              handleClose={handleDetailsDialogClose2}
              approvedprojects={selectedUserProjects2.filter((project) => project.Status==="APPROVED")}
              deliveredprojects={selectedUserProjects2.filter((project) => project.Status==="DELIVERED")}
              tobeapprovedprojects={selectedUserProjects2.filter((project) => project.Status==="WAITING FOR APPROVAL")}
              purchases={purchases}
            />:<></>}
          
      </Paper>
      <Paper elevation={3} style={{ padding: '20px',margin:'10px', backgroundColor: 'white', borderRadius: '12px' }}>
      <Typography variant="h6" color="dark" style={{ fontWeight: 'bold' }}>
  Top Freelance Categories
</Typography>
<CategoryTable data={freelancerscategories} isBlocked={true} handleBlockUnblock={handleBlockUnblock} handleDetailsDialogOpen={handleDetailsDialogOpen1}/>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px',margin:'10px', backgroundColor: 'white', borderRadius: '12px' }}>
      <Typography variant="h6" color="dark" style={{ fontWeight: 'bold' }}>
  Top Seller Categories
</Typography>
<CategoryTable data={sellercategories} isBlocked={true} handleBlockUnblock={handleBlockUnblock}/>
      </Paper>
    {/* </Box> */}
    </div>
    
    </>
  );
};

export default ExampleComponent;
