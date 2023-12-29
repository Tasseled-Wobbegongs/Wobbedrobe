import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WobbedrobeItemCard from '../WobbedrobeItemCard';

export default function UserWobbeDrobe() {
  const user = useSelector((state) => state.status.user);
  console.log(user.wardrobe);
  const page = useSelector((state) => state.status.page);
  const [selection, setSelection] = useState(null);
  if (page === 'VIEW_WOBBEDROBE')
    return (
      <div>
        <button onClick={() => setSelection('top')}>Tops</button>
        <button onClick={() => setSelection('bottom')}>Bottoms</button>
        <button onClick={() => setSelection('overall')}>Overalls</button>
        <button onClick={() => setSelection('shoes')}>Shoes</button>
        <button onClick={() => setSelection('all')}>All</button>
        {selection && selection !== 'all' && (
          <div>
            {user.wardrobe[selection].map((item) => (
              <WobbedrobeItemCard itemType={selection} item={item} />
            ))}
          </div>
        )}
        {selection === 'all' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
            }}
          >
            {[
              ...Object.keys(user.wardrobe).map((key) =>
                user.wardrobe[key].map((item) => (
                  <WobbedrobeItemCard itemType={key} item={item} />
                ))
              ),
            ]}
          </div>
        )}
      </div>
    );
}
