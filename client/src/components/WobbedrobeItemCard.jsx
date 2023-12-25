import { func } from 'prop-types';
import React from 'react';
import { requestWobbedrobeDelete } from '../utils/fetchRequests/wobbedrobe';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetUser } from '../utils/fetchRequests/user';
import { userLogin } from '../utils/reducers/statusSlice';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        border: 'solid 1px black',
        paddingBottom: '20px',
        margin: '10px',
        borderRadius: '5px',
        boxShadow: '2px 2px 5px gray',
      }}
    >
      <h3>{emoji[itemType]}</h3>
      <LabelText label='Category' text={category} />
      <div
        style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
        }}
      >
        <strong>Color: </strong>
        <div
          style={{
            backgroundColor: color,
            height: '20px',
            width: '50px',
            border: 'solid 1px black',
          }}
        ></div>
      </div>
      {itemType !== 'shoes' && <LabelText label='Material' text={material} />}
      <LabelText label='Style' text={style} />
      <div>
        <button>Update</button>
        <button
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
    </div>
  );
}

function LabelText({ label, text }) {
  return (
    <p style={{ margin: '2px' }}>
      <strong>{label}: </strong>
      {text}
    </p>
  );
}
