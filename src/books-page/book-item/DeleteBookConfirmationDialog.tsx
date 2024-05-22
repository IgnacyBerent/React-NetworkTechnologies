import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import { MouseEvent, FC } from 'react';
import { dialogTextStyle, dialogTitleStyle } from '../../styles/textStyles';
import { dialogButtonStyle } from '../../styles/buttonStyles';

interface DeleteBookConfirmationDialogProps {
  open: boolean;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
  onConfirm: (event: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteBookConfirmationDialog: FC<DeleteBookConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={dialogTitleStyle}>{'Delete Book'}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={dialogTextStyle}>
          Are you sure you want to delete this book?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={dialogButtonStyle} onClick={onClose}>
          Cancel
        </Button>
        <Button sx={dialogButtonStyle} onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBookConfirmationDialog;
