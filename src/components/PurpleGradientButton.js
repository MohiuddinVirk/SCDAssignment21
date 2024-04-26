// // GradientButton.js
// import React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/system';

// const GradientButton = styled(Button)(({ theme, fullWidth }) => ({
//   background: `linear-gradient(45deg, #000000 30%, #3533CD 90%)`,
//   color: theme.palette.getContrastText('#000000'), // Adjusted the text color based on the first gradient color
//   boxShadow: `0 3px 5px 2px rgba(255, 105, 135, .3)`,
//   transition: 'box-shadow 0.3s',
//   width: fullWidth ? '100%' : 'auto', // Set width to 100% if fullWidth is true
//   height: '45px', // Set the desired height
//   borderRadius:10,
//   '&:hover': {
//     boxShadow: `0 6px 10px 5px rgba(255, 105, 135, .3)`,
//   },
// }));

// export default GradientButton;
// GradientButton.js
import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const GradientButton = styled(Button)(({ theme, fullWidth }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(45deg, #000000 30%, #3533CD 90%)`,
  color: theme.palette.getContrastText('#000000'), // Adjusted the text color based on the first gradient color
  boxShadow: `0 3px 5px 2px rgba(255, 105, 135, .3)`,
  transition: 'box-shadow 0.3s',
  width: fullWidth ? '100%' : 'auto', // Set width to 100% if fullWidth is true
  height: '45px', // Set the desired height
  borderRadius: 10,
  padding: '0 16px', // Add padding to create space between icon and text
  '&:hover': {
    boxShadow: `0 6px 10px 5px rgba(255, 105, 135, .3)`,
  },
}));

const GradientButtonWithIcon = ({ icon, text, ...props }) => {
  return (
    <GradientButton {...props}>
      {icon && (
        <span style={{ marginRight: '8px' }}>{icon}</span> // Adjust margin as needed
      )}
      {text}
    </GradientButton>
  );
};

export default GradientButtonWithIcon;
