import { Button } from '@mui/material';
import './LoanItem.css';
import { useNavigate } from 'react-router-dom';

interface LoanItemProps {
  loanId: number;
  bookId: number;
  bookImage: string;
  bookTitle: string;
  author: string;
  loanTime: string;
  dueDate: string;
  returnDate?: string;
}

function LoanItem({
  loanId,
  bookId,
  bookImage,
  bookTitle,
  author,
  loanTime,
  dueDate,
  returnDate,
}: LoanItemProps) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="conent-container">
        <img className="book-image" src={bookImage} alt={bookTitle} />
        <div className="book-container">
          <p className="title">{bookTitle}</p>
          <p className="author">{author}</p>
        </div>
        <div className="dates-container">
          <p className="date">Loan time: {loanTime}</p>
          <p className="date">Due date: {dueDate}</p>
          {returnDate && <p className="date">Return date: {returnDate}</p>}
        </div>
      </div>
      <div className="buttons-container">
        {!returnDate && <Button className="button">Extend Loan</Button>}
        {!returnDate && (
          <Button
            className="button"
            onClick={() => navigate(`/addBookReview/${bookId}`)}
          >
            Return Loan
          </Button>
        )}{' '}
      </div>
    </div>
  );
}

export default LoanItem;
