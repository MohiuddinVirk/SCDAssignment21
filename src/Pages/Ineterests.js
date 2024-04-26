
import React from 'react';
import SideBar from '../components/SideBar';
import BlogCard from '../components/BlogCard';
import logoimage from '../assets/DigitalGroveLogo.png';
// import BoxComponent from './components/BoxComponent';
import { styled, useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';

// const LayoutContainer = styled('div')({
//   display: 'flex',
//   height: '100vh',
//   overflow: 'hidden',
// });

const App = () => {
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

  return (
    // <LayoutContainer>
    <>
     <div >
        <SideBar active={"/interests"} />
      </div>
      <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginLeft ,marginTop:10}}>
        <BlogCard
          title="Sample Blog Title"
          image={logoimage}
          buttonText="Read More"
          onClick={handleButtonClick}
          likes={42}
          categories={['Technology', 'Travel']}
          keywords={['React', 'Web Development']}
          ratings={4.5}
          owner="John Doe"
          onLike={handleLike}
          onShare={handleShare}
        />
        <BlogCard
          title="Sample Blog Title"
          image={logoimage}
          buttonText="Read More"
          onClick={handleButtonClick}
          likes={42}
          categories={['Technology', 'Travel']}
          keywords={['React', 'Web Development']}
          ratings={4.5}
          owner="John Doe"
          onLike={handleLike}
          onShare={handleShare}
        />
        <BlogCard
          title="Sample Blog Title"
          image={logoimage}
          buttonText="Read More"
          onClick={handleButtonClick}
          likes={42}
          categories={['Technology', 'Travel']}
          keywords={['React', 'Web Development']}
          ratings={4.5}
          owner="John Doe"
          onLike={handleLike}
          onShare={handleShare}
        />
      </div>
    </>
     
    // </LayoutContainer>
  );
};

export default App;
