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
import MenuAppBar from '../../navigation/MenuAppBar';
import { useEffect, useState } from 'react';
import { useApi } from '../../api/ApiProvider';
import { BookDetailsDto } from '../../api/dto/book.dto';
import { ClientResponse } from '../../api/library-client';
import { BookDetailsGrid } from './BookDetailsGrid';
import Reviews from './Reviews';
import BorrowBookDialog from './BorrowBookDialog';
import { CreateLoanDto } from '../../api/dto/loan.dto';
import { desciptionTextStyle } from '../../styles/textStyles';
import { mainButtonStyle } from '../../styles/buttonStyles';
import Footer from '../../navigation/Footer';

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
        navigate('/my_books');
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

  const SizedBox = () => <div style={{ height: 20 }} />;

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
                <SizedBox />
                <hr />
                <SizedBox />
                <Typography sx={desciptionTextStyle}>
                  {bookDetails.summary}
                </Typography>
                <SizedBox />
                <hr />
                <SizedBox />
                <BookDetailsGrid bookDetails={bookDetails} />
                <Button
                  onClick={handleClickOpen}
                  className="wide-button"
                  variant="contained"
                  sx={mainButtonStyle}
                >
                  BORROW BOOK
                </Button>
                <BorrowBookDialog
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
      <Footer />
      <Outlet />
    </Box>
  );
}

export default BookDetails;
