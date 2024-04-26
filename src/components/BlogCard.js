// BlogCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import logoimage from '../assets/DigitalGroveLogo.png'
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Styled component for the top bar
const TopBar = styled('div')({
  width: '100%',
  height: '8px',
  backgroundColor: 'linear-gradient(to right, #000000, #3533CD)',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

// Styled component for the rounded corners
const RoundedImage = styled(CardMedia)({
  borderRadius: '8px',
});

const BlogCard = ( props) => {
  const [element,setElement]=useState(props.element)
  const navigate=useNavigate()
  const handleShowDetails=async()=>{
    
    navigate("/details",{ state: { element: element } });
    // navigate("/details",{ title, image, buttonText, onClick, likes, ratings, owner, categories, keywords, onLike, onShare })
  }
  return (
    <Card sx={{ padding: '16px', display: 'flex', flexDirection: 'column', maxWidth: 350, margin: 1 }}>
      <TopBar />
      <RoundedImage
        component="img"
        height="140"
        image={logoimage}
        alt={element.Accounttitle}
        style={{ objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
      />
      <CardContent style={{ flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
            <Typography variant="h5">
              {element.Accounttitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginLeft: '8px' }}>
              Ratings:{element.Rating} 
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
            {element.Username}
          </Typography>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '8px', flexWrap: 'wrap' }}>
          {element.Category.map((category, index) => (
            <Chip
              key={index}
              label={category}
              sx={{
                marginRight: '8px',
                marginBottom: '8px',
                '&:hover': {
                  background: 'linear-gradient(to right, #000000, #3533CD)',
                  color: 'white',
                },
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '8px', flexWrap: 'wrap' }}>
          {element.Keywords.map((category, index) => (
            <Chip
              key={index}
              label={category}
              sx={{
                marginRight: '8px',
                marginBottom: '8px',
                '&:hover': {
                  background: 'linear-gradient(to right, #000000, #3533CD)',
                  color: 'white',
                },
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <Button variant="contained" onClick={handleShowDetails} sx={{ background: 'linear-gradient(to right, #000000, #3533CD)', height: '40px', borderRadius: 5, marginRight: 5 }} >
            {"Read More"}
          </Button>
          <IconButton  sx={{ background: 'linear-gradient(to right, #000000, #3533CD)', color: 'white' }}>
            <ShareIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
