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
import Sidebar from '../components/SideBar';

const NotificationList = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const marginLeft = isMobile ? 0 : 300;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from your API
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:3000/blog/getallnotifications'); // Update the URL
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          console.error('Error fetching notifications:', response.statusText);
        }
      } catch (error) {
        console.error('Unexpected error during fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Container>
      {notifications.map((notification) => (
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
        </div>
            <Typography variant="body1">{notification.Message}</Typography>
          </CardContent>
        </Card>
      ))}
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
