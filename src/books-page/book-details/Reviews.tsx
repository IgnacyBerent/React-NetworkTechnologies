import { Grid } from '@mui/material';
import Review from './review/Review';
import { ReviewsPageDto } from '../../api/dto/review.dto';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useApi } from '../../api/ApiProvider';

interface ReviewsProps {
  bookId: string;
}

const Reviews: React.FC<ReviewsProps> = ({ bookId }) => {
  const apiClient = useApi();
  const [reviews, setReviews] = useState<ReviewsPageDto | null>(null);
  const [page, setPage] = useState(0);

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
    const fetchReviews = async () => {
      const response = await apiClient.getReviews(Number(bookId), page);
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

  return (
    <>
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
    </>
  );
};

export default Reviews;
