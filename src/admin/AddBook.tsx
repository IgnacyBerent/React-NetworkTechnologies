import React, { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import { useApi } from '../api/ApiProvider';
import MenuAppBar from '../navigation/MenuAppBar';
import { mainButtonStyle } from '../styles/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Footer from '../navigation/Footer';

interface BookFormValues {
  img: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  availableCopies: number;
  genre: string;
  summary: string;
}

const validationSchema = yup.object({
  img: yup
    .string()
    .required('book image is required')
    .url('Must be a valid URL'),
  isbn: yup.string().required('ISBN is required'),
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  publisher: yup.string().required('Publisher is required'),
  publicationYear: yup
    .number()
    .required('Publication year is required')
    .min(1000, 'Publication year must be at least 1000'),
  availableCopies: yup
    .number()
    .required('Available copies is required')
    .min(0, 'Available copies must be at least 0'),
  genre: yup.string().required('Genre is required'),
  summary: yup
    .string()
    .required('Summary is required')
    .max(3000, 'Summary length must be less than 3000 characters'),
});

const AddBook = () => {
  const apiClient = useApi();
  const navigate = useNavigate();
  const [summaryLength, setSummaryLength] = useState(0);
  const handleSubmit = async (
    values: BookFormValues,
    { setSubmitting }: FormikHelpers<BookFormValues>,
  ) => {
    const response = await apiClient.addBook(values);
    if (response.success) {
      alert('Book added successfully');
      navigate('/books');
    } else {
      alert(`Failed to add book: ${response.statusCode}`);
    }
    setSubmitting(false);
  };

  return (
    <Box sx={{ backgroundColor: '#f8f8f8' }}>
      <MenuAppBar />
      <div style={{ height: '80px' }}></div>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginY: '2rem',
          fontSize: '2rem',
          fontWeight: '900',
          fontFamily: 'Lato',
        }}
      >
        Add Book
      </Typography>
      <Formik
        initialValues={{
          img: '',
          isbn: '',
          title: '',
          author: '',
          publisher: '',
          publicationYear: 0,
          availableCopies: 0,
          genre: '',
          summary: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, errors, touched, isValid, dirty }) => (
          <Form>
            <Stack spacing={4} direction="column" marginX="5rem">
              <Field
                name="img"
                as={TextField}
                label="Image URL"
                error={touched.img && Boolean(errors.img)}
                helperText={touched.img && errors.img}
              />
              <Field
                name="isbn"
                as={TextField}
                label="ISBN"
                error={touched.isbn && Boolean(errors.isbn)}
                helperText={touched.isbn && errors.isbn}
              />
              <Field
                name="title"
                as={TextField}
                label="Title"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              <Field
                name="author"
                as={TextField}
                label="Author"
                error={touched.author && Boolean(errors.author)}
                helperText={touched.author && errors.author}
              />
              <Field
                name="publisher"
                as={TextField}
                label="Publisher"
                error={touched.publisher && Boolean(errors.publisher)}
                helperText={touched.publisher && errors.publisher}
              />
              <Field
                name="publicationYear"
                as={TextField}
                label="Publication Year"
                type="number"
                error={
                  touched.publicationYear && Boolean(errors.publicationYear)
                }
                helperText={touched.publicationYear && errors.publicationYear}
              />
              <Field
                name="availableCopies"
                as={TextField}
                label="Available Copies"
                type="number"
                error={
                  touched.availableCopies && Boolean(errors.availableCopies)
                }
                helperText={touched.availableCopies && errors.availableCopies}
              />
              <Field
                name="genre"
                as={TextField}
                label="Genre"
                error={touched.genre && Boolean(errors.genre)}
                helperText={touched.genre && errors.genre}
              />
              <Box width="100%">
                <Field
                  name="summary"
                  as={TextField}
                  label="Summary"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    setSummaryLength(e.target.value.length);
                  }}
                  error={touched.summary && Boolean(errors.summary)}
                  helperText={touched.summary && errors.summary}
                />
                <Box display="flex" justifyContent="flex-end" width="100%">
                  <Typography variant="caption">{`${summaryLength}/3000`}</Typography>
                </Box>
              </Box>
              <Button
                type="submit"
                disabled={!(isValid && dirty)}
                sx={mainButtonStyle}
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <div style={{ height: '80px' }}></div>
      <Footer />
    </Box>
  );
};

export default AddBook;
