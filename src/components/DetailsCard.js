import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import logo from "../assets/DigitalGroveLogo.png";
import { styled } from '@mui/system';
import { Comment } from '@mui/icons-material';

// Styled components for the gradient follow button
const GradientFollowButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));

const BlogDetails = ({ blogData }) => {
  const { _id, UserId, Username, Blogdata, Disabled, Reason, Rating, NumberofRatings, Accounttitle, Keywords, Category, Comments } = blogData;
const [exist,setExist]=useState(false);
const [value, setValue] = useState(null); 
  const [newComment, setNewComment] = useState('');
const [user,setUserData]=useState(null)
const [openRatingDialog, setOpenRatingDialog] = useState(false);
const [ratingInput, setRatingInput] = useState(0);
  const handleUnfollowUser= async() => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        // Handle case where token is not available (user not logged in)
        console.error('Token not found in local storage');
        return;
      }

      const followData = {
        tobeunfollowed: _id,
      };

      const response = await fetch('http://localhost:3000/user/unfollow', {
        method: 'PUT',
        body: JSON.stringify(followData),
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to unfollow user');
      }
setExist(false)
      console.log('User unfollowed successfully');
      // You may want to update the UI or perform additional actions after successful follow

    } catch (error) {
      console.error('Error unfollowing user:', error.message);
    }
  };


  const handleRateBlog = async () => {
    setOpenRatingDialog(true);
  };

  const handleRatingInputChange = (event) => {
    // Ensure the rating is between 1 and 5
    const inputValue = Math.min(Math.max(parseInt(event.target.value) || 0, 1), 5);
    setRatingInput(inputValue);
  };

  const handleRateNow = () => {
    // Call your rate function with the ratingInput value
    console.log(`Rating Now: ${ratingInput}`);
    handleRateBlog1();
    setOpenRatingDialog(false);
  };

  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false);
  };
  const handleRateBlog1 = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const rateData = {
        BlogId: _id,
        newrating: String(ratingInput), // replace with the actual rating you want to send
      };

      const response = await fetch('http://localhost:3000/blog/rateblog', {
        method: 'PATCH',
        body: JSON.stringify(rateData),
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`,
        },
      });

      if (response.ok) {
        // Handle the response if needed
        // You may want to update the UI or perform additional actions after successful rating
        console.log('Blog rated successfully');
      } else {
        throw new Error('Failed to rate blog');
      }
    } catch (error) {
      console.error('Error rating blog:', error.message);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleFollowUser = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        // Handle case where token is not available (user not logged in)
        console.error('Token not found in local storage');
        return;
      }

      const followData = {
        Username: Username,
        tobefollowed: _id,
      };

      const response = await fetch('http://localhost:3000/user/follow', {
        method: 'PUT',
        body: JSON.stringify(followData),
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to follow user');
      }
      setExist(true)
      console.log('User followed successfully');
      // You may want to update the UI or perform additional actions after successful follow

    } catch (error) {
      console.error('Error following user:', error.message);
    }
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
          BlogId:_id,
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
          // let tempobj={};
          // tempobj=data;
          Comments.push({UserId: datauser._id,
            Username: datauser.FullName,
            commentText:newComment})
            // console.log(tempobj)
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
      setUserData(data);
      for(let i=0;i<data.Following.length;i++){
        if(data.Following[i].UserId===_id){
          setExist(true);
        }
      }
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
        <Typography variant="h5">{Accounttitle}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          by {Username} (User ID: {UserId})
          {/* Gradient Follow Button */}
          {exist?
          <GradientFollowButton onClick={handleUnfollowUser} variant="contained" size="small" style={{ marginLeft: '8px',borderRadius:10,height:35 }}>
          Un Follow
        </GradientFollowButton>:
         <GradientFollowButton onClick={handleFollowUser} variant="contained" size="small" style={{ marginLeft: '8px',borderRadius:10,height:35 }}>
         Follow
       </GradientFollowButton>
        }
          <GradientFollowButton onClick={handleRateBlog} variant="contained" size="small" style={{ marginLeft: '8px',borderRadius:10,height:35 }}>
         Rate
       </GradientFollowButton>
       {/* <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box> */}
<Dialog open={openRatingDialog} onClose={handleCloseRatingDialog}>
          <DialogTitle>Rate this Blog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your rating (1-5):
              <TextField
                autoFocus
                margin="dense"
                id="rating"
                type="number"
                fullWidth
                inputProps={{ min: 1, max: 5 }}
                value={ratingInput}
                onChange={handleRatingInputChange}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRatingDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleRateNow} color="primary">
              Rate Now
            </Button>
          </DialogActions>
        </Dialog>

         
        </Typography>

        {/* Blog Categories */}
        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
          {Category.map((category, index) => (
            <Chip key={index} label={category} variant="outlined" style={{ marginRight: '8px', background: '#f0f0f0' }} />
          ))}
        </div>

        {/* Blog Keywords */}
        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
          {Keywords.map((keyword, index) => (
            <Chip key={index} label={keyword} variant="outlined" style={{ marginRight: '8px', background: '#f0f0f0' }} />
          ))}
        </div>

        {/* Blog Rating */}
        <Typography variant="body1" color="textSecondary">
          Rating: {Rating} ({NumberofRatings} ratings)
        </Typography>

        {/* Blog Content */}
        <Typography variant="body2" style={{ marginTop: '16px' }}>
          {Blogdata}
        </Typography>

        {/* Comments Section */}
        <div style={{ marginTop: '16px' }}>
          <Typography variant="h6">Comments</Typography>
          {Comments.map((comment, index) => (
            <div key={index} style={{ marginTop: '8px' }}>
              <Avatar>{comment.Username.charAt(0)}</Avatar>
              <Typography variant="body2" style={{ marginLeft: '8px', display: 'inline' }}>
                {comment.Username} says: {comment.commentText}
              </Typography>
            </div>
          ))}
        </div>

        {/* Additional Blog Details */}
        {Disabled && (
          <div style={{ marginTop: '16px', color: 'red' }}>
            <Typography variant="body2">This blog is disabled.</Typography>
            <Typography variant="body2">Reason: {Reason}</Typography>
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
  );
};

export default BlogDetails;
