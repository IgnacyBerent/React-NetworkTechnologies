import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import { dialogTextStyle, dialogTitleStyle } from '../../styles/textStyles';
import { dialogButtonStyle } from '../../styles/buttonStyles';
import React, { MouseEvent } from 'react';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
  onConfirm: (event: MouseEvent<HTMLButtonElement>) => void;
}

const UserDeleteConfirmDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={dialogTitleStyle}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={dialogTextStyle}>{message}</DialogContentText>
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

export default UserDeleteConfirmDialog;
