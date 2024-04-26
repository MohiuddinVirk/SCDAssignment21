// import React, { useState, useEffect } from 'react';

// const UserProfile = () => {
//   // Assume you have a state to store the user data
//   const [userData, setUserData] = useState(null);

//   // Assume you have a function to fetch user data from an API
//   const fetchUserData = async () => {
//     try {
        // const token = localStorage.getItem('token');

        // if (!token) {
        //   // Handle case where token is not available (user not logged in)
        //   console.error('Token not found in local storage');
        //   return;
        // }
//   console.log(token)
        // const response = await fetch('http://localhost:3000/user/getprofile', {
        //     method: 'GET',
        //   headers: {
        //     token: `${token}`, // Include the token in the Authorization header
        //   },
        // });
  
//       if (response.ok) {
//         const data = await response.json();
//         setUserData(data);
//       } else {
//         console.error('Error fetching user data:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Unexpected error during fetching user data:', error);
//     }
//   };

//   // Fetch user data on component mount
//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   if (!userData) {
//     // Loading state or handle when user data is not available
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <div>
//         <strong>Full Name:</strong> {userData.FullName}
//       </div>
//       <div>
//         <strong>Email:</strong> {userData.email}
//       </div>
//       <div>
//         <strong>Role:</strong> {userData.role}
//       </div>
//       <div>
//         <strong>Date of Birth:</strong> {new Date(userData.dob).toLocaleDateString()}
//       </div>
//       <div>
//         <strong>Blocked:</strong> {userData.blocked ? 'Yes' : 'No'}
//       </div>
//       {userData.blocked && (
//         <div>
//           <strong>Reason for Blocking:</strong> {userData.reason}
//         </div>
//       )}
//       <div>
//         <strong>Hobbies:</strong> {userData.Hobbies.join(', ')}
//       </div>
//       <div>
//         <strong>Interests:</strong> {userData.Interests.join(', ')}
//       </div>
//       <div>
//         <strong>Following:</strong>
//         <ul>
//           {userData.Following.map((following, index) => (
//             <li key={index}>{`${following.Username} (ID: ${following.UserId})`}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SideBar from '../components/SideBar'
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const GradientEditButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
  position: 'absolute',
  height:40,
  borderRadius:10,
  top: theme.spacing(2),
  right: theme.spacing(2),
}));


const StyledProfileInfo = styled('div')({
  padding: '16px',
  position: 'relative',
  background: '#f0f0f0', // Light gray background
  borderRadius: '10px', // Border radius
});

const ProfileInfo = () => {
  const navigate=useNavigate();
  const[profileData,setProfileData]=useState({
    FullName: '',
    email: '',
    role: '',
    dob: '',
    blocked: false,
    Hobbies: [],
    Interests: [],
    Following: [],
  })
 

  const handleEditClick = () => {
    // Handle edit button click
    navigate("/editprofile")
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
        const response = await fetch('http://localhost:3000/user/getprofile', {
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
      <SideBar active={"/profile"}/>
    </div>
    <div style={{ marginTop: 30, marginLeft, marginRight }}>
    <StyledProfileInfo>
      <GradientEditButton onClick={handleEditClick} startIcon={<EditIcon />}>
        Edit
      </GradientEditButton>

      <Typography variant="h4" gutterBottom>
        Full Name: {profileData.FullName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Email: {profileData.email}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Role: {profileData.role}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Date of Birth: {profileData.dob}
      </Typography>
      {
        profileData.blocked===true?
<Typography variant="subtitle1" gutterBottom>
        Blocked: {profileData.blocked}
      </Typography>:<></>
      }
      

      <Typography variant="h6" gutterBottom>
        Hobbies:
      </Typography>
      <div>
        {profileData.Hobbies.map((hobby, index) => (
          <Chip key={index} label={hobby} style={{ marginRight: '8px' }} />
        ))}
      </div>

      <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
        Interests:
      </Typography>
      <div>
        {profileData.Interests.map((interest, index) => (
          <Chip key={index} label={interest} style={{ marginRight: '8px' }} />
        ))}
      </div>
    </StyledProfileInfo>
    </div>
    </>
  );
};

export default ProfileInfo;
