import React from 'react';
import { useSelector } from 'react-redux';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import UserWobbedrobe from './components/pages/UserWobbedrobe';
import AddToWobbedrobe from './components/pages/AddToWobbedrobe';
import AddOOTD from './components/pages/AddOOTD';
import LogInSignUpBox from './components/pages/LogInSignUpBox';
import LandingPage from './components/pages/LandingPage';
import GetInspired from './components/pages/GetInspired';
import Lookbook from './components/pages/Lookbook';
import './styles/App.scss';


function App() {
  const page = useSelector((state) => state.status.page);
  const user = useSelector((state => state.status.user));
  console.log(page);

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
  )
};

  return (
    <div className='App'>
      <Navbar />
      {page === 'HOME' && <Home classname="home-page"/>}
      {page === 'ADD_TO_WOBBEDROBE' && <AddToWobbedrobe classname="add-to-wobbedrobe-page"/>}
      {page === 'VIEW_WOBBEDROBE' && <UserWobbedrobe className="userwobbedrobe-page"/>}
      {page === 'ADD_TO_OOTD' && <AddOOTD className="addtoootd-page"/>}
      {page === 'GET_INSPIRED' && <GetInspired className="getinspired-page"/>}
      {page === 'LOOKBOOK' && <Lookbook className="lookbook-page"/>}
    </div>
  );
}

export default App;
