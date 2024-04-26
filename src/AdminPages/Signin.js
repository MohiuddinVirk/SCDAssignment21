import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logoImage from '../assets/DigitalGroveLogo.png';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import GradientButton from '../components/PurpleGradientButton';
import BoxComponent from '../components/BoxComponent';
import { useTheme } from '@mui/material/styles';
import { linkurl } from '../link';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(!isMobile);

  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  // const handleSignIn = () => {
  //   if (validateForm()) {
  //     // Perform sign-in logic here


  //     navigate("/explore")
  //     console.log('Signing in...');
  //   }
  // };
  const handleSignIn = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(`${ linkurl }/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Email:email, Password: password }),
        });
  
        if (response.ok) {
        //   const data = await response.json();
        const data = await response.json();
          
        localStorage.setItem('token', data.token);
      
            navigate("/")
        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData.Message);
          // Handle the error, e.g., show an error message to the user
        }
      } catch (error) {
        console.error('Unexpected error during login:', error.message);
        // Handle unexpected errors
      }
    }
  };


  return (
    <BoxComponent size="large">
      <div style={{ textAlign: 'center' }}>
        {/* Display the avatar with the logo */}
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
            SignIn
          </Typography>
        </div>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ borderRadius: '20px' }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ borderRadius: '20px' }}
        />
        <GradientButton icon={<LockIcon />} text="Sign In" fullWidth onClick={handleSignIn} />

        
      </div>
    </BoxComponent>
  );
};

export default SignInPage;
