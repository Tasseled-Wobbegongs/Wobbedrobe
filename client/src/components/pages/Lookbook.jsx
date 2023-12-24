// Page 9

import React from 'react';
import { useSelector } from 'react-redux';

export default function Lookbook() {
  const user = useSelector((state) => state.status.user);
  console.log(user);
  const outfit = user.outfit;
  const page = useSelector((state) => state.status.page);
  if (page === 'VIEW_LOOKBOOK')
    return (
      <div>
        {outfit.map((item) => (
          <div>
            <img src={item.image_url} />
            <button>Delete Outfit</button>
          </div>
        ))}
      </div>
    );
}
