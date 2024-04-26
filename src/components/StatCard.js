import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ArrowBackIos } from '@mui/icons-material';
import { styled } from '@mui/system';

const GradientIconButton = styled(IconButton)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  borderRadius: '10px',
  marginRight: '16px', // Adjust the margin as needed
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));

const BoxComponent = ({ title, subtitle, icon, size,month }) => {
    const getSizeStyle = () => {
        switch (size) {
          case 'small':
            return { width: '250px', minHeight: '70px' };
          case 'medium':
            return { width: '300px', minHeight: '300px' };
          case 'large':
            return { width: '400px', minHeight: '400px' };
          case 'xlarge':
            return { width: '500px', minHeight: '500px' };
          case 'xxlarge':
            return { width: '600px', minHeight: '600px' };
          case 'xxxlarge':
              return { width: '700px', minHeight: '700px' };
          default:
            return { width: '300px', minHeight: '300px' }; // Default to medium size
        }
  };

  return (
    <Box display="flex">
      <Paper
        elevation={3}
        style={{
        //   padding: '20px',
          backgroundColor: 'white',
          ...getSizeStyle(),
          borderRadius: '12px',
          margin: 5,
          display:'flex',
        }}
      >
        {/* <GradientIconButton style={{
          height:'25px',
          width:'25px',
          borderRadius:"50%",
          alignItems:'center',
          paddingLeft:'15px',
          marginTop:'45px',
          marginLeft:'2px'
        }} aria-label="icon">
            <ArrowBackIos style={{height:'18px'}}/>
          </GradientIconButton> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft:'16px'
          }}
        >
          {/* Updated Icon button with gradient background and white icon */}
          <GradientIconButton aria-label="icon">
            {icon}
          </GradientIconButton>
          <CardContent style={{marginLeft:'-25px'}}>
            {/* Typography on the right side */}
            <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'bold' }}>
  {subtitle}
</Typography>
<Typography variant="h5" color="dark" style={{ fontWeight: 'bold' }}>
  {title}
</Typography>
{/* <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'bold' }}>
  {month}
</Typography> */}
          </CardContent>
        </Box>
        {/* <GradientIconButton style={{
          height:'25px',
          width:'25px',
          borderRadius:"50%",
          alignItems:'center',
          paddingLeft:'15px',
          transform: 'rotateY(180deg)',
          marginLeft:'0px',
          marginTop:'45px',
        }} aria-label="icon">
            <ArrowBackIos style={{height:'18px'}}/>
          </GradientIconButton> */}
      
      </Paper>
    </Box>
  );
};

export default BoxComponent;
