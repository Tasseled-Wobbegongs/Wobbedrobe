import { func } from 'prop-types';
import React from 'react';
import { requestWobbedrobeDelete } from '../utils/fetchRequests/wobbedrobe';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetUser } from '../utils/fetchRequests/user';
import { userLogin } from '../utils/reducers/statusSlice';
import '../styles/WobbedrobeItemCard.scss';

const emoji = {
  shoes: '👞',
  top: '👕',
  bottom: '👖',
  overall: '👗',
};

export default function WobbedrobeItemCard({ itemType, item }) {
  const { color, category, style, material } = item;
  const user = useSelector((state) => state.status.user);
  const dispatch = useDispatch();
  return (
    <div className='item-card'>
      <div className='header'>
        <h3>{category[0].toUpperCase() + category.slice(1)}</h3>
        <button
          className='delete'
          onClick={async () => {
            if (process.env.NODE_ENV === 'production') {
              await requestWobbedrobeDelete(
                itemType + (itemType === 'shoes' ? '' : 's'),
                item[`${itemType}_id`]
              );
              const updatedUser = await requestGetUser(user.user_id);
              dispatch(userLogin(updatedUser));
            }
          }}
        >
          Delete
        </button>
      </div>

      <div className='flex-row'>
        <div className='flex-item key color'>
          <p>color</p>
        </div>
        <div
          className='flex-item value color'
          style={{
            backgroundColor: color,
          }}
        ></div>
        <div className='flex-item edit'>
          <button>EDIT</button>
        </div>
      </div>

      <div className='flex-row'>
        <div className='flex-item key style'>
          <p>style</p>
        </div>
        <div className='flex-item value style'>
          <p>{style}</p>
        </div>
        <div className='flex-item edit'>
          <button>EDIT</button>
        </div>
      </div>

      {itemType !== 'shoes' && (
        <div className='flex-row'>
          <div className='flex-item key material'>
            <p>material</p>
          </div>
          <div className='flex-item value material'>
            <p>{material}</p>
          </div>
          <div className='flex-item edit'>
            <button>EDIT</button>
          </div>
        </div>
      )}
    </div>
  );
}
