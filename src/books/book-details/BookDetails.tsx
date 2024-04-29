import './BookDetails.css';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material';
import { Rating } from '@mui/material';

interface BookDetailsProps {
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
}

function BookDetails({
  img,
  title,
  author,
  isbn,
  publicationYear,
  publisher,
  rating,
  ratingCount,
  genre,
  summary,
}: BookDetailsProps) {
  return (
    <Grid container className="book-details-container">
      <Grid item xs={4} className="book-cover-container">
        <div className="book-cover-wrapper">
          <CardMedia component="img" image={img} className="book-cover" />
        </div>
      </Grid>
      <Grid item xs={8} className="book-details-card">
        <Card>
          <CardContent className="book-details-content">
            <Typography variant="h5" className="book-title">
              {title}
            </Typography>
            <div className="rating-container">
              Rating:{' '}
              <Rating
                name="read-only"
                value={rating}
                precision={0.1}
                readOnly
              />{' '}
              {rating}/5 ({ratingCount})
            </div>
            <hr />
            <Typography variant="body2" className="book-summary">
              {summary}
            </Typography>
            <hr />
            <Typography variant="h6" gutterBottom className="book-details-text">
              BOOK DETAILS
            </Typography>

            <Grid container className="book-details-list" spacing={1}>
              <Grid item xs={6} className="grid-item">
                <Typography>Author:</Typography>
              </Grid>
              <Grid item xs={6} className="grid-val">
                <Typography>{author}</Typography>
              </Grid>
              <Grid item xs={6} className="grid-item">
                <Typography>Publication Year:</Typography>
              </Grid>
              <Grid item xs={6} className="grid-val">
                <Typography>{publicationYear}</Typography>
              </Grid>
              <Grid item xs={6} className="grid-item">
                <Typography>Genre:</Typography>
              </Grid>
              <Grid item xs={6} className="grid-val">
                <Typography>{genre}</Typography>
              </Grid>
              <Grid item xs={6} className="grid-item">
                <Typography>Publisher:</Typography>
              </Grid>
              <Grid item xs={6} className="grid-val">
                <Typography>{publisher}</Typography>
              </Grid>
              <Grid item xs={6} className="grid-item">
                <Typography>ISBN:</Typography>
              </Grid>
              <Grid item xs={6} className="grid-val">
                <Typography>{isbn}</Typography>
              </Grid>
            </Grid>
            <Button className="wide-button" variant="contained" color="primary">
              BORROW BOOK
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default BookDetails;
