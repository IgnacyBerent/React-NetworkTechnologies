import './RegisterForm.css';
import { Button, TextField, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate();
  const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  };

  const onSubmit = useCallback(
    (
      values: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
      },
      formik: any,
    ) => {
      navigate('/home');
      console.log('/home');
    },
    [navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        username: yup.string().required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(5, 'Password too short'),
        repeatPassword: yup
          .string()
          .required('Required')
          .oneOf([yup.ref('password') as any, null], 'Passwords must match'),
      }),
    [],
  );

  console.log('LoginForm render');

  return (
    <div className="background-image">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <div className="register-form-container">
            <h1>WELCOME IN LIBRARY</h1>
            <h2>PLEASE REGISTER</h2>
            <form
              className="register-form"
              id="signForm"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <Box display="flex" justifyContent="space-between" gap={2}>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="standard"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && !!formik.errors.firstName}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="standard"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && !!formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" gap={2}>
                <TextField
                  id="username"
                  label="Username"
                  variant="standard"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && !!formik.errors.username}
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" gap={2}>
                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                  id="repeatPassword"
                  label="Repeat Password"
                  variant="standard"
                  type="password"
                  name="repeatPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.repeatPassword &&
                    !!formik.errors.repeatPassword
                  }
                  helperText={
                    formik.touched.repeatPassword &&
                    formik.errors.repeatPassword
                  }
                />
              </Box>

              <Button
                className="register-button"
                variant="contained"
                startIcon={<LoginIcon />}
                type="submit"
                form="signForm"
                disabled={!(formik.isValid && formik.dirty)}
                sx={{ marginTop: '1rem' }}
              >
                Register
              </Button>
            </form>
            <button
              className="have-account-button"
              onClick={() => navigate('/login')}
            >
              HAVE AN ACCOUNT? LOG IN!
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
