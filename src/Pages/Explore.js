import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import BlogCard from '../components/BlogCard';
import logoImage from '../assets/DigitalGroveLogo.png';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import logoimage from '../assets/DigitalGroveLogo.png';
import { styled, useTheme } from '@mui/system';
import { useMediaQuery, TextField, Autocomplete, Button, Grid, Paper } from '@mui/material';
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

const App = () => {
  const navigate = useNavigate();
  const [allblogs, setAllblogs] = useState([]);
  const [searchCategory, setSearchCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [searchAuthor, setSearchAuthor] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const marginLeft = isMobile ? 0 : 300;

  const handleButtonClick = () => {
    console.log('Button Clicked!');
  };

  const handleLike = () => {
    console.log('Liked!');
  };

  const handleShare = () => {
    console.log('Shared!');
  };

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/blog/getallblogs');

        if (response.ok) {
          const data = await response.json();
          setAllblogs(data); // Assuming the response data is an array of blogs
        } else {
          console.error('Error fetching blogs:', response.statusText);
          // Handle error, e.g., show error message to the user
        }
      } catch (error) {
        console.error('Unexpected error during fetching blogs:', error);
      }
    };

    getAllBlogs();
  }, []);

  const handleSearch = async () => {
    try {
      let url = 'http://localhost:3000/blog/getallblogs';
  
      if (searchCategory) {
        url = `http://localhost:3000/blog/getblogsbycategory/${searchCategory}`;
      } else if (searchKeyword) {
        url = `http://localhost:3000/blog/getblogsbykeyword/${searchKeyword}`;
      } else if (searchAuthor) {
        url = `http://localhost:3000/blog/getblogsbyauthor/${searchAuthor}`;
      }
  
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        setAllblogs(data);
        setSearchKeyword(null);
        setSearchCategory(null);
        setSearchAuthor('')
      } else {
        console.error('Error fetching blogs:', response.statusText);
      }
    } catch (error) {
      console.error('Unexpected error during fetching blogs:', error);
    }
  };
  

  return (
    <>
      <div>
        <SideBar active="/explore" />
      </div>
      <div style={{ marginLeft, marginTop: 10 }}>
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
            Search
          </Typography>
        </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={['Technology', 'Programming', 'Science', 'Travel']}
                value={searchCategory}
                onChange={(event, newValue) => setSearchCategory(newValue)}
                renderInput={(params) => <TextField {...params} label="Category" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={['React', 'JavaScript', 'Node.js', 'Web Development']}
                value={searchKeyword}
                onChange={(event, newValue) => setSearchKeyword(newValue)}
                renderInput={(params) => <TextField {...params} label="Keyword" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Author Name"
                variant="outlined"
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
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

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '16px' }}>
          {allblogs.map((element, index) => (
            <BlogCard
              key={index}
              element={element}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
