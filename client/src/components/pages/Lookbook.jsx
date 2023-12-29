// Page 9

import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/LookBook.scss';
import OutfitCard from '../OutfitCard';

export default function Lookbook() {
  const user = useSelector((state) => state.status.user);
  const outfits = user.outfit;
  const page = useSelector((state) => state.status.page);
  if (page === 'VIEW_LOOKBOOK')
    return (
      <div className='lookbook'>
        {outfits.map((item) => (
          <OutfitCard
            outfit={item}
            userId={user.user_id}
            key={item.outfit_id}
          />
        ))}
      </div>
    );
}
