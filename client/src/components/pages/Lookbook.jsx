// Page 9

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestOOTDDelete } from '../../utils/fetchRequests/outfit';
import { userLogin } from '../../utils/reducers/statusSlice';
import { requestGetUser } from '../../utils/fetchRequests/user';

export default function Lookbook() {
  const user = useSelector((state) => state.status.user);
  const dispatch = useDispatch();
  const outfit = user.outfit;
  const page = useSelector((state) => state.status.page);
  if (page === 'VIEW_LOOKBOOK')
    return (
      <div>
        {outfit.map((item) => (
          <div>
            <img src={item.image_url} />
            <button
              onClick={async () => {
                if (process.env.NODE_ENV === 'production') {
                  console.log(item);
                  await requestOOTDDelete(item.outfit_id);
                  const updatedUser = await requestGetUser(user.user_id);
                  dispatch(userLogin(updatedUser));
                }
              }}
            >
              Delete Outfit
            </button>
          </div>
        ))}
      </div>
    );
}
