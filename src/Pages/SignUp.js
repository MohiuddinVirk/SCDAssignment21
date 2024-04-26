import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Circle from '@mui/material/CircularProgress';
import BoxComponent from '../components/BoxComponent'
import Box from '@mui/material/Box';
import logoImage from '../assets/DigitalGroveLogo.png';
import GradientButton from '../components/PurpleGradientButton';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

 

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInterestToggle = (interest) => {
    const updatedInterests = [...interests];
    const interestIndex = updatedInterests.indexOf(interest);

    if (interestIndex === -1) {
      if (updatedInterests.length < 5) {
        updatedInterests.push(interest);
      }
    } else {
      updatedInterests.splice(interestIndex, 1);
    }

    setInterests(updatedInterests);
  };

  const handleHobbyToggle = (hobby) => {
    const updatedHobbies = [...hobbies];
    const hobbyIndex = updatedHobbies.indexOf(hobby);

    if (hobbyIndex === -1) {
      if (updatedHobbies.length < 5) {
        updatedHobbies.push(hobby);
      }
    } else {
      updatedHobbies.splice(hobbyIndex, 1);
    }

    setHobbies(updatedHobbies);
  };
  const handlesigninNow = () => {
    navigate('/signin'); // Navigate to the sign-up page
  };
  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (step === 1 && (!email || !/\S+@\S+\.\S+/.test(email))) {
      setEmailError('Enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (step === 1 && (!password || password.length < 6)) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };
  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3000/user/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            FullName: name,
            email: email,
            Password: password,
            role:"User",
            dob:dateOfBirth,
            blocked:false,
    reason:"",
    Hobbies:hobbies,
    Following:[],
    Interests:interests,


            // Add other fields as needed based on your schema
          }),
        });
  
        if (response.ok) {
          navigate('/signin');
          // Handle success, e.g., redirect to login page
        } else {
          const errorData = await response.json();
          console.error('Error registering user:', errorData);
          // Handle error, e.g., show error message to the user
        }
      } catch (error) {
        console.error('Unexpected error during registration:', error);
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
          SignUp
        </Typography>
      </div>

      {/* Progress Bar */}
      <Stack spacing={3} sx={{ width: '100%', marginBottom: 2 }}>
        <Box display="flex" alignItems="center">
          {step===1 &&(
            <Box sx={{ width: '50%', mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={0}
              sx={{ width: '100%', height: '8px', borderRadius: '4px', background: 'linear-gradient(to right, #000000, #3533CD)' }}
            />
          </Box>
          )}
            {step===2 &&(
            <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={0}
              sx={{ width: '100%', height: '8px', borderRadius: '4px', background: 'linear-gradient(to right, #000000, #3533CD)' }}
            />
          </Box>
          )}
        </Box>
      </Stack>

      {/* Conditional Rendering based on step */}
      {step === 1 && (
        <>
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
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ borderRadius: '20px' }}
          />
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              Interests (Select up to 5)
            </Typography>
            {['Travel', 'Reading', 'Coding', 'Music', 'Sports'].map((interest) => (
              <Chip
                key={interest}
                label={interest}
                onClick={() => handleInterestToggle(interest)}
                color={interests.includes(interest) ? 'primary' : 'default'}
                sx={{
                  marginRight: 1,
                  marginBottom: 1,
                  background: interests.includes(interest)
                    ? 'linear-gradient(to right, #000000, #3533CD)'
                    : 'default',
                  color: interests.includes(interest) ? 'white' : 'inherit',
                }}
              />
            ))}
          </div>
          <div>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              Hobbies (Select up to 5)
            </Typography>
            {['Cooking', 'Gardening', 'Photography', 'Painting', 'Fitness'].map((hobby) => (
              <Chip
                key={hobby}
                label={hobby}
                onClick={() => handleHobbyToggle(hobby)}
                color={hobbies.includes(hobby) ? 'primary' : 'default'}
                sx={{
                  marginRight: 1,
                  marginBottom: 1,
                  background: hobbies.includes(hobby)
                    ? 'linear-gradient(to right, #000000, #3533CD)'
                    : 'default',
                  color: hobbies.includes(hobby) ? 'white' : 'inherit',
                }}
              />
            ))}
          </div>
          <TextField
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ borderRadius: '20px' }}
          />
        </>
      )}

      {/* Continue button for step 1 */}
      {step === 1 && (
        <GradientButton text="Continue" fullWidth onClick={handleContinue} />
      )}

      {/* Signup button for step 2 */}
      {step === 2 && (
        <GradientButton icon={<LockIcon />} text="Sign Up" fullWidth onClick={handleSignup} />
      )}

      {/* Typography line for login */}
      <Typography variant="body2" color="textSecondary" mt={2} sx={{ color: '#3533C', cursor: 'pointer' }} onClick={handlesigninNow}>
      Already have an account? Sign in now.
        </Typography>
    </div>
    </BoxComponent>
  );
};

export default SignupPage;
