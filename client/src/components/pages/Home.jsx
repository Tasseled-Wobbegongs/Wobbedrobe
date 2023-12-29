//Page 1 of Euny's Mockup
import React from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state) => state.status.user);
  const shuffledUserOutfitImages = user.outfit
    .map((outfit) => outfit.image_url)
    .sort(() => 0.5 - Math.random());
  console.log(shuffledUserOutfitImages);
  return (
    <div className='landingpage'>
      {user && <h1>Welcome to your Wobbedrobe, {user.username}!</h1>}
      <div className='landingpage-photos'>
        <img
          src={shuffledUserOutfitImages[0]}
          className='photo1'
          alt='Wobbedrobe Photo'
        />
        <img
          src={shuffledUserOutfitImages[1]}
          className='photo2'
          alt='Wobbedrobe Photo'
        />
        <img
          src={shuffledUserOutfitImages[2]}
          className='photo3'
          alt='Wobbedrobe Photo'
        />
      </div>
    </div>
  );
}
