import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { Cancel } from '@mui/icons-material';

const GradientDetailsButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));

const UserDetailsDialog = ({ project, open, handleClose }) => {
    function formatDateTime(inputDateString) {
        const date = new Date(inputDateString);
        
        // Get the year, month, day, hours, minutes, and seconds
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
      
        // Construct the formatted date-time string
        const formattedDateTimeString = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
      
        return formattedDateTimeString;
      }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ fontWeight: 'bold' }}>Project Details</DialogTitle>
      <DialogContent>
                <Typography variant="body1">Project Title: {project.Title}</Typography>
                <Typography variant="body1">Status: {project.Status}</Typography>
                <Typography variant="body1">Budget: {project.Budget}</Typography>
                <Typography variant="body1">Deadline: {project.Deadline}</Typography>
                <Typography variant="body1">Description: {project.Description}</Typography>
                <Typography variant="body1">Requirements: {project.Requirements}</Typography>
                <Typography variant="body1">Keywords: {project.Keywords.join(', ')}</Typography>
                <Typography variant="body1">Uploaded on: {formatDateTime(project.createdAt)}</Typography>
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

export default UserDetailsDialog;
