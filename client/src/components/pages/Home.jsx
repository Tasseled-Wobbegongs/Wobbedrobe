//Page 1 of Euny's Mockup
import React from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state) => state.status.user);
  return (
    <div>
      {user && <h1>Welcome to your Wobbedrobe, {user.username}!</h1>}
      {!user && <h1>Wobbedrobe</h1>}
      <div className='images'>
        <img />
        <img />
        <img />
      </div>
    </div>
  );
}
