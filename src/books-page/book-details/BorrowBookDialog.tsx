import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {
  dialogTitleStyle,
  dialogTextStyle,
  menuItemStyle,
} from '../../styles/textStyles';
import { dialogButtonStyle } from '../../styles/buttonStyles';

interface ReturnDateDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  handleDateChange: (value: number) => void;
}

const BorrowBookDialog: React.FC<ReturnDateDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
  handleDateChange,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={dialogTitleStyle}>Choose Return Date</DialogTitle>
      <DialogContent>
        <DialogContentText sx={dialogTextStyle}>
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
        <Button onClick={handleClose} sx={dialogButtonStyle}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} sx={dialogButtonStyle}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BorrowBookDialog;
