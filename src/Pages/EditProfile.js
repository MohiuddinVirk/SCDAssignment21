import React, { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { Save } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import logoImage from '../assets/DigitalGroveLogo.png';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Sidebar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
  height: 40,
  borderRadius: 15,
  width: '96%',
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 10,
  marginRight: 10,
}));

const EditProfile = () => {

  const navigate=useNavigate();
  const [profileData, setProfileData] = useState({
    FullName: '',
    email: '',
    Role: '',
    dob: '',
    Hobbies: [],
    Interests: [],
    Following: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        // Handle case where token is not available (user not logged in)
        console.error('Token not found in local storage');
        return;
      }

      const updateData = {
        FullName: profileData.FullName,
        email: profileData.email,
        Role: profileData.Role,
        dob: profileData.dob,
        Hobbies: profileData.Hobbies,
        Interests: profileData.Interests,
        Following: profileData.Following,
      };

      const response = await fetch('http://localhost:3000/user/updateprofile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        navigate("/profile")
        // You may want to update the UI or perform additional actions after successful profile update
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      console.error('Unexpected error during profile update:', error);
    }
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
        {/* Sidebar component goes here */}
        <Sidebar active={"/profile"}/>
      </div>
      <div style={{ marginTop: 30, marginLeft, marginRight, position: 'relative' }}>
        <Card>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '16px' }}>
              <Avatar alt="Logo" src={logoImage} sx={{ width: 64, height: 64, marginRight: 2 }} />
              <Typography
                variant="h5"
                sx={{
                  marginTop: '8px',
                  textAlign: 'center',
                  height: 15,
                  color: 'linear-gradient(to right, #000000, #3533CD)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: isMobile ? 0 : '16px',
                }}
              >
                Edit Profile
              </Typography>
            </div>

            {/* Full Name */}
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              name="FullName"
              value={profileData.FullName}
              onChange={handleInputChange}
              style={{ marginTop: '16px' }}
            />

            {/* Email */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="Email"
              value={profileData.email}
              onChange={handleInputChange}
              style={{ marginTop: '16px' }}
            />

            {/* Date of Birth */}
            <TextField
              label="Date of Birth"
              variant="outlined"
              fullWidth
              name="DateOfBirth"
              value={profileData.dob}
              onChange={handleInputChange}
              style={{ marginTop: '16px' }}
            />

           
            {/* Hobbies */}
            <Autocomplete
              multiple
              id="hobbies"
              options={['Photography', 'Travel', 'Reading', 'Sports']}
              freeSolo
              value={profileData.Hobbies}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              onChange={(e, newValue) => setProfileData((prevData) => ({ ...prevData, Hobbies: newValue }))}
              renderInput={(params) => <TextField {...params} label="Hobbies" variant="outlined" fullWidth />}
              style={{ marginTop: '16px' }}
            />

            {/* Interests */}
            <Autocomplete
              multiple
              id="interests"
              options={['Reading', 'Coding', 'Traveling', 'Cooking']}
              freeSolo
              value={profileData.Interests}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              onChange={(e, newValue) => setProfileData((prevData) => ({ ...prevData, Interests: newValue }))}
              renderInput={(params) => <TextField {...params} label="Interests" variant="outlined" fullWidth />}
              style={{ marginTop: '16px' }}
            />
          </CardContent>
          <GradientButton onClick={handleEditProfile} startIcon={<Save />}>
            Save
          </GradientButton>
        </Card>
      </div>
    </>
  );
};

export default EditProfile;
