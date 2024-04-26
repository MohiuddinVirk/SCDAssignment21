// App.js

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Container,
  Button,
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import logoimage from '../assets/DigitalGroveLogo.png'
import { styled, useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { linkurl } from '../link';
import Pagination from '@mui/material/Pagination';
import Sidebar from '../components/AdminSideBar';

const NotificationList = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const marginLeft = isMobile ? 0 : 300;
  const [notifications, setNotifications] = useState([]);
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
  useEffect(() => {
    // Fetch notifications from your API
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${linkurl}/user/getallnotifications`); // Update the URL
        if (response.ok) {
          const data = await response.json();
          let temp=[]
          data.freelancer.forEach(element => {
            if(element.Notifications){
              temp=[...temp,...element.Notifications]
            }
          });
          data.seller.forEach(element => {
            if(element.Notifications){
              temp=[...temp,...element.Notifications]
            }
          });
          data.customer.forEach(element => {
            if(element.Notifications){
              temp=[...temp,...element.Notifications]
            }
          });
          const sortedProjects = temp.sort((a, b) => {
            // Convert the createdAt strings to Date objects
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
          
            // Compare the Date objects
            return dateB - dateA;
          });
          setNotifications(sortedProjects);
        } else {
          console.error('Error fetching notifications:', response.statusText);
        }
      } catch (error) {
        console.error('Unexpected error during fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);
  const itemsPerPage = 50;
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = notifications.slice(startIndex, endIndex);
  return (
    <Container>
      {paginatedData.map((notification) => (
        <Card key={notification._id} sx={{ marginBottom: 2 }}>
          <CardContent>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
          <Avatar alt="Logo" src={logoimage} sx={{ width: 64, height: 64, marginRight: 2 }} />

          <Typography
            variant="h6"
            sx={{
              marginTop: '8px',
              textAlign: 'center',
              color: `linear-gradient(to right, #000000, #3533CD)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: isMobile ? 0 : '16px', // Adjusted margin for larger screens
            }}
          >
            Notification
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginTop: '8px',
              textAlign: 'center',
              color: `linear-gradient(to right, #000000, #3533CD)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: isMobile ? 0 : '16px', // Adjusted margin for larger screens
            }}
          >
            {formatDateTime(notification.createdAt)}
          </Typography>
        </div>
            <Typography variant="body1">{notification.message}</Typography>
          </CardContent>
        </Card>
      ))}
       <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
        <Typography>Page: {page}</Typography>
        <Pagination count={Math.ceil(notifications.length / itemsPerPage)} page={page} onChange={handlePageChange} size="small" />
      </Box>
    </Container>
  );
};

const App = () => {
    const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
const marginLeft = isMobile ? 0 : 300;
  return (
    <>
    <div >
       <Sidebar active={"/notifications"}/>
     </div>
     <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginLeft ,marginTop:10}}>
      <NotificationList />
    </div>
    </>
  );
};

export default App;
