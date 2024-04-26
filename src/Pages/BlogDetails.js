// // // import React, { useState } from 'react';
// // // import SideBar from '../components/SideBar';
// // // import BlogCard from '../components/BlogCard';
// // // import logoimage from '../assets/DigitalGroveLogo.png';
// // // // import BoxComponent from './components/BoxComponent';
// // // import { styled, useTheme } from '@mui/system';
// // // import { useMediaQuery } from '@mui/material';
// // // import { useEffect } from 'react';


// // // const App = (props) => {
// // //     const [allblogs,setAllblogs]=useState([]);
// // //   const theme = useTheme();
// // //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
// // //   const marginLeft = isMobile ? 0 : 300;

// // //   const handleButtonClick = () => {
// // //     console.log('Button Clicked!');
// // //   };

// // //   const handleLike = () => {
// // //     console.log('Liked!');
// // //   };

// // //   const handleShare = () => {
// // //     console.log('Shared!');
// // //   };
// // //   useEffect(() => {
// // //     const getAllBlogs = async () => {
// // //       try {
// // //         const response = await fetch('http://localhost:3000/blog/getallblogs');

// // //         if (response.ok) {
// // //           const data = await response.json();
// // //           setAllblogs(data); // Assuming the response data is an array of blogs
// // //         } else {
// // //           console.error('Error fetching blogs:', response.statusText);
// // //           // Handle error, e.g., show error message to the user
// // //         }
// // //       } catch (error) {
// // //         console.error('Unexpected error during fetching blogs:', error);
// // //         // Handle unexpected errors
// // //       }
// // //     };

// // //     getAllBlogs();
// // //   }, []); 
// // //   return (
// // //     // <LayoutContainer>
// // //     <>
// // //      <div >
// // //         <SideBar active={"/explore"}/>
// // //       </div>
// // //       <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginLeft ,marginTop:10}}>
// // //         {allblogs.map((element,index)=>{
// // //             return (
// // //                 <BlogCard
// // //                 key={index}
// // //                 title={element.Accounttitle}
// // //                 image={logoimage}
// // //                 buttonText="Read More"
// // //                 onClick={handleButtonClick}
// // //                 likes={42}
// // //                 categories={element.Category}
// // //                 keywords={element.Keywords}
// // //                 ratings={4.5}
// // //                 owner="John Doe"
// // //                 onLike={handleLike}
// // //                 onShare={handleShare}
// // //               />
// // //             )
// // //         })}
       
// // //       </div>
// // //     </>
     
// // //     // </LayoutContainer>
// // //   );
// // // };

// // // export default App;
// // import React from 'react';
// // import Card from '@mui/material/Card';
// // import CardContent from '@mui/material/CardContent';
// // import CardMedia from '@mui/material/CardMedia';
// // import Typography from '@mui/material/Typography';
// // import Chip from '@mui/material/Chip';
// // import Avatar from '@mui/material/Avatar';

// // const BlogDetails = ({ blogData }) => {
// //   const { UserId, Username, Blogdata, Disabled, Reason, Rating, NumberofRatings, Accounttitle, Keywords, Category, Comments } = blogData;

// //   return (
// //     <Card>
// //       {/* Blog Image */}
// //       <CardMedia
// //         component="img"
// //         height="200"
// //         image="path_to_your_image" // Replace with the actual path to your blog image
// //         alt="Blog Image"
// //         style={{ objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
// //       />

// //       {/* Blog Content */}
// //       <CardContent>
// //         <Typography variant="h5">{Accounttitle}</Typography>
// //         <Typography variant="subtitle1" color="textSecondary">
// //           by {Username} (User ID: {UserId})
// //         </Typography>

// //         {/* Blog Categories */}
// //         <div style={{ marginTop: '16px', marginBottom: '16px' }}>
// //           {Category.map((category, index) => (
// //             <Chip key={index} label={category} variant="outlined" style={{ marginRight: '8px' }} />
// //           ))}
// //         </div>

// //         {/* Blog Keywords */}
// //         <div style={{ marginTop: '16px', marginBottom: '16px' }}>
// //           {Keywords.map((keyword, index) => (
// //             <Chip key={index} label={keyword} variant="outlined" style={{ marginRight: '8px' }} />
// //           ))}
// //         </div>

// //         {/* Blog Rating */}
// //         <Typography variant="body1" color="textSecondary">
// //           Rating: {Rating} ({NumberofRatings} ratings)
// //         </Typography>

// //         {/* Blog Content */}
// //         <Typography variant="body2" style={{ marginTop: '16px' }}>
// //           {Blogdata}
// //         </Typography>

