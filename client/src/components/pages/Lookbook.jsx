// Page 9

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestOOTDDelete } from '../../utils/fetchRequests/outfit';
import { userLogin } from '../../utils/reducers/statusSlice';
import { requestGetUser } from '../../utils/fetchRequests/user';
import '../../styles/LookBook.scss';
import WobbedrobeItemCard from '../WobbedrobeItemCard';
import { requestWobbedrobeGetById } from '../../utils/fetchRequests/wobbedrobe';

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

function OutfitCard({ outfit, userId }) {
  const [showItem, setShowItem] = useState(null);
  const dispatch = useDispatch();
  return (
    <div
      className='outfit-card'
      style={{
        backgroundImage: `url(${outfit.image_url})`,
      }}
    >
      <div className='icons'>
        {outfit.top_id && (
          <IconButton
            itemType='top'
            iconUrl='/images/shirt.svg'
            outfit={outfit}
            showItem={showItem}
            setShowItem={setShowItem}
          />
        )}

        {outfit.bottom_id && (
          <IconButton
            itemType='bottom'
            iconUrl='/images/pants.svg'
            outfit={outfit}
            showItem={showItem}
            setShowItem={setShowItem}
          />
        )}

        {outfit.overall_id && (
          <IconButton
            itemType='overall'
            iconUrl='/images/dress.svg'
            outfit={outfit}
            showItem={showItem}
            setShowItem={setShowItem}
          />
        )}

        <IconButton
          itemType='shoes'
          iconUrl='/images/shoes.svg'
          outfit={outfit}
          showItem={showItem}
          setShowItem={setShowItem}
        />

        <div
          className='icon delete'
          onClick={async () => {
            if (process.env.NODE_ENV === 'production') {
              await requestOOTDDelete(outfit.outfit_id);
              const updatedUser = await requestGetUser(userId);
              dispatch(userLogin(updatedUser));
            }
          }}
        >
          <img src='/images/trash-fill.svg' alt='delete-button' />
        </div>
      </div>

      {showItem && (
        <div className='card-container'>
          <WobbedrobeItemCard {...showItem} />
        </div>
      )}
    </div>
  );
}

function IconButton({ itemType, iconUrl, outfit, setShowItem, showItem }) {
  return (
    <div
      className='icon'
      onClick={async () => {
        if (process.env.NODE_ENV === 'production') {
          const response = await requestWobbedrobeGetById(
            itemType + (itemType === 'shoes' ? '' : 's'),
            outfit[`${itemType}_id`]
          );
          const item = response.item;
          if (
            showItem &&
            showItem.itemType === itemType &&
            showItem.item[`${itemType}_id`] === item[`${itemType}_id`]
          ) {
            setShowItem(null);
          } else {
            setShowItem({
              itemType,
              item,
            });
          }
        } else {
          setShowItem({
            itemType: 'top',
            item: outfit.top,
          });
        }
      }}
    >
      <img src={iconUrl} alt={itemType} />
    </div>
  );
}
