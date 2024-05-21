import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState, forwardRef } from 'react';
import './LoanItem.css';
import { LoanDto } from '../../api/dto/loan.dto';
import AddReviewDialog from './AddReviewDialog';
import { useApi } from '../../api/ApiProvider';

interface LoanItemProps {
  loan: LoanDto;
}

const buttonStyle = {
  width: '110px',
  height: '30px',
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '10px',
  fontFamily: 'Karla',
  fontWeight: '900',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#333',
  },
};

const LoanItem = forwardRef<HTMLDivElement, LoanItemProps>(({ loan }, ref) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container" ref={ref}>
      <div className="conent-container">
        <img className="book-image" src={loan.book.img} alt={loan.book.title} />
        <div className="book-container">
          <p className="title">{loan.book.title}</p>
          <p className="author">{loan.book.author}</p>
        </div>
        <div className="dates-container">
          <p className="date">Loan time: {loan.dateOfLoan}</p>
          <p className="date">Due date: {loan.dueDate}</p>
          {loan.returnDate && (
            <p className="date">Return date: {loan.returnDate}</p>
          )}
        </div>
      </div>
      <div className="buttons-container">
        {!loan.returnDate && <Button sx={buttonStyle}>Extend Loan</Button>}
        {!loan.returnDate && (
          <Button
            onClick={handleOpen} // open the dialog when the button is clicked
            sx={buttonStyle}
          >
            Return Book
          </Button>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Return Book</DialogTitle>
          <DialogContent>
            <AddReviewDialog
              onClose={handleClose}
              open={open}
              loanId={loan.id}
              bookId={loan.book.id}
              userId={loan.user.id}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
});

LoanItem.displayName = 'LoanItem';

export default LoanItem;
