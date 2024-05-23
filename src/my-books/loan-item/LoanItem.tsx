import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState, forwardRef, useEffect } from 'react';
import './LoanItem.css';
import { LoanDto } from '../../api/dto/loan.dto';
import AddReviewDialog from './AddReviewDialog';
import { useApi } from '../../api/ApiProvider';
import ExtendLoanDialog from './ExtendLoanDialog';

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
  const [extendLoanOpen, setExtendLoanOpen] = useState(false);
  const [extendDays, setExtendDays] = useState(7);
  const apiClient = useApi();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExtendLoanOpen = () => {
    setExtendLoanOpen(true);
  };

  const handleExtendLoanClose = () => {
    setExtendLoanOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem('loanExtended')) {
      alert('Loan extended successfully');
      localStorage.removeItem('loanExtended');
    }
  }, []);

  const handleExtendLoanConfirm = async () => {
    const response = await apiClient.extendLoan(loan.id, extendDays);
    if (response.success) {
      setExtendLoanOpen(false);
      localStorage.setItem('loanExtended', 'true');
      window.location.reload();
    } else {
      console.error('Failed to extend loan');
      setExtendLoanOpen(false);
      alert(`Failed to extend loan: ${response.statusCode}`);
    }
  };

  const handleDateChange = (value: number) => {
    setExtendDays(value);
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
        {!loan.returnDate && (
          <Button onClick={handleExtendLoanOpen} sx={buttonStyle}>
            Extend Loan
          </Button>
        )}{' '}
        {!loan.returnDate && (
          <Button onClick={handleOpen} sx={buttonStyle}>
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
        <ExtendLoanDialog
          open={extendLoanOpen}
          handleClose={handleExtendLoanClose}
          handleConfirm={handleExtendLoanConfirm}
          handleDateChange={handleDateChange}
        />
      </div>
    </div>
  );
});

LoanItem.displayName = 'LoanItem';

export default LoanItem;
