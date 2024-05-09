import './BookDetails.css';
import Review from './review/Review';
import { Outlet } from 'react-router-dom';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from '@mui/material';
import { Rating } from '@mui/material';
import MenuAppBar from '../../app-bar/MenuAppBar';

const reviews = [
  {
    username: 'John',
    rating: 5,
    comment: 'Great book!',
    date: '2022-01-01',
  },
  {
    username: 'Jane',
    rating: 4,
    comment: 'I loved it!',
    date: '2022-01-02',
  },
  {
    username: 'Jack',
    rating: 3,
    comment: 'It was ok.',
    date: '2022-01-03',
  },
];

const bookDetails = {
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
} as BookDetailsProps['bookDetails'];

interface BookDetailsProps {
  bookDetails: {
    id: number;
    img: string;
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    publisher: string;
    rating: number;
    ratingCount: number;
    genre: string;
    summary: string;
    availableCopies: number;
  };
}

function BookDetails() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box>
        <Grid container className="book-details-container">
          <Grid item xs={4} className="book-cover-container">
            <div className="book-cover-wrapper">
              <CardMedia
                component="img"
                image={bookDetails.img}
                className="book-cover"
              />
            </div>
          </Grid>
          <Grid item xs={8} className="book-details-card">
            <Card>
              <CardContent className="book-details-content">
                <Typography variant="h5" className="book-title">
                  {bookDetails.title}
                </Typography>
                <div className="rating-container">
                  Rating:{' '}
                  <Rating
                    name="read-only"
                    value={bookDetails.rating}
                    precision={0.1}
                    readOnly
                  />{' '}
                  {bookDetails.rating}/5 ({bookDetails.ratingCount})
                </div>
                <hr />
                <Typography variant="body2" className="book-summary">
                  {bookDetails.summary}
                </Typography>
                <hr />
                <Typography
                  variant="h6"
                  gutterBottom
                  className="book-details-text"
                >
                  BOOK DETAILS
                </Typography>

                <Grid container className="book-details-list" spacing={1}>
                  <Grid item xs={6} className="grid-item">
                    <Typography>Author:</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-val">
                    <Typography>{bookDetails.author}</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-item">
                    <Typography>Publication Year:</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-val">
                    <Typography>{bookDetails.publicationYear}</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-item">
                    <Typography>Genre:</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-val">
                    <Typography>{bookDetails.genre}</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-item">
                    <Typography>Publisher:</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-val">
                    <Typography>{bookDetails.publisher}</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-item">
                    <Typography>ISBN:</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-val">
                    <Typography>{bookDetails.isbn}</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-item">
                    <Typography>Available Copies:</Typography>
                  </Grid>
                  <Grid item xs={6} className="grid-val">
                    <Typography>{bookDetails.availableCopies}</Typography>
                  </Grid>
                </Grid>
                <Button
                  className="wide-button"
                  variant="contained"
                  color="primary"
                >
                  BORROW BOOK
                </Button>
              </CardContent>
            </Card>
          </Grid>
          {reviews.map((review, index) => (
            <Grid item xs={12} key={index}>
              <Review review={review} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Outlet />
    </Box>
  );
}

export default BookDetails;
