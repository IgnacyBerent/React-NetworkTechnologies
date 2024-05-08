import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import BookList from './books/book-list/BookList';
import HomePage from './home-page/HomePage';
import BookDetails from './books/book-details/BookDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const bookDetail = {
  id: 1,
  img: 'https://media.libris.to/jacket/18938641_thus-spoke-zarathustra.jpg',
  title: 'Thus Spoke Zarathustra',
  author: 'Frederick Nietzsche',
  isbn: '978-0-14-044118-5',
  publicationYear: 1883,
  publisher: 'Penguin Books',
  rating: 4.5,
  ratingCount: 101,
  genre: 'Philosophy',
  summary:
    "Thus Spoke Zarathustra is a philosophical novel by German philosopher Friedrich Nietzsche, composed in four parts written and published between 1883 and 1885. Much of the work deals with ideas such as the 'eternal recurrence of the same', the parable on the 'death of God', and the 'prophecy' of the Übermensch, which were first introduced.",
  availableCopies: 5,
};

// <div className="App">{<BookDetails bookDetails={bookDetail} />}</div>

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BookList />} />
        <Route
          path="/bookDetail/:bookId"
          element={<BookDetails bookDetails={bookDetail} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
