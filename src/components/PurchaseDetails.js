import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import DialogActions from '@mui/material/DialogActions';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import ListItemText from '@mui/material/ListItemText';
import { Cancel } from '@mui/icons-material';
const GradientDetailsButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(to right, #000000, #3533CD)',
    color: '#ffffff',
    '&:hover': {
      background: 'linear-gradient(to right, #000000, #3533CD)',
    },
  }));
  
  
const ProjectDetailsDialog = ({ project, open, handleClose }) => {
  if (!project) {
    return null;
  }

  const {
    Title,
    sellerName,
    Description,
    Technologies,
    Price,
    Feedbacks,
    AvgRating,
    Buyer,
    Revenue,
    Sales,
    TotalNumberofFeddbacks,
    TotalRating,
  } = project;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{Title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="h6">General Information:</Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Seller Name: ${sellerName}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Description: ${Description}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Technologies: ${Technologies.join(', ')}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Price: $${Price}`} />
            </ListItem>
          </List>
        </DialogContentText>

        <DialogContentText>
          <Typography variant="h6">Feedbacks:</Typography>
          <List>
            {Feedbacks.map((feedback, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Reviewer: ${feedback.reviewerName}, Rating: ${feedback.Rating}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Average Rating: {AvgRating}</Typography>
        </DialogContentText>

        <DialogContentText>
          <Typography variant="h6">Buyers:</Typography>
          <List>
            {Buyer.map((buyer, index) => (
              <ListItem key={index}>
                <ListItemText primary={`Buyer: ${buyer.buyerName}`} />
              </ListItem>
            ))}
          </List>
        </DialogContentText>

        <DialogContentText>
          <Typography variant="h6">Sales and Revenue:</Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Total Sales: ${Sales}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Total Revenue: $${Revenue}`} />
            </ListItem>
          </List>
        </DialogContentText>

        <DialogContentText>
          <Typography variant="h6">Overall Ratings:</Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Total Number of Feedbacks: ${TotalNumberofFeddbacks}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Total Rating: ${TotalRating}`} />
            </ListItem>
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <GradientDetailsButton
          variant="contained"
          size="small"
          onClick={handleClose}
          startIcon={<Cancel />}
          style={{ borderRadius: 10 }}
        >
          Close
        </GradientDetailsButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
