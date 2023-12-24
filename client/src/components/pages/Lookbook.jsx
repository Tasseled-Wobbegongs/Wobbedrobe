// Page 9

import React from 'react';
import { useSelector } from 'react-redux';

export default function Lookbook() {
  const outfit = useSelector((state) => state.status.user).outfit;
  const page = useSelector((state) => state.status.page);
  if (page === 'VIEW_LOOKBOOK')
    return (
      <div>
        {outfit.map((item) => (
          <img src={item.imageUrl} />
        ))}
      </div>
    );
}
