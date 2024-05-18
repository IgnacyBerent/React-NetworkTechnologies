import './BookDetails.css';
import Review from './review/Review';
import { Outlet, useParams } from 'react-router-dom';

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
import { useCallback, useEffect, useRef, useState } from 'react';
import { useApi } from '../../api/ApiProvider';
import { GetBookDetailsDto } from '../../api/dto/book-details.dto';
import { ClientResponse } from '../../api/library-client';
import { ReviewsPageDto } from '../../api/dto/review.dto';

function BookDetails() {
  const apiClient = useApi();

  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState<GetBookDetailsDto | null>(
    null,
  );
  const [reviews, setReviews] = useState<ReviewsPageDto | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastReviewElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && reviews?.hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [reviews],
  );

  useEffect(() => {
    apiClient
      .getBookDetails(Number(bookId))
      .then((response: ClientResponse<GetBookDetailsDto | null>) => {
        if (response.success) {
          setBookDetails(response.data);
        } else {
          console.error('Error during fetching book details');
        }
        setLoading(false);
      });
  }, [apiClient, bookId]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response: ClientResponse<ReviewsPageDto | null> =
        await apiClient.getReviews(Number(bookId), page);
      if (response.success) {
        setReviews((prevReviews) => {
          const newReviews =
            page > 0
              ? [...(prevReviews?.reviews || []), ...response.data!.reviews]
              : response.data!.reviews;
          return {
            ...response.data,
            reviews: newReviews,
            currentPage: response.data!.currentPage || 0,
            totalPages: response.data!.totalPages || 0,
            totalItems: response.data!.totalItems || 0,
            hasMore: response.data!.hasMore || false,
          };
        });
      } else {
        console.error('Error during fetching reviews');
      }
    };

    fetchReviews();
  }, [apiClient, bookId, page]);

  if (loading || !bookDetails) {
    return <div>Loading...</div>;
  }

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
                  {bookDetails.rating}/5 &nbsp;
                  <a href="#commentSection" className="review-link">
                    (
                    <span
                      style={{ textDecoration: 'underline', color: 'blue' }}
                    >
                      {bookDetails.ratingCount}
                    </span>
                    )
                  </a>
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
            <div id="commentSection"></div>
          </Grid>
          {reviews?.reviews.map((review, index) => {
            if (reviews.reviews.length === index + 1) {
              return (
                <Grid item xs={12} key={index} ref={lastReviewElementRef}>
                  <Review review={review} />
                </Grid>
              );
            } else {
              return (
                <Grid item xs={12} key={index}>
                  <Review review={review} />
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
      <Outlet />
    </Box>
  );
}

export default BookDetails;
