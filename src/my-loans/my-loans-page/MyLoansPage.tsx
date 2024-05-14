import './MyLoansPage.css';

import { Box } from '@mui/material';
import MenuAppBar from '../../app-bar/MenuAppBar';
import { Outlet } from 'react-router-dom';
import LoanItem from '../loan-item/LoanItem';

const loans = [
  {
    loanId: 1,
    bookId: 1,
    bookImage:
      'https://media.libris.to/jacket/18938641_thus-spoke-zarathustra.jpg',
    bookTitle: 'Thus Spoke Zarathustra',
    author: 'Frederick Nietzsche',
    loanTime: '14-03-2024',
    dueDate: '31-03-2024',
    returnDate: undefined,
  },
  {
    loanId: 2,
    bookId: 2,
    bookImage:
      'https://www.jkrowling.com/wp-content/uploads/2016/10/HPATPS_Hero_OnGrey.png',
    bookTitle: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    loanTime: '21-04-2024',
    dueDate: '31-05-2024',
    returnDate: '30-05-2024',
  },
  {
    loanId: 3,
    bookId: 3,
    bookImage: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SY425_.jpg',
    bookTitle: 'Atomic Habbits',
    author: 'James Clear',
    loanTime: '30-04-2024',
    dueDate: '31-05-2024',
    returnDate: undefined,
  },
];

function MyLoans() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box>
        <div className="loans-list">
          {loans.map((loan, index) => (
            <LoanItem
              key={index}
              loanId={loan.loanId}
              bookId={loan.bookId}
              bookImage={loan.bookImage}
              bookTitle={loan.bookTitle}
              author={loan.author}
              loanTime={loan.loanTime}
              dueDate={loan.dueDate}
              returnDate={loan.returnDate}
            />
          ))}
        </div>
      </Box>
      <Outlet />
    </Box>
  );
}

export default MyLoans;
