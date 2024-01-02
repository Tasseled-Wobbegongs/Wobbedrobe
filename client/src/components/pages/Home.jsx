//Page 1 of Euny's Mockup
import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/Home.scss'
import photo1 from '../../images/andrey-home.jpg';
import photo2 from '../../images/aromateec-home.jpg';
import photo3 from '../../images/ellie-home.jpg';

export default function Home() {
  const user = useSelector((state) => state.status.user);
  return (
    <div className="home-container">
      <div className="home-welcome">
        {user && <h1>Welcome back, {user.username}!</h1>}
      </div>
      {!user && <h1>Wobbedrobe</h1>}
      <div className='home-images'>
          <img src={ photo1 } className="photo1" alt="Wobbedrobe Photo" />
          <img src={ photo2 } className="photo2" alt="Wobbedrobe Photo" />
          <img src={ photo3 } className="photo3" alt="Wobbedrobe Photo" />
      </div>
    </div>
  );
}