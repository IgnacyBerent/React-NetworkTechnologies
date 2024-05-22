import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import { useApi } from '../api/ApiProvider';
import MenuAppBar from '../app-bar/MenuAppBar';
import { mainButtonStyle } from '../styles/buttonStyles';
import { useNavigate } from 'react-router-dom';

interface UserFormValues {
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ROLE_READER' | 'ROLE_ADMIN';
}

const validationSchema = yup.object({
  password: yup.string().required('Password is required'),
  username: yup.string().required('Username is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.mixed().oneOf(['ROLE_READER', 'ROLE_ADMIN'], 'Role is required'),
});

const AddUser = () => {
  const apiClient = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: UserFormValues,
    { setSubmitting }: FormikHelpers<UserFormValues>,
  ) => {
    const response = await apiClient.register(values);
    if (response.success) {
      alert('User added successfully');
      navigate('/admin/users');
    } else {
      alert(`Failed to add user: ${response.statusCode}`);
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
        Add User
      </Typography>
      <Formik
        initialValues={{
          password: '',
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          role: 'ROLE_READER',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <Stack spacing={4} direction="column" marginX="5rem">
              <Field
                name="username"
                as={TextField}
                label="Username"
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                name="firstName"
                as={TextField}
                label="First Name"
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <Field
                name="lastName"
                as={TextField}
                label="Last Name"
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <Field
                name="email"
                as={TextField}
                label="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                name="role"
                as={TextField}
                label="Role"
                select
                SelectProps={{ native: true }}
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
              >
                <option value="ROLE_READER">Reader</option>
                <option value="ROLE_ADMIN">Admin</option>
              </Field>
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
    </Box>
  );
};

export default AddUser;
