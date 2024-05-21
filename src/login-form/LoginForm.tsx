import './LoginForm.css';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { mainButtonStyle } from '../styles/buttonStyles';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiClient = useApi();
  const initialValues = { username: '', password: '' };

  const [open, setOpen] = useState(location.state?.error || false);

  const handleClose = (
    event: React.SyntheticEvent<any, Event> | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate('/home');
        } else {
          formik.setFieldError('password', 'Invalid username or password');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(5, 'Password too short'),
      }),
    [],
  );

  return (
    <div className="background-image">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="info">
          You are not logged in.
        </Alert>
      </Snackbar>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <div className="login-form-container">
            <h1>WELCOME IN LIBRARY</h1>
            <h2>PLEASE LOGIN</h2>
            <div style={{ height: 20 }} />
            <hr />
            <div style={{ height: 60 }} />
            <form
              className="login-form"
              id="signForm"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <TextField
                className="error-message"
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
                className="error-message"
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
              <div style={{ height: 20 }} />
              <Button
                className="login-button"
                variant="contained"
                startIcon={<LoginIcon />}
                type="submit"
                form="signForm"
                disabled={!(formik.isValid && formik.dirty)}
                sx={mainButtonStyle}
              >
                Login
              </Button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
