import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from "../assets/DigitalGroveLogo.png";
import { styled } from '@mui/system';
import { Comment, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// Styled components for the gradient follow button
const GradientFollowButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));

const BlogDetails = (props) => {
//   const { UserId, Username, Blogdata, Disabled, Reason, Rating, NumberofRatings, Accounttitle, Keywords, Category, Comments } = location.state;
const navigate=useNavigate()
  const [newComment, setNewComment] = useState('');
const [data,setData]=useState(props.element)
  const handleButtonClick = () => {
    // Implement the button click logic here
    console.log('Button clicked!');
  };
const handleShowEdit=async()=>{
  navigate("/editblog",{ state: { element: data[0].element } })
}
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }
  
      const response = await fetch('http://localhost:3000/user/getprofile', {
        method: 'GET',
        headers: {
          token: `${token}`,
        },
      });
  
      if (response.ok) {
        const datauser = await response.json();
  
        const requestData = {
          BlogId: data[0].element._id,
          UserId: datauser._id,
          Username: datauser.FullName,
          comment: newComment,
        };
  
        const newresponse = await fetch('http://localhost:3000/blog/commentblog', {
          method: 'PUT',
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json',
            token: `${token}`,
          },
        });
  
        if (newresponse.ok) {
          // Handle the response if needed
          let tempobj={};
          tempobj=data;
          tempobj[0].element.Comments.push({UserId: datauser._id,
            Username: datauser.FullName,
            commentText:newComment})
            console.log(tempobj)
          console.log('Comment added successfully');
        } else {
          throw new Error('Failed to add comment');
        }
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Unexpected error during fetching user data:', error);
    }
  
    // Reset the comment field after adding
    setNewComment('');
  };
  


  return (
    <>
    {data.map((element,index)=>{
        return(
            <Card>
            {/* Blog Image */}
            <CardMedia
              component="img"
              height="200"
              image={logo} // Replace with the actual path to your blog image
              alt="Blog Image"
              style={{ objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            />
      
            {/* Blog Content */}
            <CardContent>
              <Typography variant="h5">{element.element.Accounttitle}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                by {element.element.Username} (User ID: {element.element.UserId})
                {/* Gradient Follow Button */}
                {/* <GradientFollowButton onClick={handleButtonClick} variant="contained" size="small" style={{ marginLeft: '8px',borderRadius:10,height:35 }}>
                  Edit
                </GradientFollowButton> */}
                <Button
                  onClick={handleShowEdit}
                  variant="contained"
                  size="small"
                  startIcon={<Edit />}
                  style={{ marginTop: '10px', height: '40px', borderRadius: 10,background: 'linear-gradient(to right, #000000, #3533CD)',
                  color: '#ffffff' }}
                >
                  Edit
                </Button>
              </Typography>
      
              {/* Blog Categories */}
              <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                {element.element.Category.map((category, index) => (
                  <Chip key={index} label={category} variant="outlined" style={{ marginRight: '8px', background: '#f0f0f0' }} />
                ))}
              </div>
      
              {/* Blog Keywords */}
              <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                {element.element.Keywords.map((keyword, index) => (
                  <Chip key={index} label={keyword} variant="outlined" style={{ marginRight: '8px', background: '#f0f0f0' }} />
                ))}
              </div>
      
              {/* Blog Rating */}
              <Typography variant="body1" color="textSecondary">
                Rating: {element.element.Rating} ({element.element.NumberofRatings} ratings)
              </Typography>
      
              {/* Blog Content */}
              <Typography variant="body2" style={{ marginTop: '16px' }}>
                {element.element.Blogdata}
              </Typography>
      
              {/* Comments Section */}
              <div style={{ marginTop: '16px' }}>
                <Typography variant="h6">Comments</Typography>
                {element.element.Comments.map((comment, index) => (
                  <div key={index} style={{ marginTop: '8px' }}>
                    <Avatar>{comment.Username.charAt(0)}</Avatar>
                    <Typography variant="body2" style={{ marginLeft: '8px', display: 'inline' }}>
                      {comment.Username} says: {comment.commentText}
                    </Typography>
                  </div>
                ))}
              </div>
      
              {/* Additional Blog Details */}
              {element.element.Disabled && (
                <div style={{ marginTop: '16px', color: 'red' }}>
                  <Typography variant="body2">This blog is disabled.</Typography>
                  <Typography variant="body2">Reason: {element.element.Reason}</Typography>
                </div>
              )}
      
              {/* Add Comment Section */}
              <div style={{ marginTop: '16px' }}>
                <TextField
                  label="Add a Comment"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={newComment}
                  onChange={handleCommentChange}
                />
                <Button
                  onClick={handleAddComment}
                  variant="contained"
                  size="small"
                  startIcon={<Comment />}
                  style={{ marginTop: '10px', height: '40px', borderRadius: 10,background: 'linear-gradient(to right, #000000, #3533CD)',
                  color: '#ffffff' }}
                >
                  Add Comment
                </Button>
              </div>
            </CardContent>
          </Card>
      
        )
    })}
    </>
     );
};

export default BlogDetails;
