// page 4
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goToPage } from '../../utils/reducers/statusSlice';
import Navbar from '../Navbar';

export default function LandingPage() {
  const user = useSelector((state) => state.status.user);
  const page = useSelector((state) => state.status.page);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar />
      <p>Trying to make a commit</p>
      <div className='landing-page-button'>
        <button onClick={() => dispatch(goToPage('LOGIN'))}>Signin</button>
      </div>
    </div>
  );
}
