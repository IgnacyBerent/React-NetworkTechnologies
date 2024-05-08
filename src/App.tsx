import React from 'react';
import './App.css';
import LoginForm from './login-register-forms/login-form/LoginForm';
import BookList from './books/book-list/BookList';
import HomePage from './home-page/HomePage';
import BookDetails from './books/book-details/BookDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import RegisterForm from './login-register-forms/register-form/RegisterForm';

// <div className="App">{<BookDetails bookDetails={bookDetail} />}</div>

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/bookDetail/:bookId" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
