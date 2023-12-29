import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestWobbedrobeGetById } from '../utils/fetchRequests/wobbedrobe';
import { requestGetUser } from '../utils/fetchRequests/user';
import { userLogin } from '../utils/reducers/statusSlice';
import WobbedrobeItemCard from './WobbedrobeItemCard';
import { requestOOTDDelete } from '../utils/fetchRequests/outfit';

export default function OutfitCard({ outfit, userId, aiCard }) {
  const [showItem, setShowItem] = useState(null);
  const dispatch = useDispatch();
  const props = { outfit, showItem, setShowItem };
  return (
    <div
      className='outfit-card'
      style={{
        backgroundImage: `url(${outfit.image_url})`,
      }}
    >
      <div className='icons'>
        {outfit.top_id && (
          <IconButton itemType='top' iconUrl='/images/shirt.svg' {...props} />
        )}

        {outfit.bottom_id && (
          <IconButton
            itemType='bottom'
            iconUrl='/images/pants.svg'
            {...props}
          />
        )}

        {outfit.overall_id && (
          <IconButton
            itemType='overall'
            iconUrl='/images/dress.svg'
            {...props}
          />
        )}

        <IconButton itemType='shoes' iconUrl='/images/shoes.svg' {...props} />

        {!aiCard && (
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
        )}
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
