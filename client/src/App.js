import React from 'react';
import { useSelector } from 'react-redux';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import UserWobbedrobe from './components/pages/UserWobbedrobe';
import AddToWobbedrobe from './components/pages/AddToWobbedrobe';
import AddOOTD from './components/pages/AddOOTD';
import LogInSignUpBox from './components/pages/LogInSignUpBox';
import LandingPage from './components/pages/LandingPage';
import './styles/App.scss';
import Lookbook from './components/pages/Lookbook';
import GetInspired from './components/pages/GetInspired';

function App() {
  const page = useSelector((state) => state.status.page);
  const user = useSelector((state) => state.status.user);
  console.log(page);
  console.log('mode is', process.env.NODE_ENV);

  // if no user is logged in and the page is not 'LOGIN' or 'SIGN_UP' show the LANDING_PAGE
  if (!user && page === 'LANDING_PAGE') {
    return (
      <div className='App'>
        <LandingPage className="landingpage-page"/>
      </div>
    );
  }
  // if the 'sign in' button is clicked on the LandingPage, render the LogInSignUpBox for login
  if (page === 'LOGIN') {
    return (
      <div className='App'>
        <div className="login-signup-page">
          {page === 'LOGIN' && <LogInSignUpBox isSignUp={false} />}
          {page === 'SIGN_UP' && <LogInSignUpBox isSignUp={true} />}
        </div>
      </div>
    );
  }

  return (
    <div className='App'>
      <Navbar />
      {page === 'HOME' && <Home />}
      {page === 'ADD_TO_WOBBEDROBE' && <AddToWobbedrobe />}
      {page === 'VIEW_WOBBEDROBE' && <UserWobbedrobe />}
      {page === 'VIEW_LOOKBOOK' && <Lookbook />}
      {page === 'ADD_TO_OOTD' && <AddOOTD />}
      {page === 'GET_INSPIRED' && <GetInspired />}
    </div>
  );
}

export default App;
