import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useEffect, useState } from 'react';

const Footer = () => {
  const navigate = useNavigate();
  const apiClient = useApi();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = apiClient.getUserRole();
    setUserRole(role);
  }, [apiClient]);

  return (
    <Box sx={{ bgcolor: '#333', color: 'white', p: 2, paddingX: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">Ignacy Berent</Typography>
          <Typography>Email: 275255@student.pwr.edu.pl</Typography>
          <Typography>Phone: 883-424-388</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => navigate('/books')} color="inherit">
            Books
          </Button>
          <Button onClick={() => navigate('/my_books')} color="inherit">
            My Books
          </Button>
          <Button onClick={() => navigate('/about')} color="inherit">
            About
          </Button>
          {userRole === 'ROLE_ADMIN' && (
            <>
              <Button
                onClick={() => navigate('/admin/addBook')}
                color="inherit"
              >
                Add Book
              </Button>
              <Button
                onClick={() => navigate('/admin/addUser')}
                color="inherit"
              >
                Add User
              </Button>
              <Button onClick={() => navigate('/admin/users')} color="inherit">
                Users
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
