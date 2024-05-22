import { Box, Button, Typography } from '@mui/material';
import MenuAppBar from '../navigation/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';
import './HomePage.css';
import News from './news/News';
import FunFact from './FunFact';
import Footer from '../navigation/Footer';

function HomePage() {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8' }}>
      <MenuAppBar />
      <div className="mainBoxContainer">
        <hr className="hr1" />
        <Box
          className="imageBox"
          sx={{
            backgroundImage:
              "url('https://basecamplive.com/wp-content/uploads/2023/02/books.jpeg')",
            backgroundPosition: '35% 0',
            backgroundRepeat: 'no-repeat',
            color: 'white',
            padding: '1em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginX: '15em',
            marginY: '1em',
            height: '30vh',
          }}
        >
          <Typography
            component="div"
            sx={{
              width: '60%',
              fontSize: '3.1em',
              fontWeight: 'bold',
              fontFamily: 'lato',
              marginY: '0',
              lineHeight: '0.9',
            }}
          >
            Do you want to dive into a new world?
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: '1.2em',
              fontFamily: 'karla',
              marginTop: '0.6em',
            }}
          >
            FIND OUT WHAT WE HAVE TO OFFER
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '30px',
              width: '10em',
              fontFamily: 'karla',
              fontWeight: 'bold',
              fontSize: '1.0em',
              marginTop: '1em',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            component={Link}
            to="/books"
          >
            DIVE NOW
          </Button>
        </Box>
        <hr className="hr1" />
        <Typography
          sx={{
            fontSize: '2em',
            fontWeight: 'bold',
            fontFamily: 'lato',
            marginY: '0',
            color: '#222',
            marginLeft: '2.5em',
            marginTop: '1em',
          }}
        >
          News
        </Typography>
        <hr className="hr2" />
        <div className="boxContainer">
          <News />
        </div>
        <Typography
          sx={{
            fontSize: '2em',
            fontWeight: 'bold',
            fontFamily: 'lato',
            marginY: '0',
            color: '#222',
            marginLeft: '2.5em',
            marginTop: '1em',
          }}
        >
          Fun Facts
        </Typography>
        <hr className="hr2" />
        <FunFact
          fact="Reading is a great way to relax and learn new things. It can improve
          your memory and concentration, and it can even reduce stress.
          According to a study by the University of Sussex, reading can reduce
          stress by up to 68%. It's a more effective stress reduction method
          than listening to music or going for a walk."
          imgSource="https://en.pimg.jp/104/492/694/1/104492694.jpg"
          imgPosition="left"
        />
        <FunFact
          fact="Did you know that reading can actually increase your lifespan? A study
          conducted by Yale University found that people who read books for 30
          minutes a day lived an average of 23 months longer than non-readers or
          magazine readers."
          imgSource="https://as2.ftcdn.net/v2/jpg/01/70/51/29/1000_F_170512968_msi2C3EhdQWYnX0QruzmWfVjEL6LP482.jpg"
          imgPosition="right"
        />
        <FunFact
          fact="Reading not only improves your brain's connectivity but also increases
          your emotional intelligence. By reading, you are exposed to a variety
          of emotions and situations that can help you understand and empathize
          with others better."
          imgSource="https://cdn.imt-pm.com/wp-content/uploads/2021/12/online-pdus-pmp-renewal-EI-emotional-intelligence.png"
          imgPosition="left"
        />
      </div>
      <Footer />
      <Outlet />
    </Box>
  );
}

export default HomePage;
