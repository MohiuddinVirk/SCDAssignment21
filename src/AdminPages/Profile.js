// import React, { useState } from 'react';
// import Typography from '@mui/material/Typography';
// import Chip from '@mui/material/Chip';
// import Button from '@mui/material/Button';
// import EditIcon from '@mui/icons-material/Edit';
// import SideBar from '../components/AdminSideBar'
// import { useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import { styled } from '@mui/system';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const GradientEditButton = styled(Button)(({ theme }) => ({
//   background: 'linear-gradient(to right, #000000, #3533CD)',
//   color: '#ffffff',
//   '&:hover': {
//     background: 'linear-gradient(to right, #000000, #3533CD)',
//   },
//   position: 'absolute',
//   height:40,
//   borderRadius:10,
//   top: theme.spacing(2),
//   right: theme.spacing(2),
// }));


// const StyledProfileInfo = styled('div')({
//   padding: '16px',
//   position: 'relative',
//   background: '#f0f0f0', // Light gray background
//   borderRadius: '10px', // Border radius
// });

// const ProfileInfo = () => {
//   const navigate=useNavigate();
//   const[profileData,setProfileData]=useState({
//     FullName: '',
//     email: '',
//     role: '',
//     dob: '',
//     blocked: false,
//     Hobbies: [],
//     Interests: [],
//     Following: [],
//   })
 

//   const handleEditClick = () => {
//     // Handle edit button click
//     navigate("/editprofile")
//     console.log('Edit button clicked!');
//   };
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // Conditionally set marginLeft and marginRight based on screen size
//   const marginLeft = isMobile ? 10 : 300;
//   const marginRight = isMobile ? 10 : 50;

//   useEffect(()=>{
//     const fetchUserData=async()=>{
//       try {
//         const token = localStorage.getItem('token');
  
//         if (!token) {
//           // Handle case where token is not available (user not logged in)
//           console.error('Token not found in local storage');
//           return;
//         }
//   console.log(token)
//         const response = await fetch('http://localhost:3000/user/getprofile', {
//             method: 'GET',
//           headers: {
//             token: `${token}`, // Include the token in the Authorization header
//           },
//         });
  
//       if (response.ok) {
//         const data = await response.json();
//         setProfileData(data);
//       } else {
//         console.error('Error fetching user data:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Unexpected error during fetching user data:', error);
//     }
//     }
//     fetchUserData();
//   },[])
//   return (
//     <>
//     <div>
//       <SideBar active={"/adminprofile"}/>
//     </div>
//     <div style={{ marginTop: 30, marginLeft, marginRight }}>
//     <StyledProfileInfo>
//       <GradientEditButton onClick={handleEditClick} startIcon={<EditIcon />}>
//         Edit
//       </GradientEditButton>

//       <Typography variant="h4" gutterBottom>
//         Full Name: {profileData.FullName}
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom>
//         Email: {profileData.email}
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom>
//         Role: {profileData.role}
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom>
//         Date of Birth: {profileData.dob}
//       </Typography>
//       {
//         profileData.blocked===true?
// <Typography variant="subtitle1" gutterBottom>
//         Blocked: {profileData.blocked}
//       </Typography>:<></>
//       }
      

//       <Typography variant="h6" gutterBottom>
//         Hobbies:
//       </Typography>
//       <div>
//         {profileData.Hobbies.map((hobby, index) => (
//           <Chip key={index} label={hobby} style={{ marginRight: '8px' }} />
//         ))}
//       </div>

//       <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
//         Interests:
//       </Typography>
//       <div>
//         {profileData.Interests.map((interest, index) => (
//           <Chip key={index} label={interest} style={{ marginRight: '8px' }} />
//         ))}
//       </div>
//     </StyledProfileInfo>
//     </div>
//     </>
//   );
// };

// export default ProfileInfo;
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { ChangeCircle } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { linkurl } from '../link';
import Avatar from '@mui/material/Avatar';
import SideBar from '../components/AdminSideBar';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const GradientEditButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
  position: 'absolute',
  height: 40,
  borderRadius: 10,
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const StyledProfileInfo = styled('div')({
  padding: '16px',
  position: 'relative',
  background: '#f0f0f0', // Light gray background
  borderRadius: '10px', // Border radius
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const ProfileInfo = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    FullName: 'Name',
    Email: 'email',
  });

  const handleEditClick = () => {
    // Handle edit button click
    navigate('/editprofile');
    console.log('Edit button clicked!');
  };
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
        const response = await fetch(`${ linkurl }/user/getprofile`, {
            method: 'GET',
          headers: {
            token: `${token}`, // Include the token in the Authorization header
          },
        });
  
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
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
        <SideBar active={'/adminprofile'} />
      </div>
      <div style={{ marginTop: 30, marginLeft, marginRight }}>
        <StyledProfileInfo>
          <GradientEditButton onClick={handleEditClick} startIcon={<EditIcon />}>
            Edit
          </GradientEditButton>
          {/* Avatar for the profile image */}
          <Avatar
            alt={profileData.FullName}
            src={profileData.ProfileImageurl}// Replace with the actual image URL
            sx={{ width: 200, height: 200, marginBottom: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            {profileData.FullName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {profileData.Email}
          </Typography>
        </StyledProfileInfo>
      </div>
    </>
  );
};

export default ProfileInfo;
