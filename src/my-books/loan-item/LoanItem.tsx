import { Button } from '@mui/material';
import './LoanItem.css';
import { useNavigate } from 'react-router-dom';
import { LoanDto } from '../../api/dto/loan.dto';
import { forwardRef } from 'react';

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
  const navigate = useNavigate();

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
            onClick={() => navigate(`/addBookReview/${loan.book.id}`)}
            sx={buttonStyle}
          >
            Return Loan
          </Button>
        )}{' '}
      </div>
    </div>
  );
});

LoanItem.displayName = 'LoanItem';

export default LoanItem;
