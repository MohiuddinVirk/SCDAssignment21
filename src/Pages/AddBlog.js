import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import logoImage from '../assets/DigitalGroveLogo.png'
import Autocomplete from '@mui/material/Autocomplete';
import SideBar from '../components/SideBar';
import { Add, PhotoCamera } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from '@mui/material'; // Assuming you have the GradientButton component
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { storage } from "../firebase-config";
import { ref, uploadBytes, getMetadata, getDownloadURL } from "firebase/storage";
import Vendorcategoryimageupload from "../components/Fileuploadbutton";

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));

const AddBlog = () => {
  const [file,setFile]=useState(null)
  const [blogData, setBlogData] = useState({
    UserId: '',
    Username: '',
    Blogdata: '',
    Disabled: false,
    Reason: '',
    Rating: 0,
    NumberofRatings: 0,
    Accounttitle: '',
    Keywords: [],
    Category: [],
    Comments: [],
    // Image: '', 
    // url:'',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files[0];

    // You may want to handle the selected image here, e.g., upload to a server or display a preview
    // For simplicity, we're just updating the Image property in the state
    setBlogData((prevData) => ({
      ...prevData,
      Image: URL.createObjectURL(files), // Use URL.createObjectURL to create a preview URL
    }));
  };
  function getCurrentTimestamp() {
    return new Date().getTime();
  }
  const handleAddBlog1 =async () => {
    // Implement the logic to add a blog
    console.log('Adding blog:', file);
    // try{
    //   let values=blogData;
    //   if (file) {
    //     const imageFile = file;
    //       const storageRef = ref(storage, `Blog/${String(getCurrentTimestamp)}`);
    //       const uploadTask = uploadBytes(storageRef, imageFile);
    //       await uploadTask;
    //       const metadata = await getMetadata(storageRef);
    //       const downloadURL = await getDownloadURL(storageRef);
    //       values.url = downloadURL;
    //       values.Image=`Blog/${String(getCurrentTimestamp)}`;
  
    //   }
    // }catch(error){
    //   alert(console.log(error.message))
    // }
    
    // Reset the form after adding
    setBlogData({
      UserId: '',
      Username: '',
      Blogdata: '',
      Disabled: false,
      Reason: '',
      Rating: 0,
      NumberofRatings: 0,
      Accounttitle: '',
      Keywords: [],
      Category: [],
      Comments: [],
      // Image: '',
      // url:'',
    });
  };
    const handleAddBlog = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          // Handle case where token is not available (user not logged in)
          console.error('Token not found in local storage');
          return;
        }
  console.log(blogData)
        const response = await fetch('http://localhost:3000/blog/createblog', {
  method: 'POST',
  body: JSON.stringify({
    UserId: blogData.UserId,
    Username: blogData.Username,
    Blogdata: blogData.Blogdata,
    Disabled: blogData.Disabled,
    Reason: blogData.Reason,
    Rating: blogData.Rating,
    NumberofRatings: blogData.NumberofRatings,
    Accounttitle: blogData.Accounttitle,
    Keywords: blogData.Keywords,
    Category: blogData.Category,
  }),
  headers: {
    'Content-Type': 'application/json',
    token: `${token}`,
  },
});
  
        if (!response.ok) {
          throw new Error('Failed to add blog');
        }
  
        // Reset the form after adding
        setBlogData({
          UserId: '',
          Username: '',
          Blogdata: '',
          Disabled: false,
          Reason: '',
          Rating: 0,
          NumberofRatings: 0,
          Accounttitle: '',
          Keywords: [],
          Category: [],
          Comments: [],
        });
  
        console.log('Blog added successfully');
      } catch (error) {
        console.error('Error adding blog:', error.message);
      }
    };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Conditionally set marginLeft and marginRight based on screen size
  const marginLeft = isMobile ? 10 : 300;
  const marginRight = isMobile ? 10 : 50;
  return (
    <>
          <div>
        <SideBar active="/addblog" />
      </div>
      <div style={{ marginTop: 30, marginLeft, marginRight }}>
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
              color: `linear-gradient(to right, #000000, #3533CD)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: isMobile ? 0 : '16px', // Adjusted margin for larger screens
            }}
          >
            Add Blog
          </Typography>
        </div>

        {/* Blog Title */}
        <TextField
          label="Blog Title"
          variant="outlined"
          fullWidth
          name="Accounttitle"
          value={blogData.Accounttitle}
          onChange={handleInputChange}
          style={{ marginTop: '16px' }}
        />

{/* <Vendorcategoryimageupload setFile={setFile}/> */}
        {/* Image Picker */}
        {/* <input
          type="file"
          accept="image/*"
          id="image-picker"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        /> */}
        {/* <TextField
          label="Choose Image"
          variant="outlined"
          fullWidth
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <label htmlFor="image-picker">
                  <GradientButton component="span" variant="outlined" size="small" startIcon={<PhotoCamera />} style={{height:40,borderRadius:10,marginTop:10}}>
                    Upload
                  </GradientButton>
                </label>
              </InputAdornment>
            ),
          }}
          style={{ marginTop: '16px' }}
        />
        {blogData.Image && <img src={blogData.Image} alt="Selected" style={{ marginTop: '16px', maxWidth: '100%' }} />} */}

        {/* Blog Keywords */}
        <Autocomplete
          multiple
          id="keywords"
          options={['React', 'JavaScript', 'Node.js', 'Web Development']}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          onChange={(e, newValue) => setBlogData((prevData) => ({ ...prevData, Keywords: newValue }))}
          renderInput={(params) => <TextField {...params} label="Keywords" variant="outlined" fullWidth />}
          style={{ marginTop: '16px' }}
        />

        {/* Blog Categories */}
        <Autocomplete
          multiple
          id="categories"
          options={['Technology', 'Programming', 'Science', 'Travel']}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          onChange={(e, newValue) => setBlogData((prevData) => ({ ...prevData, Category: newValue }))}
          renderInput={(params) => <TextField {...params} label="Categories" variant="outlined" fullWidth />}
          style={{ marginTop: '16px' }}
        />

        {/* Blog Content */}
        <TextField
          label="Blog Content"
          variant="outlined"
          fullWidth
          multiline
          rows={8}
          name="Blogdata"
          value={blogData.Blogdata}
          onChange={handleInputChange}
          style={{ marginTop: '16px' }}
        />
        {/* Add Blog Button */}
        <GradientButton onClick={handleAddBlog} variant="contained" size="small" startIcon={<Add />} style={{height:40,borderRadius:10,marginTop:10}}>
          Add Blog
        </GradientButton>
      </CardContent>
    </Card>
    </div>
    </>
  );
};

export default AddBlog;
