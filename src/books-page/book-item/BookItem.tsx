import { Rating } from '@mui/material';
import './BookItem.css';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

interface BookItemProps {
  id: number;
  img: string;
  title: string;
  author: string;
  rating: number;
}

const BookItem = forwardRef<HTMLDivElement, BookItemProps>(
  ({ id, img, title, author, rating }, ref) => {
    return (
      <Link to={`/bookDetail/${id}`} className="book-item-link">
        <div className="book-item" ref={ref}>
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
  },
);

BookItem.displayName = 'BookItem';

export default BookItem;
