import { Button } from '@mui/material';
import MenuAppBar from '../app-bar/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div>
      <MenuAppBar />
      <div className="boxContainer">
        <p className="title">Welcome to Our Library</p>
        <hr />
        <p className="description">
          Welcome to our library! We have a wide variety of books for you to
          borrow. Our collection ranges from classic literature and science
          fiction to the latest bestsellers. Whether you're looking for a good
          mystery or want to delve into the world of non-fiction, we've got you
          covered.
        </p>
        <p className="description">
          Reading is a great way to relax and learn new things. It can improve
          your memory and concentration, and it can even reduce stress.
          According to a study by the University of Sussex, reading can reduce
          stress by up to 68%. It's a more effective stress reduction method
          than listening to music or going for a walk.
        </p>
        <Button variant="contained" component={Link} to="/books" sx={{ m: 1 }}>
          Books
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default HomePage;
