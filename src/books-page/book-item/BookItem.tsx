import { Rating } from '@mui/material';
import './BookItem.css';
import { useApi } from '../../api/ApiProvider';
import { useState, useEffect, forwardRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import DeleteBookConfirmationDialog from './DeleteBookConfirmationDialog';

interface BookItemProps {
  id: number;
  img: string;
  title: string;
  author: string;
  rating: number;
}

const BookItem = forwardRef<HTMLDivElement, BookItemProps>(
  ({ id, img, title, author, rating }, ref) => {
    const apiClient = useApi();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [userRole, setUserRole] = useState('');
    const navigator = useNavigate();

    useEffect(() => {
      const role = apiClient.getUserRole();
      setUserRole(role);
    }, [apiClient]);

    const handleDeleteConfirmation = async (event: React.MouseEvent) => {
      event.stopPropagation();
      await apiClient.deleteBook(id);
      window.location.reload();
    };

    const handleDelete = (event: React.MouseEvent) => {
      event.stopPropagation();
      setDialogOpen(true);
    };

    const handleItemClick = () => {
      navigator(`/bookDetail/${id}`);
    };

    const handleCloseDialog = (event: React.MouseEvent) => {
      event.stopPropagation();
      setDialogOpen(false);
    };

    return (
      <div
        className="book-item"
        ref={ref}
        onClick={handleItemClick}
        style={{
          transition: '0.3s',
          cursor: 'pointer',
        }}
      >
        {userRole === 'ROLE_ADMIN' && (
          <DeleteIcon
            sx={{ color: 'red', alignSelf: 'flex-end' }}
            className="delete-icon"
            onClick={handleDelete}
          />
        )}
        <img src={img} alt={title} />
        <h2 title={title}>{title}</h2>
        <h3>{author}</h3>
        <div className="rating-container">
          Rating:{' '}
          <Rating name="read-only" value={rating} precision={0.1} readOnly />{' '}
          {rating}/5
        </div>
        <DeleteBookConfirmationDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleDeleteConfirmation}
        />
      </div>
    );
  },
);

BookItem.displayName = 'BookItem';

export default BookItem;
