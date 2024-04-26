
import React,{useState} from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import { Interests } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import Avatar from '@mui/material/Avatar';
import { Logout } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import { PostAdd } from '@mui/icons-material';
import { Notifications } from '@mui/icons-material';
import { AllInbox } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import logoImage from '../assets/DigitalGroveLogo.png'; // Import your logo image
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Sidebar = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const [open, setOpen] = React.useState(!isMobile);
  const [selectedItem, setSelectedItem] = React.useState(props.active); // Default selected item is Home

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (path) => {
    setSelectedItem(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Explore', icon: <ExploreIcon />, path: '/explore' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    // { text: 'Interests', icon: <Interests />, path: '/interests' },
    // { text: 'Search', icon: <Search />, path: '/search' },
    { text: 'Add Blog', icon: <PostAdd />, path: '/addblog' },
    { text: 'My Blogs', icon: <AllInbox />, path: '/myblogs' },
    { text: 'Notifications', icon: <Notifications />, path: '/notifications' },
    { text: 'Community', icon: <PeopleIcon />, path: '/community' },

  ];
  const log = (path) => {
    setSelectedItem(path);
    if (isMobile) {
      setOpen(false);
    }

    // Handle logout separately
    if (path === 'Logout') {
      // Delete the token from local storage
      localStorage.removeItem('token');
      // Navigate to the signin page
      navigate('/signin');
    } else {
      navigate(path);
    }
  };
  return (
    <div>
      {isMobile && (
        <IconButton color="inherit" onClick={handleToggleSidebar}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        anchor="left"
        open={open}
        onClose={handleToggleSidebar}
        variant={isMobile ? 'temporary' : 'permanent'}
        sx={{ borderRadius: isMobile ? '16px 0 0 16px' : '16px' }}
      >
        {/* Logo and Name Section */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '16px' }}>
          <Avatar alt="Logo" src={logoImage} sx={{ width: 64, height: 64, marginRight: 2 }} />

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
            Digital Grove
          </Typography>
        </div>

        {/* Menu Items */}
        <List sx={{ width: isMobile ? '60vw' : '250px', padding: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              sx={{
                borderRadius: 3,
                marginTop: 1,
                background: selectedItem === item.path
                  ? `linear-gradient(to right, #000000, #3533CD)`
                  : 'inherit',
              }}
              onClick={() => {
                handleMenuItemClick(item.path);
                navigate(item.path); // Navigate to the specified path
              }}
            >
              <ListItemIcon sx={{ color: selectedItem === item.path ? '#ffffff' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ color: selectedItem === item.path ? '#ffffff' : 'inherit' }}
              />
            </ListItem>
          ))}
          <ListItem
              button
              key={"Logout"}
              sx={{
                borderRadius: 3,
                marginTop: 1,
                background:`linear-gradient(to right, #000000, #3533CD)`
              }}
              onClick={() => {
                log("Logout");
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                {<Logout/>}
              </ListItemIcon>
              <ListItemText
                primary={"Logout"}
                sx={{ color: '#ffffff' }}
              />
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
