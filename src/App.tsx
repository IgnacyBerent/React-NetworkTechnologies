import LoginForm from './login-form/LoginForm';
import BookList from './books-page/book-list/BookList';
import HomePage from './home-page/HomePage';
import BookDetails from './books-page/book-details/BookDetails';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from './profle-page/ProfilePage';
import HelpPage from './help-page/HelpPage';
import MyReviews from './my_reviews/MyReviews';
import MyLoans from './my-books/my-loans-page/MyLoansPage';
import AddBookReviewPage from './my-books/add-book-review-page/AddBookReviewPage';
import ApiProvider from './api/ApiProvider';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/my_reviews" element={<MyReviews />} />
          <Route path="/my_books" element={<MyLoans />} />
          <Route path="/bookDetail/:bookId" element={<BookDetails />} />
          <Route
            path="/addBookReview/:bookId"
            element={<AddBookReviewPage />}
          />
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
