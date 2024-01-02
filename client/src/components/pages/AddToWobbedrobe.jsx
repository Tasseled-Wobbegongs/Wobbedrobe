//page 5

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goToPage, userLogin } from '../../utils/reducers/statusSlice';
import categories from '../../clothesData/categories.json';
import materials from '../../clothesData/materials.json';
import styles from '../../clothesData/style.json';
import { requestWobbedrobeAdd } from '../../utils/fetchRequests/wobbedrobe';
import { requestGetUser } from '../../utils/fetchRequests/user';
import '../../styles/AddToWobbeDrobe.scss';

export default function AddToWobbeDrobe() {
  const page = useSelector((state) => state.status.page);
  const user = useSelector((state) => state.status.user);
  const dispatch = useDispatch();
  const [selection, setSelection] = useState(null);
  if (page === 'ADD_TO_WOBBEDROBE')
    return (
      <div className='add-to-wobbedrobe'>
        {!selection && (
          <div className='itemType-buttons'>
            <button onClick={() => setSelection('tops')}>Top</button>
            <button onClick={() => setSelection('bottoms')}>Bottoms</button>
            <button onClick={() => setSelection('overalls')}>Overalls</button>
            <button onClick={() => setSelection('shoes')}>Shoes</button>
          </div>
        )}
        {selection && (
          <div>
            <p>You are adding a new entry of {selection} to your Wobbedrobe</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const body = {
                  user_id: user.user_id,
                  color: e.target.color.value,
                  category: e.target.category.value,
                  style: e.target.style.value,
                };
                if (selection !== 'shoes')
                  body.material = e.target.material.value;
                console.log(body);

                if (process.env.NODE_ENV === 'production') {
                  await requestWobbedrobeAdd(selection, body);
                  const updatedUser = await requestGetUser(user.user_id);
                  dispatch(userLogin(updatedUser));
                }
                setSelection(null);
                dispatch(goToPage('HOME'));
              }}
            >
              <div>
                <label>Category</label>
                <select name='category'>
                  {categories[selection].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Color: </label>
                <input type='color' name='color' />
              </div>
              {selection !== 'shoes' && (
                <div>
                  <label>Material</label>
                  <select name='material'>
                    {materials.map((mat) => (
                      <option key={mat} value={mat}>
                        {mat}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label>Style</label>
                <select name='style'>
                  {styles.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <input type='submit' />
            </form>
          </div>
        )}
      </div>
    );
}
