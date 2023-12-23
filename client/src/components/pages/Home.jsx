//Page 1 of Euny's Mockup
import React from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const username = useSelector((state) => state.status.user.username);
  return (
    <div>
      <h1>Welcome to your Wobbedrobe, {username}!</h1>
      <div className='images'>
        <img />
        <img />
        <img />
      </div>
    </div>
  );
}
