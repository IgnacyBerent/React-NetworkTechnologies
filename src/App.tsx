import LoginForm from './login-form/LoginForm';
import BookList from './books-page/book-list/BookList';
import HomePage from './home-page/HomePage';
import BookDetails from './books-page/book-details/BookDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ProfilePage from './profle-page/ProfilePage';
import HelpPage from './help-page/HelpPage';
import MyReviews from './my_reviews/MyReviews';
import MyLoans from './my-loans/my-loans-page/MyLoansPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/my_reviews" element={<MyReviews />} />
        <Route path="/my_loans" element={<MyLoans />} />
        <Route path="/bookDetail/:bookId" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
