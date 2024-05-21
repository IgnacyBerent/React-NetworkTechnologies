import { Typography, Grid, Box, Avatar, Rating } from '@mui/material';
import './Review.css';
import { ReviewDto } from '../../../api/dto/review.dto';
import { desciptionTextStyle } from '../../../styles/textStyles';

interface ReviewProps {
  review: ReviewDto;
}

function Review({ review }: ReviewProps) {
  return (
    <Box className="review-container">
      <Grid container spacing={2}>
        <Grid item xs={12} className="review-item">
          <Avatar />
          <Typography variant="body1" className="username">
            <strong>{`${review.user.firstName} ${review.user.lastName}`}</strong>{' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className="rating-container">
            <Rating
              name="read-only"
              value={review.rating}
              precision={0.1}
              readOnly
            />{' '}
          </div>
        </Grid>
        <Grid item xs={12} className="review-item">
          <Typography variant="body2" className="date">
            {new Date(review.reviewDate).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12} className="review-item">
          <Typography sx={desciptionTextStyle}>{review.comment}</Typography>
        </Grid>
      </Grid>
      <div style={{ height: 15 }} />
      <hr />
      <div style={{ height: 20 }} />
    </Box>
  );
}

export default Review;
