import { useState } from 'react';
import { UserDto } from '../../api/dto/user.dto';
import UserDeleteConfirmDialog from './UserDeleteConfirmDialog';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { mainButtonStyle } from '../../styles/buttonStyles';

function UserItem({
  user,
  deleteUser,
}: {
  user: UserDto;
  deleteUser: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);

  function handleDelete() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleConfirm() {
    deleteUser(user.id);
    setOpen(false);
  }

  return (
    <Card
      variant="outlined"
      sx={{
        marginX: '25%',
        marginTop: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {user.firstName} {user.lastName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={mainButtonStyle}
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardActions>
      <UserDeleteConfirmDialog
        open={open}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Card>
  );
}

export default UserItem;
