import { Box, Button, Tooltip, Typography } from '@mui/material';
import MenuAppBar from '../navigation/MenuAppBar';
import Footer from '../navigation/Footer';
import { Outlet } from 'react-router-dom';
import { desciptionTextStyle } from '../styles/textStyles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
            fontSize: 35,
            fontWeight: '900',
            fontFamily: 'Lato',
          }}
        >
          About Me
        </Typography>
        <hr
          style={{
            border: '1.5px solid #333',
          }}
        />
        <Typography
          sx={desciptionTextStyle}
          marginBottom={'1em'}
          marginTop={'2em'}
        >
          I'm Ignacy Berent, a passionate software developer from Poland. I'm
          currently studying Medical Informatics at Wrocław University of
          Science and Technology. My interests span across various fields such
          as self-improvement, philosophy, bodybuilding, and trading.
        </Typography>
        <hr
          style={{
            border: '1px solid #666',
            marginTop: '1em',
            marginBottom: '1em',
          }}
        />
        <Typography sx={desciptionTextStyle} marginBottom={'1em'}>
          I'm a self-taught programmer specializing mainly in data science and
          machine learing in Python. I'm also proficient in app development in
          Flutter. I also have experience in web development with React and
          Spring.
        </Typography>
        <hr
          style={{
            border: '1px solid #666',
            marginTop: '1em',
            marginBottom: '1em',
          }}
        />

        <Typography sx={desciptionTextStyle} marginBottom={'2em'}>
          You can check out my work on{' '}
          <Tooltip title="My GitHub">
            <Button
              variant="outlined"
              href="https://github.com/IgnacyBerent"
              startIcon={<GitHubIcon />}
              sx={{
                paddingY: '1px',
                paddingX: '4px',
                color: 'purple',
                borderColor: 'purple',
              }}
            >
              GitHub
            </Button>
          </Tooltip>{' '}
          and connect with me on{' '}
          <Tooltip title="My LinkedIn">
            <Button
              variant="outlined"
              href="https://www.linkedin.com/in/ignacy-berent-74b355278"
              startIcon={<LinkedInIcon />}
              sx={{ paddingY: '1px', paddingX: '4px' }}
            >
              LinkedIn
            </Button>
          </Tooltip>
          .
        </Typography>
        <hr
          style={{
            border: '1.5px solid #333',
          }}
        />
        <Typography sx={desciptionTextStyle} align="center" marginTop={'1em'}>
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
