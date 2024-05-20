import { Typography, Grid } from '@mui/material';
import React from 'react';

interface BookDetails {
  author: string;
  publicationYear: number;
  genre: string;
  publisher: string;
  isbn: string;
  availableCopies: number;
}

interface BookDetailsGridProps {
  bookDetails: BookDetails;
}

export const BookDetailsGrid: React.FC<BookDetailsGridProps> = ({
  bookDetails,
}) => (
  <>
    <Typography variant="h6" gutterBottom className="book-details-text">
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
  </>
);
