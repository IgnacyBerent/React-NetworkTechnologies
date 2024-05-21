import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Rating,
} from '@mui/material';
import { Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import { dialogTextStyle, dialogTitleStyle } from '../../styles/textStyles';
import { dialogButtonStyle } from '../../styles/buttonStyles';
import { useApi } from '../../api/ApiProvider';

interface AddReviewDialogProps {
  open: boolean;
  onClose: () => void;
  loanId: number;
  bookId: number;
  userId: number;
}

function AddReviewDialog({
  open,
  onClose,
  loanId,
  bookId,
  userId,
}: AddReviewDialogProps) {
  const apiClient = useApi();
  const [commentLength, setCommentLength] = useState(0);
  const [rating, setRating] = useState<number | null>(0);

  const initialValues = { rating: 0.0, comment: '' };

  const onSubmit = useCallback(
    async (values: { rating: number; comment: string }, formik: any) => {
      try {
        // Call the returnLoan and addReview methods concurrently
        const [returnLoanResponse, addReviewResponse] = await Promise.all([
          apiClient.returnLoan(loanId),
          apiClient.addReview({
            bookId,
            userId,
            rating: values.rating,
            comment: values.comment,
          }),
        ]);

        // Check if both requests were successful
        if (returnLoanResponse.success && addReviewResponse.success) {
          // Refresh the page
          window.location.reload();
        } else {
          // Handle errors
          if (!returnLoanResponse.success) {
            console.error(
              'Failed to return loan:',
              returnLoanResponse.statusCode,
            );
          }
          if (!addReviewResponse.success) {
            console.error(
              'Failed to add review:',
              addReviewResponse.statusCode,
            );
          }
        }
      } catch (error) {
        // Handle network errors
        console.error('An error occurred:', error);
      }

      onClose();
    },
    [onClose, apiClient, loanId, bookId, userId],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        rating: yup
          .number()
          .required('Required')
          .typeError('Rating must be a number')
          .min(0, 'Rating must be at least 0')
          .max(5, 'Rating must be at most 5')
          .test(
            'is-decimal',
            'Can have at most 1 number after decimal point',
            (value) => {
              const matchResult = (value + '').match(/^\d+(\.\d{1})?$/);
              return matchResult !== null;
            },
          ),
        comment: yup
          .string()
          .max(3000, 'Comment must be at most 3000 characters long'),
      }),
    [],
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={dialogTitleStyle}>Please add review</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange
          validateOnBlur
        >
          {(formik: any) => (
            <div>
              <Typography sx={dialogTextStyle}>
                Your review will help others decide if they should read this
                book. We will be grateful for your opinion.
              </Typography>
              <form
                className="review-form"
                id="reviewForm"
                onSubmit={formik.handleSubmit}
                noValidate
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  sx={{ marginTop: '2em' }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                    sx={{ marginBottom: '1em' }}
                  >
                    <Typography sx={{ ...dialogTextStyle, marginRight: '1em' }}>
                      Rating:
                    </Typography>
                    <Rating
                      name="rating"
                      value={rating}
                      precision={0.1}
                      sx={{
                        fontSize: '2rem',
                        color: '#f57c00',
                        marginBottom: '0.6em',
                      }}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                        formik.setFieldValue('rating', newValue);
                      }}
                    />
                    <Typography sx={{ ...dialogTextStyle, marginLeft: '1em' }}>
                      {rating}
                    </Typography>
                  </Box>
                  <Typography sx={dialogTextStyle}>Comment:</Typography>
                  <TextField
                    id="comment"
                    variant="standard"
                    name="comment"
                    onChange={(e) => {
                      formik.handleChange(e);
                      setCommentLength(e.target.value.length);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.comment && !!formik.errors.comment}
                    helperText={formik.touched.comment && formik.errors.comment}
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 3000 }}
                    fullWidth
                  />
                  <Box display="flex" justifyContent="flex-end" width="100%">
                    <Typography variant="caption">{`${commentLength}/3000`}</Typography>
                  </Box>
                </Box>
                <DialogActions>
                  <Button
                    type="submit"
                    form="reviewForm"
                    disabled={!(formik.isValid && formik.dirty)}
                    sx={dialogButtonStyle}
                  >
                    Submit Review
                  </Button>
                  <Button sx={dialogButtonStyle} onClick={onClose}>
                    Close
                  </Button>
                </DialogActions>
              </form>
            </div>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddReviewDialog;
