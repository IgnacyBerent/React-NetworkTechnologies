import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

function LoginForm() {
  return (
    <div>
      <form className="login-form">
        <TextField id="username" label="Username" variant="standard" />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
        />
        <Button variant="contained" startIcon={<LoginIcon />} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
