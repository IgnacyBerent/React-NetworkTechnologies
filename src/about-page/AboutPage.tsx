import { Box, Typography } from '@mui/material';
import MenuAppBar from '../navigation/MenuAppBar';
import Footer from '../navigation/Footer';
import { Outlet } from 'react-router-dom';
import { desciptionTextStyle } from '../styles/textStyles';

function AboutPage() {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8' }}>
      <MenuAppBar />
      <div style={{ height: 120 }} />
      <Box
        sx={{
          marginX: '10%',
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: '900',
            fontFamily: 'Lato',
            marginBottom: 2,
          }}
        >
          About Me
        </Typography>
        <Typography sx={desciptionTextStyle} marginBottom={'1em'}>
          I'm Ignacy Berent, a passionate software developer from Poland. I'm
          currently studying Medical Informatics at Wrocław University of
          Science and Technology. My interests span across various fields such
          as self-improvement, philosophy, bodybuilding, and trading.
        </Typography>
        <Typography sx={desciptionTextStyle} marginBottom={'1em'}>
          I'm a self-taught programmer specializing mainly in data science and
          machine learing in Python. I'm also proficient in app development in
          Flutter. I also have experience in web development with React and
          Spring.
        </Typography>
        <Typography sx={desciptionTextStyle} marginBottom={'2em'}>
          You can check out my work on{' '}
          <a href="https://github.com/IgnacyBerent">GitHub</a> and connect with
          me on{' '}
          <a href="https://www.linkedin.com/in/ignacy-berent-74b355278">
            LinkedIn
          </a>
          .
        </Typography>
        <Typography sx={desciptionTextStyle} align="center">
          Here's a map of my university:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 5,
            marginTop: 2,
          }}
        >
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=Wrocław+University+of+Science+and+Technology&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:U%7CWrocław+University+of+Science+and+Technology&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
            alt="Wrocław University of Science and Technology"
          />
        </Box>
      </Box>
      <Footer />
      <Outlet />
    </Box>
  );
}

export default AboutPage;
