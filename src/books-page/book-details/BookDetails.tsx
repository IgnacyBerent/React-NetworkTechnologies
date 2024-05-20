import './BookDetails.css';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

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
import { useEffect, useState } from 'react';
import { useApi } from '../../api/ApiProvider';
import { BookDetailsDto } from '../../api/dto/book.dto';
import { ClientResponse } from '../../api/library-client';
import { BookDetailsGrid } from './BookDetailsGrid';
import Reviews from './Reviews';
import ReturnDateDialog from './ReturnDateDialog';
import { CreateLoanDto } from '../../api/dto/loan.dto';

function BookDetails() {
  const apiClient = useApi();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState<BookDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [dueDays, setReturnDate] = useState(14);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (value: number) => {
    setReturnDate(value);
  };

  const handleConfirm = async () => {
    const userResponse = await apiClient.getCurrentUser();
    if (userResponse.success) {
      const userId = userResponse.data?.id;
      if (!userId) {
        console.error('Failed to get user ID');
        return;
      }

      const loanDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(loanDate.getDate() + dueDays);

      const loanDto: CreateLoanDto = {
        userId,
        bookId: Number(bookId),
        loanDate: loanDate.toISOString(),
        dueDate: dueDate.toISOString(),
      };

      const response = await apiClient.takeLoan(loanDto);
      if (response.success) {
        navigate('/my-books');
        console.log('Loan successful');
      } else {
        console.error('Loan failed', response.statusCode);
      }

      handleClose();
    }
  };

  useEffect(() => {
    apiClient
      .getBookDetails(Number(bookId))
      .then((response: ClientResponse<BookDetailsDto | null>) => {
        if (response.success) {
          setBookDetails(response.data);
        } else {
          if (response.statusCode === 401 || response.statusCode === 403) {
            navigate('/login', { state: { from: location, error: true } });
          } else {
            console.error('Failed to fetching details', response.statusCode);
          }
        }
        setLoading(false);
      });
  }, [navigate, location, apiClient, bookId]);

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
                <BookDetailsGrid bookDetails={bookDetails} />
                <Button
                  onClick={handleClickOpen}
                  className="wide-button"
                  variant="contained"
                  sx={{
                    color: 'white',
                    backgroundColor: 'black',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  BORROW BOOK
                </Button>
                <ReturnDateDialog
                  open={open}
                  handleClose={handleClose}
                  handleConfirm={handleConfirm}
                  handleDateChange={handleDateChange}
                />
              </CardContent>
            </Card>
            <div id="commentSection"></div>
          </Grid>
          <Reviews bookId={bookId!} />
        </Grid>
      </Box>
      <Outlet />
    </Box>
  );
}

export default BookDetails;
