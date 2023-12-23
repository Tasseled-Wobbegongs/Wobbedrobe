import React from 'react';
import { useSelector } from 'react-redux';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import UserWobbeDrobe from './components/pages/UserWobbedrobe';
import AddToWobbeDrobe from './components/pages/AddToWobbedrobe';
import AddOOTD from './components/pages/AddOOTD';
import LogInSignUpBox from './components/pages/LogInSignUpBox';
import '../src/styles/Login.scss';

function App() {
  const page = useSelector((state) => state.status.page);
  console.log(page);
  return (
    <div className='App'>
      <Navbar />
      {page === 'HOME' && <Home />}
      {page === 'ADD_TO_WOBBEDROBE' && <AddToWobbeDrobe />}
      {page === 'VIEW_WOBBEDROBE' && <UserWobbeDrobe />}
      {page === 'ADD_TO_OOTD' && <AddOOTD />}
      {page === 'LOGIN' && <LogInSignUpBox />}
      {page === 'SIGN_UP' && <LogInSignUpBox />}
    </div>
  );
}

export default App;
