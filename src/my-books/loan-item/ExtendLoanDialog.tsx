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

interface ExtendLoanDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  handleDateChange: (value: number) => void;
}

const ExtendLoanDialog: React.FC<ExtendLoanDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
  handleDateChange,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={dialogTitleStyle}>Extend Loan</DialogTitle>
      <DialogContent>
        <DialogContentText sx={dialogTextStyle}>
          How long would you like to extend the loan?
        </DialogContentText>
        <Select
          defaultValue={7}
          onChange={(event) => {
            handleDateChange(event.target.value as number);
          }}
          sx={menuItemStyle}
        >
          <MenuItem value={7} sx={menuItemStyle}>
            1 week
          </MenuItem>
          <MenuItem value={14} sx={menuItemStyle}>
            2 weeks
          </MenuItem>
          <MenuItem value={21} sx={menuItemStyle}>
            3 weeks
          </MenuItem>
          <MenuItem value={30} sx={menuItemStyle}>
            1 month
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

export default ExtendLoanDialog;
