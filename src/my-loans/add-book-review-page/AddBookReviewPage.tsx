import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import './AddBookReviewPage.css';

function AddBookReviewPage() {
  const navigate = useNavigate();
  const initialValues = { rating: 0.0, comment: '' };

  const onSubmit = useCallback(
    (values: { rating: number; comment: string }, formik: any) => {
      navigate('/my_loans');
    },
    [navigate],
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
          .test('is-decimal', 'invalid decimal', (value) => {
            const matchResult = (value + '').match(/^\d+(\.\d{1})?$/);
            return matchResult !== null;
          }),
        comment: yup
          .string()
          .max(3000, 'Comment must be at most 3000 characters long'),
      }),
    [],
  );

  return (
    <div className="add-book-review-page">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <div className="review-form-container">
            <h2>Please add review</h2>
            <p className="review-instruction">
              Your review will help others decide if they should read this book.
              We will be grateful for your opinion.
            </p>
            <form
              className="review-form"
              id="reviewForm"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <TextField
                className="error-message"
                id="rating"
                label="Rating"
                variant="standard"
                name="rating"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rating && !!formik.errors.rating}
                helperText={formik.touched.rating && formik.errors.rating}
              />
              <TextField
                className="error-message"
                id="comment"
                label="Comment"
                variant="standard"
                name="comment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.comment && !!formik.errors.comment}
                helperText={formik.touched.comment && formik.errors.comment}
              />
              <Button
                className="review-button"
                variant="contained"
                type="submit"
                form="reviewForm"
                disabled={!(formik.isValid && formik.dirty)}
                sx={{ marginTop: '1rem' }}
              >
                Submit Review
              </Button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default AddBookReviewPage;
