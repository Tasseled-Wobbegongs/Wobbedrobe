import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WobbedrobeItemCard from '../WobbedrobeItemCard';
import { element } from 'prop-types';

export default function UserWobbeDrobe() {
  const user = useSelector((state) => state.status.user);
  console.log(user.wardrobe);
  const page = useSelector((state) => state.status.page);
  const [selection, setSelection] = useState(null);
  if (page === 'VIEW_WOBBEDROBE')
    return (
      <div className='wobbedrobe'>
        <div className='buttons'>
          <button onClick={() => setSelection('top')}>Tops</button>
          <button onClick={() => setSelection('bottom')}>Bottoms</button>
          <button onClick={() => setSelection('overall')}>Overalls</button>
          <button onClick={() => setSelection('shoes')}>Shoes</button>
          <button onClick={() => setSelection('all')}>All</button>
        </div>
        {selection && selection !== 'all' && (
          <div className='card-container'>
            {[...user.wardrobe[selection]]
              .sort((a, b) => {
                return a[`${selection}_id`] - b[`${selection}_id`];
              })
              .map((item) => (
                <WobbedrobeItemCard
                  itemType={selection}
                  item={item}
                  key={`${selection}_${item[`${selection}_id`]}`}
                />
              ))}
          </div>
        )}
        {selection === 'all' && (
          <div className='card-container'>
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
