import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/system';

import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const waveAnimation = keyframes`
  0%, 20%, 80%, 100% { transform: translateY(0); }
  40%, 60% { transform: translateY(-10px); }
`;

  const LibraryText = () => {
    const letters = 'LIBRARY'.split('');

    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {letters.map((letter, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              width: '35px',
              height: '35px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginX: '2px',
              animation: `${waveAnimation} 6.1s ease-in-out ${index * 0.7}s infinite`,
            }}
          >
            <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
              {letter}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#f0f0f0' }}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: 'black' }}
          >
            <MenuIcon sx={{ fontSize: '35px' }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: 'black', fontWeight: 'bold' }}
          >
            Photos
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
          <LibraryText />
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
          <div>
            <Link to="/home">
              <Button
                startIcon={<HomeIcon />}
                sx={{
                  color: 'white',
                  backgroundColor: 'black',
                  paddingX: 2,
                  marginRight: 2,
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
                Home
              </Button>
            </Link>
            <Link to="/books">
              <Button
                startIcon={<BookIcon />}
                sx={{
                  color: 'white',
                  backgroundColor: 'black',
                  paddingX: 2,
                  marginRight: 2,
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
                Books
              </Button>
            </Link>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={{ color: 'black' }}
            >
              <AccountCircle sx={{ fontSize: '40px' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate('/profile');
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate('/my_books');
                }}
              >
                My Books
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate('/help');
                }}
              >
                Help
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate('/login');
                }}
              >
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
