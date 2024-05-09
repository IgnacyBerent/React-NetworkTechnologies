import { Rating } from '@mui/material';
import './BookItem.css';
import { Link } from 'react-router-dom';

interface BookItemProps {
  id: number;
  img: string;
  title: string;
  author: string;
  rating: number;
}

function BookItem({ id, img, title, author, rating }: BookItemProps) {
  return (
    <Link to={`/bookDetail/${id}`} className="book-item-link">
      <div className="book-item">
        <img src={img} alt={title} />
        <h2 title={title}>{title}</h2>
        <h3>{author}</h3>
        <div className="rating-container">
          Rating:{' '}
          <Rating name="read-only" value={rating} precision={0.1} readOnly />{' '}
          {rating}/5
        </div>
      </div>
    </Link>
  );
}

export default BookItem;
