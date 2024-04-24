import BookItem from './book-item/BookItem';
import './BookList.css';

const books = [
  {
    img: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SY425_.jpg',
    title: 'Thus Spoke Zarathustra',
    author: 'Frederick Nietzsche',
    rating: 4.5,
  },
  {
    img: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SY425_.jpg',
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    rating: 4.0,
  },
  {
    img: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SY425_.jpg',
    title: 'Atomic Habbits',
    author: 'James Clear',
    rating: 2.6,
  },
  {
    img: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SY425_.jpg',
    title: 'Atomic Habbits',
    author: 'James Clear',
    rating: 2.6,
  },
  {
    img: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SY425_.jpg',
    title: 'Atomic Habbits',
    author: 'James Clear',
    rating: 2.6,
  },
];

function BookList() {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookItem
          key={index}
          img={book.img}
          title={book.title}
          author={book.author}
          rating={book.rating}
        />
      ))}
    </div>
  );
}

export default BookList;
