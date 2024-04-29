import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';

function LoginForm() {
  const initialValues = { username: '', password: '' };
  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      console.log(values);
    },
    [],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Requierd'),
        password: yup.string().required('Requierd').min(5, 'Password to short'),
      }),
    [],
  );

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
          <div className="login-form-container">
            <h1>WELCOME IN LIBRARY</h1>
            <h2>PLEASE LOGIN</h2>
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
              <Button
                className="login-button"
                variant="contained"
                startIcon={<LoginIcon />}
                type="submit"
                form="signForm"
                disabled={!(formik.isValid && formik.dirty)}
                sx={{ marginTop: '1rem' }}
              >
                Login
              </Button>
            </form>
            <button className="create-account-button">CREATE AN ACCOUNT</button>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
