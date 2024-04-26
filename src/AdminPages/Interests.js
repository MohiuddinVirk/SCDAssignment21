import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Add, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import logoImage from '../assets/DigitalGroveLogo.png';
import SideBar from '../components/AdminSideBar';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GradientAddButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
  borderRadius: 10,
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', // Shadow effect
}));

const GradientDeleteButton = styled(IconButton)(({ theme }) => ({
  background: 'linear-gradient(to right, #FF6464, #D34C4C)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #FF6464, #D34C4C)',
  },
  borderRadius: 10,
  marginRight: '8px', // Added margin for spacing
}));

const RoundedImage = styled('img')(({ theme }) => ({
  width: '100px',
  marginBottom: '16px',
  borderRadius: '50%',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', // Shadow effect
}));

const InterestsTab = () => {
  const [value, setValue] = useState(0);
  const [newInterest, setNewInterest] = useState('');
  const [interests, setInterests] = useState(['Reading', 'Photography', 'Travel']);

  const handleAddInterest = () => {
    setInterests((prevInterests) => [...prevInterests, newInterest]);
    setNewInterest('');
  };

  const handleDeleteInterest = (index) => {
    const updatedInterests = [...interests];
    updatedInterests.splice(index, 1);
    setInterests(updatedInterests);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Conditionally set marginLeft and marginRight based on screen size
  const marginLeft = isMobile ? 10 : 300;
  const marginRight = isMobile ? 10 : 50;

  return (
    <>
      <div>
        <SideBar active={"/admininterests"} />
      </div>

      <div style={{ marginTop: 30, marginLeft, marginRight }}>
        <Box>
          <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} indicatorColor="primary">
            <Tab label="Add Interests" icon={<Add />} />
            <Tab label="Add Hobby" icon={<Add />} />
          </Tabs>
          <Box p={2}>
            {value === 0 && (
                <>
                
               
              <Box>
                <RoundedImage src={logoImage} alt="Logo" />
                <Typography variant="h6" gutterBottom>
                  Add Interest
                </Typography>
                <TextField
                  label="Interest"
                  variant="outlined"
                  fullWidth
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  style={{ marginBottom: '16px' }}
                />
                <GradientAddButton
                  variant="contained"
                  size="small"
                  startIcon={<Add />}
                  onClick={handleAddInterest}
                >
                  Add Interest
                </GradientAddButton>
              </Box>
              <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Interest</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {interests.map((interest, index) => (
                      <TableRow key={index}>
                        <TableCell>{interest}</TableCell>
                        <TableCell>
                          <GradientDeleteButton
                            onClick={() => handleDeleteInterest(index)}
                            size="small"
                          >
                            <Delete />
                            Delete
                          </GradientDeleteButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </>
            )}
            {value === 1 && (
                <>
                     <Box>
                     <RoundedImage src={logoImage} alt="Logo" />
                     <Typography variant="h6" gutterBottom>
                       Add Hobby
                     </Typography>
                     <TextField
                       label="Interest"
                       variant="outlined"
                       fullWidth
                       value={newInterest}
                       onChange={(e) => setNewInterest(e.target.value)}
                       style={{ marginBottom: '16px' }}
                     />
                     <GradientAddButton
                       variant="contained"
                       size="small"
                       startIcon={<Add />}
                       onClick={handleAddInterest}
                     >
                       Add Hobby
                     </GradientAddButton>
                   </Box>
              <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Interest</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {interests.map((interest, index) => (
                      <TableRow key={index}>
                        <TableCell>{interest}</TableCell>
                        <TableCell>
                          <GradientDeleteButton
                            onClick={() => handleDeleteInterest(index)}
                            size="small"
                          >
                            <Delete />
                            Delete
                          </GradientDeleteButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </>
            )}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default InterestsTab;
