import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const menuItemStyle = {
  fontSize: '1.2rem',
  fontWeight: '600',
  fontFamily: 'Karla',
};

const buttonStyle = {
  color: 'black',
  fontWeight: '700',
  fontFamily: 'Karla',
  fontSize: '1.2rem',
  '&:hover': {
    backgroundColor: '#333',
  },
};

interface ReturnDateDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  handleDateChange: (value: number) => void;
}

const ReturnDateDialog: React.FC<ReturnDateDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
  handleDateChange,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          fontSize: '1.8rem',
          fontWeight: '900',
          fontFamily: 'Lato',
          marginBottom: '0rem',
          paddingBottom: '0rem',
        }}
      >
        Choose Return Date
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: '1.2rem',
            fontWeight: '700',
            fontFamily: 'Karla',
            marginTop: '0rem',
            marginBottom: '1rem',
          }}
        >
          Please select the return date for the book.
        </DialogContentText>
        <Select
          defaultValue={14}
          onChange={(event) => {
            handleDateChange(event.target.value as number);
          }}
          sx={menuItemStyle}
        >
          <MenuItem value={14} sx={menuItemStyle}>
            2 weeks
          </MenuItem>
          <MenuItem value={21} sx={menuItemStyle}>
            3 weeks
          </MenuItem>
          <MenuItem value={30} sx={menuItemStyle}>
            1 month
          </MenuItem>
          <MenuItem value={60} sx={menuItemStyle}>
            2 months
          </MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={buttonStyle}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} sx={buttonStyle}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnDateDialog;
