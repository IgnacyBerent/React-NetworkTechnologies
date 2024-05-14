import { Box } from '@mui/material';
import MenuAppBar from '../../app-bar/MenuAppBar';
import BookItem from '../book-item/BookItem';
import './BookList.css';

import { Outlet } from 'react-router-dom';

const books = [
  {
    id: 1,
    img: 'https://media.libris.to/jacket/18938641_thus-spoke-zarathustra.jpg',
    title: 'Thus Spoke Zarathustra',
    author: 'Frederick Nietzsche',
    rating: 4.5,
  },
  {
    id: 2,
    img: 'https://www.jkrowling.com/wp-content/uploads/2016/10/HPATPS_Hero_OnGrey.png',
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    rating: 4.0,
  },
  {
    id: 3,
    img: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SY425_.jpg',
    title: 'Atomic Habbits',
    author: 'James Clear',
    rating: 4.8,
  },
  {
    id: 4,
    img: 'https://ecsmedia.pl/cdn-cgi/image/format=webp,width=544,height=544,/c/48-laws-of-power-b-iext147730049.jpg',
    title: '48 Laws of Power',
    author: 'Robert Greene',
    rating: 4.2,
  },
  {
    id: 5,
    img: 'https://ecsmedia.pl/cdn-cgi/image/format=webp,width=544,height=544,/c/money-master-the-game-b-iext146391756.jpg',
    title: 'Money Master the Game',
    author: 'Tony Robbins',
    rating: 3.5,
  },
];

function BookList() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box>
        <div className="book-list">
          {books.map((book, index) => (
            <BookItem
              key={index}
              id={book.id}
              img={book.img}
              title={book.title}
              author={book.author}
              rating={book.rating}
            />
          ))}
        </div>
      </Box>
      <Outlet />
    </Box>
  );
}

export default BookList;
