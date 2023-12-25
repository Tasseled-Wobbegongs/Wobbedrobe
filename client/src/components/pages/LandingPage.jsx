// page 4
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goToPage } from '../../utils/reducers/statusSlice';
import Navbar from '../Navbar';
import '../../styles/LandingPage.scss'
import wobbedrobe from '../../../docs/assets/images/wobbedrobe-landing.svg';

export default function Welcome() {
  const user = useSelector((state) => state.status.user);
  const page = useSelector((state) => state.status.page);
  const dispatch = useDispatch();

    return (
      <div className="landingpage">
        <Navbar />
        <p>hello</p>
            <div className="landing-page-button">
              <button onClick={() => dispatch(goToPage('LOGIN'))}>Signin</button>
            </div>
      </div>
    );
}
