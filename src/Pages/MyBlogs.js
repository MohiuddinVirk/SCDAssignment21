import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import BlogCard from '../components/MyBlogCard';
import logoimage from '../assets/DigitalGroveLogo.png';
// import BoxComponent from './components/BoxComponent';
import { styled, useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const App = () => {
  const navigate=useNavigate();
    const [allblogs,setAllblogs]=useState([]);
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
  const handleDelteBlog=async(index)=>{
    let temparr=[...allblogs];
    temparr.splice(index,1);
    setAllblogs(temparr)
  }
  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          // Handle case where token is not available (user not logged in)
          console.error('Token not found in local storage');
          return;
        }
        // const response = await fetch('http://localhost:3000/blog/getallmyblogs');
        const response = await fetch('http://localhost:3000/blog/getallmyblogs', {
          method: 'GET',
        headers: {
          token: `${token}`, // Include the token in the Authorization header
        },
      });
        if (response.ok) {
          const data = await response.json();
          setAllblogs(data); // Assuming the response data is an array of blogs
        } else {
          console.error('Error fetching blogs:', response.statusText);
          // Handle error, e.g., show error message to the user
        }
      } catch (error) {
        console.error('Unexpected error during fetching blogs:', error);
        // Handle unexpected errors
      }
    };

    getAllBlogs();
  }, []); 
  return (
    // <LayoutContainer>
    <>
     <div >
        <SideBar active={"/myblogs"}/>
      </div>
      <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginLeft ,marginTop:10}}>
        {allblogs.map((element,index)=>{
            return (
                <BlogCard
                element={element}
                key={index}
                index={index}
                handleDelteBlog={handleDelteBlog}
              />
            )
        })}
       
      </div>
    </>
     
    // </LayoutContainer>
  );
};

export default App;
