import React,{useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Projectpurchases from './CustomerProjects'
import { Cancel, Visibility } from '@mui/icons-material';

const GradientDetailsButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));


const UserDetailsDialog = ({ user, open, handleClose, approvedprojects,deliveredprojects,tobeapprovedprojects,purchases }) => {

  const [projectpurchases,setProjectpurchases]=useState(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

const handleDetailsDialogClose = () => {
  setProjectpurchases(null);
  setDetailsDialogOpen(false);
};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ fontWeight: 'bold' }}>Customer Details</DialogTitle>
      <DialogContent>
       
      <Typography variant="body1">Full Name: {user.FullName}</Typography>
        <Typography variant="body1">Email: {user.Email}</Typography>
        <Typography variant="body1">AccountBalance: {user.AccountBalance}</Typography>
        <Typography variant="body1">FreezeBalance: {user.FreezeBalance}</Typography>
        <Typography variant="body1">Interests: {user.Interests.join(', ')}</Typography>

        {/* {projectpurchases? */}
        <Projectpurchases
              open={detailsDialogOpen}
              handleClose={handleDetailsDialogClose}
              tobeapprovedprojects={tobeapprovedprojects}
              deliveredprojects={deliveredprojects}
              approvedprojects={approvedprojects}
              purchases={purchases}
        />
        {/* :<></>} */}
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
