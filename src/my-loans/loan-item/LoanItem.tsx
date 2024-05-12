import { Button } from '@mui/material';
import './LoanItem.css';

type LoanItemProps = {
  loanId: number;
  bookImage: string;
  bookTitle: string;
  author: string;
  loanTime: string;
  dueDate: string;
  returnDate?: string;
};

const LoanItem: React.FC<LoanItemProps> = ({
  loanId,
  bookImage,
  bookTitle,
  author,
  loanTime,
  dueDate,
  returnDate,
}) => (
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
      <Button className="button">Extend Loan</Button>
      <Button className="button">Return Loan</Button>
    </div>
  </div>
);

export default LoanItem;