// //         {/* Comments Section */}
// //         <div style={{ marginTop: '16px' }}>
// //           <Typography variant="h6">Comments</Typography>
// //           {Comments.map((comment, index) => (
// //             <div key={index} style={{ marginTop: '8px' }}>
// //               <Avatar>{comment.Username.charAt(0)}</Avatar>
// //               <Typography variant="body2" style={{ marginLeft: '8px', display: 'inline' }}>
// //                 {comment.Username} says: {comment.commentText}
// //               </Typography>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Additional Blog Details */}
// //         {Disabled && (
// //           <div style={{ marginTop: '16px', color: 'red' }}>
// //             <Typography variant="body2">This blog is disabled.</Typography>
// //             <Typography variant="body2">Reason: {Reason}</Typography>
// //           </div>
// //         )}
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default BlogDetails;
// // BlogDetails.js
// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Chip from '@mui/material/Chip';
// import Avatar from '@mui/material/Avatar';
// import logo from "../assets/DigitalGroveLogo.png"
// import Button from '@mui/material/Button';
// import { styled } from '@mui/system';

// // Styled components for the gradient follow button
// const GradientFollowButton = styled(Button)(({ theme }) => ({
//   background: 'linear-gradient(to right, #000000, #3533CD)',
//   color: '#ffffff',
//   '&:hover': {
//     background: 'linear-gradient(to right, #000000, #3533CD)',
//   },
// }));

// const BlogDetails = ({ blogData }) => {
//   const { UserId, Username, Blogdata, Disabled, Reason, Rating, NumberofRatings, Accounttitle, Keywords, Category, Comments } = blogData;

//   const handleButtonClick = () => {
//     // Implement the button click logic here
//     console.log('Button clicked!');
//   };

//   return (
//     <Card>
//       {/* Blog Image */}
//       <CardMedia
//         component="img"
//         height="200"
//         image={logo} // Replace with the actual path to your blog image
//         alt="Blog Image"
//         style={{ objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
//       />

//       {/* Blog Content */}
//       <CardContent>
//         <Typography variant="h5">{Accounttitle}</Typography>
//         <Typography variant="subtitle1" color="textSecondary">
//           by {Username} (User ID: {UserId})
//           {/* Gradient Follow Button */}
//           <GradientFollowButton onClick={handleButtonClick} variant="contained" size="small" style={{ marginLeft: '8px' }}>
//             Follow
//           </GradientFollowButton>
//         </Typography>

//         {/* Blog Categories */}
//         <div style={{ marginTop: '16px', marginBottom: '16px' }}>
//           {Category.map((category, index) => (
//             <Chip key={index} label={category} variant="outlined" style={{ marginRight: '8px' }} />
//           ))}
//         </div>

//         {/* Blog Keywords */}
//         <div style={{ marginTop: '16px', marginBottom: '16px' }}>
//           {Keywords.map((keyword, index) => (
//             <Chip key={index} label={keyword} variant="outlined" style={{ marginRight: '8px', background: '#f0f0f0' }} />
//           ))}
//         </div>

//         {/* Blog Rating */}
//         <Typography variant="body1" color="textSecondary">
//           Rating: {Rating} ({NumberofRatings} ratings)
//         </Typography>

//         {/* Blog Content */}
//         <Typography variant="body2" style={{ marginTop: '16px' }}>
//           {Blogdata}
//         </Typography>

//         {/* Comments Section */}
//         <div style={{ marginTop: '16px' }}>
//           <Typography variant="h6">Comments</Typography>
//           {Comments.map((comment, index) => (
//             <div key={index} style={{ marginTop: '8px' }}>
//               <Avatar>{comment.Username.charAt(0)}</Avatar>
//               <Typography variant="body2" style={{ marginLeft: '8px', display: 'inline' }}>
//                 {comment.Username} says: {comment.commentText}
//               </Typography>
//             </div>
//           ))}
//         </div>

//         {/* Additional Blog Details */}
//         {Disabled && (
//           <div style={{ marginTop: '16px', color: 'red' }}>
//             <Typography variant="body2">This blog is disabled.</Typography>
//             <Typography variant="body2">Reason: {Reason}</Typography>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default BlogDetails;
import React from 'react';
import SideBar from '../components/SideBar';
import BlogDetails from '../components/DetailsCard'; // Adjust the import path based on your project structure
import BoxComponent from '../components/BoxComponent';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
const BlogDetailsPage = () => {
  const location = useLocation();

  // Access the data from the state object
 const [element,setElement]=useState(location.state.element);


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Conditionally set marginLeft and marginRight based on screen size
  const marginLeft = isMobile ? 10 : 300;
  const marginRight = isMobile ? 10 : 50;

  return (
    <>
      <div>
        <SideBar active="/explore" />
      </div>
      <div style={{ marginTop: 30, marginLeft, marginRight }}>
        {/* <BoxComponent size="xxlarge"> */}
        <BlogDetails blogData={element} />
        {/* </BoxComponent> */}
      </div>
    </>
  );
};

export default BlogDetailsPage;
